import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { type = "text", label, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 pl-1 inline-block">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${className}`}
        id={id}
        {...props}
        ref={ref}
      />
    </div>
  );
});

export default Input;
