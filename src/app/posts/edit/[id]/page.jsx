import { updatePost } from "@/actions/post.mjs";
import BlogForm from "@/components/BlogForm";
import dbConnection from "@/lib/db.mjs";
import Post from "@/lib/models/post.model.mjs";

export default async function UpdatePostPage({ params }) {
  const { id: postId } = await params;
  await dbConnection();
  const post = await Post.findById(postId);
  console.log("post from the update post page");
  console.log(post);
  if (post) {
    return (
      <div className="container w-1/2">
        <h1 className="title">Edit Post</h1>
        <BlogForm
          handler={updatePost}
          updatedPost={JSON.parse(JSON.stringify(post.toObject()))}
        />
      </div>
    );
  } else {
    return <p>Failed to fetch post!</p>;
  }
}
