import React, { useState } from "react";
import { Logo, Button, Input, Loading } from "./index";
import { useNavigate, Link } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwriteServices/authService";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(storeLogin({ userData: userData }));
          navigate("/");
          setLoading(false);
        } else {
          navigate("/login");
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="flex items-center justify-center w-full px-2">
      <div className="p-6 mx-auto w-full max-w-xl bg-gray-700 rounded-xl">
        <div className="mb-2 justify-center flex">
          <span className="flex justify-center w-full">
            <Logo />
          </span>
        </div>
        <h2 className="text-center text-white text-2xl font-bold leading-tight">
          Log in to your account
        </h2>

        <p className="mt-2 text-center text-white text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              type="email"
              placeholder="Enter Your Email"
              label="Email: "
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
              placeholder="Enter Your Password"
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
              type="submit"
              className="w-full rounded-xl py-2 font-bold duration-300 ease-in text-xl text-black hover:bg-blue-800 hover:text-white"
            >
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
