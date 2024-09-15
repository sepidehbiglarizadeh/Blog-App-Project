import PostList from "../_components/PostList";
import { cookies } from "next/headers";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { getPosts } from "@/services/postServices";

// how to revalidate, time-base:
// export const revalidate = 3600; // alan in safhe statice vali age revalidate ro sefr bezarim dynamic mishe
// after 15 => re-build =>
// 1. pass time interval +
// 2. new incoming request to rebuild this page =>
// updated data will be shown to the next user!! => ISR => incremental static re-generation

// export const exprimental_ppr = true; // STATIC + DYNAMIC => PPR

async function BlogPage() {
  const cookieStore = cookies();
  const options = setCookieOnReq(cookieStore);
  const posts = await getPosts(options);

  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
}

export default BlogPage;
