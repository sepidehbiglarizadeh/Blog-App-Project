"use client";

import { createComment } from "@/lib/actions";
import Button from "@/ui/Button";
import SpinnerMini from "@/ui/SpinnerMini";
import SubmitButton from "@/ui/SubmitButton";
import TextArea from "@/ui/TextArea";
import { useState } from "react";

function CommentForm({ postId, parentId }) {
  const [text, setText] = useState("");
  const createCommentwithData = createComment.bind(null, postId, parentId);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form className="space-y-7" action={createCommentwithData}>
            <TextArea
              name="text"
              label="متن نظر"
              value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />
            <SubmitButton>تائید</SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
