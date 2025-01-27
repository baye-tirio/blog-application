import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const sessionKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(sessionKey);
export const createToken = async (payload) => {
  try {
    const token = new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("3d")
      .sign(encodedKey);
    return token;
  } catch (error) {
    console.log("Error creating token");
    console.log(error);
  }
};
export const verifyToken = async (session) => {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Error verifying the jwt token");
    console.log(error);
  }
};
export const createSession = async (userId) => {
  try {
    //expires in 3d
    console.log("In the session creation function : ");
    const expiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    const token = await createToken({ userId, expiresAt });
    const cookieStore = await cookies();
    console.log("Some information on cookie setting");
    console.log({ token, cookieStore });
    cookieStore.set("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: expiresAt,
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};
