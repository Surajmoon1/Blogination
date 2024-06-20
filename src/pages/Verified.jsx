import React, { useEffect } from "react";
import authService from "../appwriteServices/authService";
import { useNavigate, useSearchParams } from "react-router-dom";

function Verified() {
  const [params] = useSearchParams();
  const id = params.get("userId");
  const secret = params.get("secret");
  const navigate = useNavigate();

  const verify = async () => {
    try {
      await authService.updateVerification(id, secret);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      <h2 className="text-white text-center py-11 text-4xl">
        Email verification complete ✅
      </h2>
    </>
  );
}

export default Verified;
