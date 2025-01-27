"use client";
import { useActionState } from "react";

export default function BlogForm({ handler, updatedPost }) {
  const [state, action, pending] = useActionState(handler, undefined);
  console.log("response from the create post action");
  console.log(state);
  return (
    <form action={action} className="space-y-4">
      <input name="postId" defaultValue={updatedPost?._id} type="hidden" />
      <div className="flex flex-col items-start">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          defaultValue={state?.title || updatedPost?.title}
        />
        {state?.errors?.title &&
          state.errors.title.map((error) => (
            <p key={error} className="error font-semibold">
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="content">Title</label>
        <textarea
          type="text"
          name="content"
          rows={"6"}
          defaultValue={state?.content || updatedPost?.content}
        />
        {state?.errors?.content &&
          state.errors.content.map((error) => (
            <p key={error} className="error font-semibold">
              {error}
            </p>
          ))}
      </div>
      <button className="btn-primary w-full" disabled={pending}>
        {pending ? "loading..." : "submit"}
      </button>
    </form>
  );
}
