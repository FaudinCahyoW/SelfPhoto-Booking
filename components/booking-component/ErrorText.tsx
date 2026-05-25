"use client"
type ErrorTextProps = {
  message?: string;
};

export function ErrorTextComponent({
  message,
}: ErrorTextProps) {

  if (!message) return null;

  return (

    <p className=" mt-1 text-sm text-red-400 font-medium flex items-center gap-1">
       {message}
    </p>

  );
}