"use server";

import dbConnection from "@/lib/db.mjs";
import { getAuthUser } from "@/lib/getAuthUser.mjs";
import Post from "@/lib/models/post.model.mjs";
import { BlogPostSchema } from "@/lib/rules.mjs";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async (state, formData) => {
  //check authentication
  const authUser = await getAuthUser();
  console.log(authUser);
  if (!authUser) {
    redirect("/login");
  }
  try {
    //validate the form fields
    const validatedFields = BlogPostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
    });
    if (!validatedFields.success) {
      console.log("validation errors : ");
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        title: formData.get("title"),
        content: formData.get("content"),
        errors: validatedFields.error.flatten().fieldErrors,
      };
    } else {
      const { title, content } = validatedFields.data;
      const postedBy = new mongoose.Types.ObjectId(authUser.userId);
      console.log("userId of the poster");
      console.log(postedBy);
      await dbConnection();
      const newPost = new Post({ title, content, postedBy });
      await newPost.save();
      console.log("Post successfully created !");
      console.log(newPost);
    }
  } catch (error) {
    console.log(error);
  }
  redirect("/dashboard");
};
export const updatePost = async (state, formData) => {
  //check authentication
  const authUser = await getAuthUser();
  console.log(authUser);
  if (!authUser) {
    redirect("/login");
  }
  try {
    //validate the form fields
    const validatedFields = BlogPostSchema.safeParse({
      title: formData.get("title"),
      content: formData.get("content"),
    });
    if (!validatedFields.success) {
      console.log("validation errors : ");
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        title: formData.get("title"),
        content: formData.get("content"),
        errors: validatedFields.error.flatten().fieldErrors,
      };
    } else {
      const { title, content } = validatedFields.data;
      const postedBy = new mongoose.Types.ObjectId(authUser.userId);
      console.log("userId of the poster");
      console.log(postedBy);
      await dbConnection();
      const postId = formData.get("postId");
      const updatedPost = await Post.findOne({
        postedBy: new mongoose.Types.ObjectId(authUser.userId),
        _id: new mongoose.Types.ObjectId(postId),
      });
      //const updatedPost = await Post.findById(postId);
      updatedPost.title = title;
      updatedPost.content = content;
      await updatedPost.save();
      console.log("Post successfully updated !");
      console.log(updatedPost);
    }
  } catch (error) {
    console.log(error);
  }
  redirect("/");
};
export const deletePost = async (formData) => {
  //check authentication
  const authUser = await getAuthUser();
  console.log(authUser);
  if (!authUser) {
    redirect("/login");
  }
  try {
    const postId = formData.get("postId");
    console.log("The postId : ");
    console.log(postId);
    await dbConnection();
    const deletedPost = await Post.findOneAndDelete({
      postedBy: new mongoose.Types.ObjectId(authUser.userId),
      _id: new mongoose.Types.ObjectId(postId),
    });
    console.log("successfully deleted post");
    console.log(deletedPost);
  } catch (error) {
    console.log(error);
  }
  // redirect("/dashboard");
  revalidatePath("/dashboard");
};
