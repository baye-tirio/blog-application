"use server";
import { getAuthUser } from "@/lib/getAuthUser.mjs";
import NavLink from "./NavLink";
import { logout } from "@/actions/auth.mjs";

export default async function NavBar() {
  const authUser = await getAuthUser();
  return (
    <nav>
      <NavLink href={"/"} label={"Home"} />
      {authUser ? (
        <div className="flex items-center">
          {" "}
          <NavLink href={"/posts/create"} label={"Post"} />
          <NavLink href={"/dashboard"} label={"Dashboard"} />
          <form action={logout}>
            <button className="nav-link">Logout</button>
          </form>
        </div>
      ) : (
        <div>
          <NavLink href={"/signup"} label={"Register"} />
          <NavLink href={"/login"} label={"Login"} />
        </div>
      )}
    </nav>
  );
}
