"use server";
import { cookies } from "next/headers";
import { verifyToken } from "./sessions.mjs";

export const getAuthUser = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;
    if (token) {
      const user = await verifyToken(token);
      return user;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
