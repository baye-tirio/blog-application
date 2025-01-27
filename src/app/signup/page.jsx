"use client";

import { handleRegister } from "@/actions/auth.mjs";
import Link from "next/link";
import { useActionState } from "react";

export default function SignUpPage() {
  const [state, action, isPending] = useActionState(handleRegister, undefined);
  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>
      <form action={action} className="space-y-4">
        <div className="flex flex-col items-start">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" defaultValue={state?.email} />
          {state?.errors?.email && (
            <p className="error font-semibold">{state.errors.email}</p>
          )}
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            name="password"
            defaultValue={state?.password}
          />
          {state?.errors?.password && (
            <div className="error flex flex-col items-start font-semibold">
              <p>Passwords must : </p>
              <ul className="list-disc list-inside ml-4 flex flex-col items-start">
                {state.errors.password.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            defaultValue={state?.confirmPassword}
          />
          {state?.errors?.confirmPassword && (
            <p className="error font-semibold">
              {state.errors.confirmPassword}
            </p>
          )}
        </div>
        <div className="flex items-start flex-col gap-4 w-full">
          <button disabled={isPending} className="btn-primary w-full">
            {isPending ? "Registering" : "Register"}
          </button>
          <Link className="text-link" href="/login">
            Already have an account
          </Link>
        </div>
      </form>
    </div>
  );
}
