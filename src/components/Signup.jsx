import React, { useState } from "react";
import authService from "../appwriteServices/authService";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";

function Signup() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    setError("");
    try {
      const createUser = await authService.createAccount(data);

      if (createUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl border border-black/10`}
      >
        <div className="mb-2 justify-center flex">
          <span className="inline-block max-w-[100px] w-full">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Already have account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="mt-8 text-red-600 text-center"></p>}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter Your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              type="email"
              placeholder="Enter Your Email"
              label="Email: "
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
              {...register("password", {
                required: true,
              })}
            />
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
