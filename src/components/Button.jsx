import React from "react";

function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`bg-blue-600 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
