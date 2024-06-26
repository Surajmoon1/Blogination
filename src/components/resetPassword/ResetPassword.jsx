import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../../appwriteServices/authService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, Loading } from "../index";

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [params] = useSearchParams();
  const id = params.get("userId");
  const secret = params.get("secret");
  const navigate = useNavigate();

  const resetPass = async (data) => {
    if (data.password === data.confirmPassword) {
      setLoading(true);
      try {
        await authService.resetPassword(
          id,
          secret,
          data.password,
          data.confirmPassword
        );
        navigate("/login");
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    } else {
      setError("Password does not match");
    }
    // console.log(data);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex items-center justify-center w-full px-2">
      <div className="p-6 mx-auto w-full max-w-xl bg-gray-700 rounded-xl">
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit(resetPass)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your new password"
              required={true}
              errors={errors.password}
              className="bg-gray-400 focus:outline-1 focus:outline-[#eaa79c] placeholder:text-gray-700 indent-2 text-black text-lg font-medium focus:bg-gray-100"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              required={true}
              errors={errors.confirmPassword}
              className="bg-gray-400 focus:outline-1 focus:outline-[#eaa79c] placeholder:text-gray-700 indent-2 text-black text-lg font-medium focus:bg-gray-100"
              {...register("confirmPassword", {
                required: true,
                minLength: 8,
              })}
            />

            <span className="text-gray-400 ml-2 text-xs">
              Password must be between 8 and 256 characters long
            </span>
            <Button
              type="submit"
              className="w-full rounded-xl py-2 font-bold duration-300 ease-in text-xl text-black hover:bg-blue-800 hover:text-white"
            >
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
