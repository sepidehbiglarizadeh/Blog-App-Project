import Breadcrumbs from "@/ui/Breadcrumbs";
import { getPostByIdApi } from "@/services/postServices";
import { notFound } from "next/navigation";
import CreatePostForm from "../../create/_/CreatePostForm";

export default async function EditPage({ params: { postId } }) {
  const { post } = await getPostByIdApi(postId);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "پست ها",
            href: "/profile/posts",
          },
          {
            label: "ویرایش پست",
            href: `/profile/posts/${postId}/edit`,
            active: true,
          },
        ]}
      />
      <CreatePostForm postToEdit={post} />
    </div>
  );
}
