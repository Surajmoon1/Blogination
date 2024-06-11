import React from "react";
import logo from "./logo.png";

function Logo({ className = "", width }) {
  return (
    <div>
      <img src={logo} alt="logo" className={`w-40 ${width} ${className}`} />
    </div>
  );
}

export default Logo;
