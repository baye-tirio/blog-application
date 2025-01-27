import BlogPostCard from "@/components/BlogPostCard";
import dbConnection from "@/lib/db.mjs";
import Post from "@/lib/models/post.model.mjs";

export default async function PostPage({ params }) {
  const { id } = await params;
  console.log("The id from the url parameters :");
  console.log(id);
  await dbConnection();
  const post = await Post.findById(id);
  if (post) {
    return (
      <div className="container w-1/2">
        <BlogPostCard post={post} />
      </div>
    );
  } else {
    return <div>Failed to fetch post!</div>;
  }
}
