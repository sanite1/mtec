import React, { useState } from "react";
import signin from "../assets/signin.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ adjust path if needed

// ✅ Schema with Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login function

  // ✅ Form submit handler
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(); // call useAuth login()
      navigate("/"); // ✅ go to home/dashboard
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section (hidden on small screens) */}
      <div className="hidden md:flex w-1/2 bg-purple-100 items-center justify-center">
        <img
          src={signin}
          alt="Sign In"
          className="max-w-md w-full object-contain"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h2>
          <p className="text-gray-500 mb-8">
            Welcome back! Please sign in to continue.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            {/* Show Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="w-4 h-4 border-gray-300"
                />
                <span className="text-gray-600">Show Password</span>
              </label>
              <a
                href="/forgot-password"
                className="text-purple-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition shadow-md"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Social Sign-in */}
          <div className="flex gap-3">
            <button className="flex-1 py-3 border rounded-lg hover:bg-gray-100 transition">
              Continue with Google
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-sm text-center mt-6 text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-purple-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
