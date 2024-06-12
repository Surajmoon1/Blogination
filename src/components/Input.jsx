import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { type = "text", label, className = "", required, errors, ...props },
  ref
) {
  const id = useId();
  return (
    <div>
      {label && (
        <>
          <label
            htmlFor={id}
            className={`mb-1 mt-4 pl-1  text-white font-bold text-xl flex`}
          >
            {label}
            {required && <p className="text-red-400">*</p>}
          </label>

          {errors && (
            <span className="text-red-400 text-xs ml-2">
              This field is required.
            </span>
          )}
        </>
      )}

      <div>
        <input
          type={type}
          className={`px-3 py-2 rounded-lg  text-black  duration-200  w-full ${className}`}
          id={id}
          {...props}
          ref={ref}
        />
      </div>
    </div>
  );
});

export default Input;
