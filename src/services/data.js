import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import { getAllUsersApi } from "./authService";
import { getAllCommentsApi } from "./commentService";
import { getPosts } from "./postServices";

export async function fetchCardData() {
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getPosts(),
      getAllCommentsApi(options),
    ]);

    const numberOfUsers = Number(data[0].users.length ?? "0");
    const numberOfPosts = Number(data[1].length ?? "0");
    const numberOfComments = Number(data[2].comments.length ?? "0");

    return {
      numberOfPosts,
      numberOfUsers,
      numberOfComments,
    };
  } catch (error) {
    console.error("خطا", error.response?.data?.message);
    throw new Error("خطا در بارگذاری اطلاعات");
  }
}
