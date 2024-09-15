import PostList from "app/blogs/_components/PostList";

async function CategoryPage({ params }) {
  const { categorySlug } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?categorySlug=${categorySlug}`
  );
  const { data } = await res.json();
  const { posts } = data || {};

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-lg text-secondary-600">
          پستی در این دسته بندی پیدا نشد!
        </p>
      ) : (
        <PostList />
      )}
    </div>
  );
}

export default CategoryPage;
