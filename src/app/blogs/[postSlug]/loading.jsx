import Spinner from "@/ui/Spinner";
import React from "react";

function loading() {
  return (
    <div className="grid justify-center items-center gap-x-4">
      <span className="text-lg text-secondary-500">در حال بارگذاری اطلاعات</span>
      <Spinner />
    </div>
  );
}

export default loading;
