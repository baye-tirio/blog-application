"use server";

import BlogPostCard from "@/components/BlogPostCard";
import dbConnection from "@/lib/db.mjs";
import Post from "@/lib/models/post.model.mjs";

export default async function Home() {
  const getPosts = async () => {
    try {
      await dbConnection();
      const posts = await Post.find({}).sort({ createdAt: -1 });
      console.log("Them postst");
      console.log(posts);
      if (posts.length > 0) return posts;
      else return null;
    } catch (error) {
      console.log(error);
    }
  };
  const posts = await getPosts();
  if (posts) {
    return (
      <div className="grid grid-cols-2 gap-6">
        {posts?.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    );
  } else {
    return <p>No blog Posts !</p>;
  }
}
