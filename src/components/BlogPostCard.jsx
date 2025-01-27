import Link from "next/link";

export default function BlogPostCard({ post }) {
  console.log("Current server time");
  console.log(
    new Date(Date.now()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  return (
    <div key={post._id}>
      <div className="border border-slate-400 border-dashed p-4 rounded-md h-full">
        <p className="text-slate-400 text-xs">
          {post._id.getTimestamp().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <Link
          href={`/posts/show/${post._id.toString()}`}
          className="block text-xl font-semibold mb-4"
        >
          {post.title}
        </Link>
        <p className="text-sm">{post.content}</p>
      </div>
    </div>
  );
}
