import { fetchCardData, fetchLatestPosts } from "@/services/data";
import React from "react";
import { Card } from "./_components/Cards";
import PostsTable from "./posts/_/components/PostsTable";

async function ProfilePage() {
  const { numberOfComments, numberOfPosts, numberOfUsers } =
    await fetchCardData();

  // const posts = await fetchLatestPosts();

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card title="کاربران" value={numberOfUsers} type="users" />
        <Card title="پست ها" value={numberOfPosts} type="posts" />
        <Card title="نظرات" value={numberOfComments} type="comments" />
      </div>
      <PostsTable query="sort=latest&limit=5" />
    </div>
  );
}

export default ProfilePage;
