"use server";

import dbConnection from "@/lib/db.mjs";
import User from "@/lib/models/user.models.mjs";
import { RegisterFormSchema } from "@/lib/rules.mjs";
import { createSession } from "@/lib/sessions.mjs";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleRegister = async (state, formData) => {
  try {
    const validatedFields = RegisterFormSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        errors: validatedFields.error.flatten().fieldErrors,
      };
    } else {
      // means that our validation has been done successfully
      const { email, password } = validatedFields.data;
      await dbConnection();
      //check if the user already is in our database
      if (await User.exists({ email })) {
        return {
          success: false,
          errors: "user already exists!",
        };
      } else {
        const newUser = new User({
          email,
          password: bcryptjs.hashSync(password, 10),
        });
        await newUser.save();
        console.log("Successfully registered a new user ! ");
        console.log(newUser);
        // return {
        //   success: true,
        //   user: JSON.parse(JSON.stringify(newUser.toObject())),
        // };
        //create a session for the registered user
        await createSession(newUser._id.toString());
      }
    }
  } catch (error) {
    console.log("Error in the handleRegister function");
    console.log(error);
  }
  redirect("/dashboard");
};
export const handleLogIn = async (state, formData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("login information");
    console.log({ email, password });
    await dbConnection();
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: "Invalid credentials",
      };
    } else {
      console.log("found user");
      console.log(user);
      if (!bcryptjs.compareSync(password, user.password)) {
        return {
          success: false,
          error: "Invalid credentials",
        };
      } else {
        // we found the user
        // create session
        console.log("successfull log in");
        console.log(user);
        await createSession(user._id.toString());
      }
    }
  } catch (error) {
    console.log("Error in the handleLogIn function");
    console.log(error);
  }
  redirect("/dashboard");
};
export const logout = async (state, formData) => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
  } catch (error) {
    console.log(error);
  }
  redirect("/");
};
