"use client";

import { useCategories } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import TextField from "@/ui/TextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useCreatePost from "./useCreatePost";
import SpinnerMini from "@/ui/SpinnerMini";
import { useRouter } from "next/navigation";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";

const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();

export default function CreatePostForm({ postToEdit = {} }) {
  const { _id: editId } = postToEdit;
  const isEditSession = Boolean(editId);
  const {
    title,
    text,
    slug,
    briefText,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl,
  } = postToEdit;

  let editValues = {};
  if (isEditSession) {
    editValues = {
      title,
      text,
      slug,
      briefText,
      readingTime,
      category: category._id,
      coverImage,
    };
  }

  const { categories } = useCategories();
  const [coverImageUrl, setCoverImagUrl] = useState(prevCoverImageUrl || null);
  const { createPost, isCreating } = useCreatePost();
  const { EditPost, isEditing } = useEditPost();
  const router = useRouter();

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
    defaultValues: editValues,
  });

  useEffect(() => {
    if (prevCoverImageUrl) {
      // convert prev link to file
      async function fetchMyApi() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("coverImage", file);
      }
      fetchMyApi();
    }
  }, [editId]);

  const onSubmit = (data) => {
    // dar senariyohayi ke json ra be hamrah file mikham ersal konim bayad be soorate formdata anha ra ersal konim
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (isEditSession) {
      EditPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
        },
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
              name="coverImage"
              isRequired
              errors={errors}
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

      <div>
        {isCreating ? (
          <SpinnerMini />
        ) : (
          <Button variant="primary" type="submit" className="w-full">
            تائید
          </Button>
        )}
      </div>
    </form>
  );
}
