import { deletePost } from "@/actions/post.mjs";
import dbConnection from "@/lib/db.mjs";
import { getAuthUser } from "@/lib/getAuthUser.mjs";
import Post from "@/lib/models/post.model.mjs";
import mongoose from "mongoose";
import Link from "next/link";
// by default all components in nextjs 15 are server components bare that in mind
const DashBoardPage = async () => {
  const authUser = await getAuthUser();
  await dbConnection();
  const userPosts = await Post.find({
    postedBy: new mongoose.Types.ObjectId(authUser?.userId),
  }).sort({ createdAt: -1 });
  console.log("user posts : ");
  console.log(userPosts);
  return (
    <div className="">
      <h1 className="title">Dashboard</h1>
      {userPosts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className="w-3/6">Post Title</th>
              <th className="w-1/6 sr-only">View</th>
              <th className="w-1/6 sr-only">Edit</th>
              <th className="w-1/6 sr-only">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userPosts.map((post) => (
              <tr key={post._id.toString()}>
                <td className="w-3/6">{post.title}</td>
                <td className="w-1/6 text-blue-500">
                  <Link href={`/posts/show/${post._id.toString()}`}>View</Link>
                </td>
                <td className="w-1/6 text-blue-500">
                  <Link href={`/posts/edit/${post._id.toString()}`}>Edit</Link>
                </td>
                <td className="w-1/6 text-red-500">
                  <form action={deletePost}>
                    <input
                      type="hidden"
                      name="postId"
                      defaultValue={post._id.toString()}
                    />
                    <button type="submit">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {userPosts.length === 0 && <p>No userposts!</p>}
    </div>
  );
};

export default DashBoardPage;
