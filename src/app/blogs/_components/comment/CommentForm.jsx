"use client";

import { createComment } from "@/lib/actions";
import Button from "@/ui/Button";
import SpinnerMini from "@/ui/SpinnerMini";
import SubmitButton from "@/ui/SubmitButton";
import TextArea from "@/ui/TextArea";
import { useState, useActionState, useEffect } from "react";
import toast from "react-hot-toast";

const initialState = {
  error: "",
  message: "",
};

function CommentForm({ postId, parentId, setOpen }) {
  const [text, setText] = useState("");
  const [state, formAction] = useActionState(createComment, initialState); // useFormSatte in React V 18.
  // const createCommentwithData = createComment.bind(null, postId, parentId);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      setOpen(false);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form
            className="space-y-7"
            // action={createCommentwithData}
            action={async (formData) => {
              await formAction({ formData, postId, parentId });
            }}
          >
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
