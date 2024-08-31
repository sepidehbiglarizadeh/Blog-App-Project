import Image from "next/image";

async function PostList() {
  await new Promise((resolve) => setTimeout(() => resolve(), 3000));

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
  const {
    data: { posts },
  } = await res.json();

  return posts.length > 0 ? (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post) => (
        <div
          className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-100 p-2 rounded-lg"
          key={post._id}
        >
          <Image src={post.coverImageUrl} alt="" width={400} height={500} />
        </div>
      ))}
    </div>
  ) : null;
}

export default PostList;
