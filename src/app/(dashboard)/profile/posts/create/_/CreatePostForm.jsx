"use client"

import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object();

export default function CreatePostForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return (
    <form className="form">
      <RHFTextField
        label="عنوان"
        errors={errors}
        register={register}
        name="title"
        isRequired
      />
      <RHFTextField
        label="متن کوتاه"
        errors={errors}
        register={register}
        name="briefText"
        isRequired
      />
      <RHFTextField
        label="متن"
        errors={errors}
        register={register}
        name="text"
        isRequired
      />
      <RHFTextField
        label="اسلاگ"
        errors={errors}
        register={register}
        name="slug"
        isRequired
      />
      <RHFTextField
        label="زمان مطالعه"
        errors={errors}
        register={register}
        name="readingTime"
        isRequired
      />
      <RHFSelect
        label="دسته بندی"
        errors={errors}
        register={register}
        name="category"
        isRequired
        options={[]}
      />
    </form>
  );
}
