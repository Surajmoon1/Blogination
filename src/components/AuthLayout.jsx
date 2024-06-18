import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

function Protected({ children, authentication = true }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoading(true);
    if (authentication && authStatus !== authentication) {
      navigate("/login");
      setLoading(false);
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
      setLoading(false);
    }
    setLoading(false);
  }, [authStatus, authentication, loading]);

  return loading ? <Loading /> : <>{children}</>;
}

export default Protected;
