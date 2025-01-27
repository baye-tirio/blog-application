import { NextResponse } from "next/server";
import { getAuthUser } from "./lib/getAuthUser.mjs";
const protectedRoutes = ["/posts/create", "/"];
const publicRoutes = ["/login", "/signup"];
const middleware = async (req) => {
  console.log("Middleware function executed!");
  const path = req.nextUrl.pathname;
  console.log("The url trying to be accessed!");
  console.log(path);
  const isProtected =
    protectedRoutes.includes(path) || path.startsWith("/posts/edit/");
  const isPublic = publicRoutes.includes(path);
  const authUser = await getAuthUser();
  // console.log("authUser from the middleware");
  // console.log(authUser);
  if (isProtected && !authUser) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublic && authUser) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  } else {
    NextResponse.next();
  }
  //we could have some matchers over here to filter out the considered routes
};
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
export default middleware;
