import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";

function FileInput({
  label,
  name,
  value,
  dir = "rtl",
  onChange,
  isRequired,
  className,
  validationSchema = {},
  errors,
  ...rest
}) {
  const errorMessages = errors?.[name];
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <label
        for="file-upload"
        className={`curser-pointer border-2 border-primary-900 rounded-lg px-3 py-2 text-primary-900 flex items-center justify-center gap-x-2 ${className}`}
      >
        {label}
        <ArrowUpTrayIcon className="w-5 h-5" />
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          name={name}
          dir={dir}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </label>
      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2">
          {errors[name]?.message}
        </span>
      )}
    </>
  );
}

export default FileInput;
