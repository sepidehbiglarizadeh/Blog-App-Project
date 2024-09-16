import { getPostBySlug, getPosts } from "@/services/postServices";
import Image from "next/image";
import { notFound } from "next/navigation";
import RelatedPost from "../_components/RelatedPost";
import PostComments from "../_components/comment/PostComments";

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.postSlug);
  return {
    title: `پست ${post.title}`,
  };
}

export const dynamicParams = false; // in baes mishe vaghti az generateStaticParams estafde kardim ta safe static beshe age safehi be joz pagehayi ke pre render shode darkhast shod errore 404 bede

export async function generateStaticParams() {
  // get posts => [ {slug:"slug-1",...} ]
  const posts = await getPosts();
  const slugs = posts.map((post) => ({ slug: post.postSlug }));
  return slugs;
  // agara bekhahim faghat masalan 10 poste aval be sorate stati bashan va baghiye besorate sunamiv miaym roye postamon slice mizanim bad map mizanim va dynamicParams barabar ba true gharar midim
}

async function SinglePostPage({ params }) {
  const post = await getPostBySlug(params.postSlug);

  if (!post) notFound();

  return (
    <div className="text-secondary-600 max-w-screen-md mx-auto">
      <h1 className="text-secondary-700 text-2xl font-bold mb-8">
        {post.title}
      </h1>
      <p className="mb-4">{post.briefText}</p>
      <p className="mb-8">{post.text}</p>
      <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
        <Image
          className="object-cover object-center hover:scale-110 transition-all ease-out duration-300"
          fill
          src={post.coverImageUrl}
        />
      </div>
      {post.related.length > 0 && <RelatedPost posts={post.related} />}
      <PostComments post={post} />
    </div>
  );
}

export default SinglePostPage;
