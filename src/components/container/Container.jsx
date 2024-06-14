import React from "react";

function Container({ children }) {
  return <div className="w-full md:max-w-[88rem] mx-auto px-4">{children}</div>;
}

export default Container;
