import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useSignup } from "../lib/api/authOnboarding";

// ✅ Schema
const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupFormData = z.infer<typeof signupSchema>;

// ✅ Component
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  // const { signup: setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const { mutateAsync: signup, isPending } = useSignup();

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup({
        email: data.email,
        password: data.password,
        firstname: data.firstName,
        lastname: data.lastName,
      });

      // setTimeout(() => {
      navigate("/confirm-email");
      // }, 1500);
    } catch (error: any) {
      // Extract error message properly
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <section
      className="
      relative min-h-screen 
        flex justify-center items-start 
        lg:bg-gradient-to-b lg:from-gray-900 lg:via-gray-800 lg:to-gray-900 
        text-white overflow-auto
        py-8 sm:py-12
      "
    >
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[32rem] h-[32rem] lg:bg-purple-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] lg:bg-blue-600 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute bottom-0 left-1/3 w-[18rem] h-[18rem] lg:bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Center Card */}
      <div
        className="
          relative z-10 w-full max-w-2xl mx-4 sm:mx-0 
          bg-white/10 backdrop-blur-xl border border-white/20 
          rounded-2xl shadow-2xl p-6 sm:p-10
        "
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mt-4 text-gray-900 lg:text-white">
            Create Account
          </h2>
          <p className="text-gray-700 text-sm mt-2 lg:text-gray-300">
            Get started by creating your free account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* First and Last Name (grid on md+) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 lg:text-gray-200 mb-2">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                placeholder="John"
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors.firstName ? "border-red-500" : "border-white/30"
                } text-gray-900 lg:text-white placeholder-gray-500 lg:placeholder-gray-400 ring-1 lg:ring-0 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-900 lg:text-gray-200 mb-2">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Doe"
                className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                  errors.lastName ? "border-red-500" : "border-white/30"
                } text-gray-900 lg:text-white placeholder-gray-500 lg:placeholder-gray-400 ring-1 lg:ring-0 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-900 lg:text-gray-200 mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                errors.email ? "border-red-500" : "border-white/30"
              } text-gray-900 lg:text-white placeholder-gray-500 lg:placeholder-gray-400 ring-1 lg:ring-0 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password + Confirm Password (grid on md+) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-900 lg:text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${
                    errors.password ? "border-red-500" : "border-white/30"
                  } text-gray-900 lg:text-white placeholder-gray-500 lg:placeholder-gray-400 ring-1 lg:ring-0 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 h-full text-gray-300 hover:text-white"
                >
                  <span className="items-center">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="">
              <label className="block text-sm font-medium text-gray-900 lg:text-gray-200 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border text-base ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-white/30"
                  } text-gray-900 lg:text-white placeholder-gray-500 lg:placeholder-gray-400 ring-1 lg:ring-0 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 h-full text-gray-300 hover:text-white"
                >
                  <span className="items-center">
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </span>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition disabled:opacity-50"
          >
            {isPending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-grow h-px bg-gray-300 lg:bg-white/20" />
          <span className="px-3 text-gray-500 lg:text-gray-400 text-sm">
            or
          </span>
          <div className="flex-grow h-px bg-gray-300 lg:bg-white/20" />
        </div>

        {/* Social Sign-in */}
        <button
          onClick={async () => {
            // await auth();
            navigate("/");
          }}
          className="w-full py-3 border border-gray-300 lg:border-white/20 bg-gray-100 lg:bg-white/10 rounded-lg hover:bg-gray-200 lg:hover:bg-white/20 transition text-gray-800 lg:text-white"
        >
          Continue with Google
        </button>

        {/* Sign Up */}
        <p className="text-sm text-center mt-6 text-gray-700 lg:text-gray-300">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-600 hover:underline lg:text-purple-400"
          >
            Sign In
          </button>
        </p>
      </div>
    </section>
  );
}
