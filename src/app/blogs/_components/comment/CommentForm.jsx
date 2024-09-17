'use client'

import Button from "@/ui/Button";
import TextArea from "@/ui/TextArea";
import { useState } from "react";

function CommentForm() {
  const [text, setText] = useState("");

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form className="space-y-7">
            <TextArea
              name="text"
              label="متن نظر"
              value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />
            <Button>تائید</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;
