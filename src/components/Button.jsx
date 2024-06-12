import React from "react";

function Button({
  children,
  type = "button",
  className = "",
  bgColor,
  ...props
}) {
  return (
    <button
      type={type}
      className={`bg-blue-600 ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
