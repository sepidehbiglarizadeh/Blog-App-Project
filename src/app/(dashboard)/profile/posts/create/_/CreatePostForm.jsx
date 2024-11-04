"use client";

import { useCategories } from "@/hooks/useCategories";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import TextField from "@/ui/TextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object();

export default function CreatePostForm() {
  const { categories } = useCategories();
  const [coverImageUrl, setCoverImagUrl] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    setValue,
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
        options={categories}
      />
      <Controller
        name="coverImage"
        control={control}
        rules={{ required: "کاور پست الزامی است" }}
        render={({ field: { value, onChange, ...rest } }) => {
          return (
            <FileInput
              label="کاور پست"
              name="my-coverImage"
              isRequired
              {...rest}
              value={value?.fileName}
              onChange={(event) => {
                const file = event.target.files[0];
                onChange(file);
                setCoverImagUrl(URL.createObjectURL(file));
                event.target.value = null;
              }}
            />
          );
        }}
      />

      {coverImageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            fill
            alt="cover-image"
            src={coverImageUrl}
            className="object-cover object-center"
          />
          <ButtonIcon
            variant="red"
            className="w-6 h-6 absolute left-4 top-4"
            onClick={() => {
              setCoverImagUrl(null);
              setValue("coverImage", null);
            }}
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}
    </form>
  );
}
