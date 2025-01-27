"use client";

import { handleLogIn } from "@/actions/auth.mjs";
import Link from "next/link";
import { useActionState } from "react";
import toast from "react-hot-toast";

export default function LogInPage() {
  const [state, action, isPending] = useActionState(handleLogIn, undefined);
  // if (state?.success) toast.success("successfull login");
  // else toast.error(state?.error);
  return (
    <div className="container w-1/2">
      <h1 className="title">Log In</h1>
      <form action={action} className="space-y-4">
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" defaultValue={state?.email} />
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            defaultValue={state?.password}
          />
        </div>
        {state?.error && <p className="error font-semibold">{state.error}</p>}
        <div className="flex items-start flex-col gap-4 w-full">
          <button disabled={isPending} className="btn-primary w-full">
            {isPending ? "loging in..." : "Log In"}
          </button>
          <Link className="text-link" href="/signup">
            Don't have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
