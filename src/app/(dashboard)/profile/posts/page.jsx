import { Suspense } from "react";
import PostsTable from "./_/components/PostsTable";
import Spinner from "@/ui/Spinner";

function page() {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <PostsTable />
      </Suspense>
    </div>
  );
}

export default page;
