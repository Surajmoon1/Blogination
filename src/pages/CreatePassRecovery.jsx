import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwriteServices/authService";
import { Input, Button } from "../components";

function CreatePassRecovery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState();
  const [display, setDisplay] = useState("");

  const passwordRecovery = async (email) => {
    try {
      setError("");
      await authService.createPasswordRecovery(email);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    setDisplay(" An Appwrite password reset link is send to your email.");
  };

  return (
    <div className="flex items-center justify-center w-full px-2">
      <div className="p-6 mx-auto w-full max-w-xl bg-gray-700 rounded-xl">
        {error ? (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        ) : (
          <p className="mt-4 text-white text-center">{display}</p>
        )}

        <form onSubmit={handleSubmit(passwordRecovery)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="email"
              placeholder="Enter Your Email"
              label="Email: "
              errors={errors.email}
              className="bg-gray-400 focus:outline-1 focus:outline-[#eaa79c] placeholder:text-gray-700 indent-2 text-black text-lg font-medium focus:bg-gray-100"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Button
              type="submit"
              className="w-full rounded-xl py-2 font-bold duration-300 ease-in text-xl text-black hover:bg-blue-800 hover:text-white"
            >
              Send Password Reset Link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePassRecovery;
