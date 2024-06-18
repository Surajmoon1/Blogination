import React, { useEffect } from "react";
import authService from "../appwriteServices/authService";
import { useNavigate, useSearchParams } from "react-router-dom";

function Verification() {
  const [params] = useSearchParams();
  const id = params.get("userId");
  const secret = params.get("secret");
  const navigate = useNavigate();

  const verify = async () => {
    try {
      await authService.updateVerification(id, secret);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verify();
  }, [id, secret]);

  return (
    <>
      <h2 className="text-white text-center py-11 text-4xl">
        An Appwrite Verification Link is send to your email.
      </h2>
    </>
  );
}

export default Verification;
