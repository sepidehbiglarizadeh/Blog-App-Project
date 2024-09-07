"use client";

import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";

// export const metadata = {
//   title: "ثبت نام",
// };

function Signup() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">ثبت نام</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField
          label="نام و نام خانوادگی"
          name="Name"
          register={register}
        />
        <RHFTextField
          label="ایمیل"
          name="email"
          register={register}
          dir="ltr"
        />
        <RHFTextField
          label="رمز عبور"
          name="password"
          register={register}
          type="password"
          dir="ltr"
        />
        <Button type="submit" variant="primary" className="w-full">
          تایید
        </Button>
      </form>
    </div>
  );
}

export default Signup;
