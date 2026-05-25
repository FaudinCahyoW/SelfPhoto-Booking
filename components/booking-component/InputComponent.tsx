"use client";

import React from "react";

import { ErrorTextComponent } from "./ErrorText";

type InputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    errorMessage?: string;
  };

export function InputComponent({
  label,
  errorMessage,
  type,
  placeholder,
  id,
  name,
  value,
  onChange,
  minLength,
  readOnly = false,
  className,
  ...props
}: InputProps) {

  return (

    <div className="mb-4">

      <label
        htmlFor={id}
        className="
          block
          mb-2
          text-sm
          font-medium
          text-gray-200
        "
      >
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        readOnly={readOnly}
        minLength={minLength}
        required
        {...props}
        className={`
          w-full
          px-3
          py-2.5
          rounded-xl
          bg-white/10
          backdrop-blur-md
          border
          ${
            errorMessage
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-white/20 focus:ring-pink-400 focus:border-pink-400"
          }
          text-white
          placeholder:text-gray-400
          shadow-sm
          focus:outline-none
          focus:ring-2
          transition-all
          ${className || ""}
        `}
      />

      <ErrorTextComponent
        message={errorMessage}
      />

    </div>
  );
}