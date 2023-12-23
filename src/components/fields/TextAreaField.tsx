// Custom components
import React from "react";

function TextAreaField(props: {
  id: string;
  label: string;
  extra: string;
  placeholder: string;
  variant: string;
  state?: string;
  disabled?: boolean;
  type?: string;
  cols?: number;
  rows?: number;
  onChange?: (value: string) => void;
}) {
  const {
    label,
    id,
    extra,
    cols,
    rows,
    placeholder,
    variant,
    state,
    disabled,
    onChange,
  } = props;

  const handleOnChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
      >
        {label}
      </label>
      <textarea
        disabled={disabled}
        cols={cols}
        rows={rows}
        id={id}
        placeholder={placeholder}
        className={`mt-2 flex w-full resize-none items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
        onChange={handleOnChangeValue}
      />
    </div>
  );
}

export default TextAreaField;
