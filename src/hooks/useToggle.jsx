import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useToggle() {
  const [showHide, setShowHide] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (showHide) {
        toggle()
    }
  }, [location.pathname]);
  const toggle = () => {
    setShowHide((prev) => !prev);
  };

  return { showHide, toggle };
}

export default useToggle;
