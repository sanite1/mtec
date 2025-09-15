import React, { useState } from "react";
import signin from "../assets/signin.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();
  const { signup } = useAuth();

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup();
      navigate("/onboarding");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section (hidden on small screens) */}
      <div className="hidden md:flex w-1/2 bg-purple-100 items-center justify-center">
        <img
          src={signin}
          alt="Sign Up"
          className="max-w-md w-full object-contain"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h2>
          <p className="text-gray-500 mb-8">
            Create an account to get started with us.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                {...register("name")}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500 focus:border-purple-500"
                }`}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                {...register("email")}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500 focus:border-purple-500"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                {...register("password")}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500 focus:border-purple-500"
                }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-purple-500 focus:border-purple-500"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Show Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="w-4 h-4 border-gray-300"
                />
                <span className="text-gray-600">Show Passwords</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-md"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Social Sign-up */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 border rounded-lg hover:bg-gray-100 transition">
              Continue with Google
            </button>
          </div>

          {/* Sign in link */}
          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
