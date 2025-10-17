import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLogin } from "../lib/api/onboarding";

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
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const navigate = useNavigate();
  const { mutateAsync: login } = useLogin();

  const { login: auth } = useAuth();
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ email: data.email, password: data.password });

      setTimeout(() => {
        navigate("");
      }, 1500);
    } catch (error: any) {
      // Extract error message properly
      // const errorMessage =
      //   error.response?.data?.message ||
      //   "Something went wrong. Please try again.";
    }
  };

  return (
    <section
      className="
        relative min-h-screen 
        flex justify-center items-start 
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
        text-white overflow-auto
        py-8 sm:py-12
      "
    >
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[32rem] h-[32rem] bg-purple-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] bg-blue-600 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute bottom-0 left-1/3 w-[18rem] h-[18rem] bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Center Card */}
      <div
        className="
          relative z-10 
          w-full max-w-md 
          mx-4 sm:mx-0 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 
          rounded-2xl shadow-2xl 
          p-6 sm:p-10
        "
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mt-4">Welcome Back</h2>
          <p className="text-gray-300 text-sm mt-2">
            Please sign in to access your dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                errors.email ? "border-red-500" : "border-white/30"
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                errors.password ? "border-red-500" : "border-white/30"
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Show Password & Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-300 flex-wrap gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span>Show Password</span>
            </label>
            <a href="/forgot-password" className="hover:text-purple-400">
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow h-px bg-white/20" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-white/20" />
        </div>

        {/* Social Sign-in */}
        <button
          onClick={async () => {
            await auth();
            navigate("/");
          }}
          className="w-full py-3 border border-white/20 bg-white/10 rounded-lg hover:bg-white/20 transition"
        >
          Continue with Google
        </button>

        {/* Sign Up */}
        <p className="text-sm text-center mt-6 text-gray-300">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </section>
  );
}
