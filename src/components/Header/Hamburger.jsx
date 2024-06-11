import React from "react";
import MobileNav from "./MobileNav";
import useToggle from "../../hooks/useToggle";

function Hamburger() {
  const { showHide, toggle } = useToggle();
  return (
    <>
      <div className="md:hidden" onClick={toggle}>
        {showHide ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={40}
            height={40}
            color={"#fff"}
            fill={"none"}
          >
            <path
              d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={40}
            height={40}
            color={"#fff"}
            fill={"none"}
          >
            <path
              d="M20 12L10 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 5L4 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 19L4 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      {showHide && <MobileNav />}
    </>
  );
}

export default Hamburger;

{
  /* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg> */
}
