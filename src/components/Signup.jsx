import React, { useState } from "react";
import authService from "../appwriteServices/authService";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, Loading, Logo } from "./index";
import { useDispatch } from "react-redux";

function Signup() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const signup = async (data) => {
    setError("");
    setLoading(true);
    try {
      const createUser = await authService.createAccount(data);

      if (createUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
          setLoading(false);
        }
      }
    } catch (error) {
      // if (error.message.includes("user already exists")) {
      //   setError("A user with this email already exists.");
      // } else {
      //   setError("An error occurred during signup.");
      // }

      setError(error.message)
    }
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex items-center justify-center w-full">
      <div className="p-6 mx-auto w-full max-w-xl bg-gray-700 rounded-xl">
        <div className="mb-2 justify-center flex">
          <span className="flex justify-center w-full">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-white text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>

        <p className="mt-2 text-center text-white text-black/60">
          Already have account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-blue-600 transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              required={true}
              errors={errors.name}
              className="bg-gray-400 focus:outline-1 focus:outline-[#eaa79c] placeholder:text-gray-700 indent-2 text-black text-lg font-medium focus:bg-gray-100"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              type="email"
              placeholder="Enter Your Email"
              label="Email"
              required={true}
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

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              required={true}
              errors={errors.password}
              className="bg-gray-400 focus:outline-1 focus:outline-[#eaa79c] placeholder:text-gray-700 indent-2 text-black text-lg font-medium focus:bg-gray-100"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            <span className="text-gray-400 ml-2 text-xs">
              Password must be between 8 and 256 characters long
            </span>

            <Button
              className="w-full rounded-xl py-2 font-bold duration-300 ease-in text-xl text-black hover:bg-blue-800 hover:text-white"
              type="submit"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
