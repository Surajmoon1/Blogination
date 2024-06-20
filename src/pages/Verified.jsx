import React, { useEffect, useState } from "react";
import authService from "../appwriteServices/authService";
import { useNavigate, useSearchParams } from "react-router-dom";

function Verified() {
  const [params] = useSearchParams();
  const id = params.get("userId");
  const secret = params.get("secret");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const verify = async () => {
    try {
      setError("");
      await authService.updateVerification(id, secret);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      {error ? (
        <p className="mt-4 text-red text-center">{error}</p>
      ) : (
        <h2 className="text-white text-center py-11 text-4xl">
          Email verification complete ✅
        </h2>
      )}
    </>
  );
}

export default Verified;
