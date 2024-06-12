import React, { useId, forwardRef } from "react";

function Select(
  { label, options = [], className = "", required, errors, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <>
          <label
            htmlFor={id}
            className="mb-1 pl-1  text-white flex font-bold text-lg"
          >
            {label}
            {required && <p className="text-red-400">*</p>}
          </label>
          {errors && (
            <span className="text-red-400 text-xs ml-2 py-2">
              This field is required.
            </span>
          )}
        </>
      )}

      <select
        id={id}
        className={`px-3
          py-2 rounded-lg text-black outline-none duration-200 w-full ${className}`}
        ref={ref}
        {...props}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="bg-gray-400">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
