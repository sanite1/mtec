import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../lib/api/onboarding";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();
  const [mailSuccess, setMailSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: ForgotPasswordForm) => {
    setErrorMessage(null); // Reset previous error
    try {
      const res = await forgotPassword({ email: data.email });
      console.log("Reset link response:", res);

      setMailSuccess(true);
      toast.success("A reset link has been sent to your email.");
    } catch (error: any) {
      console.warn(error);

      // Extract message safely
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  // ✅ If success, show confirmation message
  if (mailSuccess) {
    return (
      <section
        className="
          relative min-h-screen 
          flex justify-center items-center 
          lg:bg-gradient-to-b lg:from-gray-900 lg:via-gray-800 lg:to-gray-900 
          text-white overflow-auto
          py-8 sm:py-12
        "
      >
        {/* Background Decorative Blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-20 w-[32rem] h-[32rem] lg:bg-purple-600 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] lg:bg-blue-600 rounded-full blur-3xl opacity-25"></div>
          <div className="absolute bottom-0 left-1/3 w-[18rem] h-[18rem] lg:bg-pink-500 rounded-full blur-3xl opacity-20"></div>
        </div>

        <div
          className="
            relative z-10 
            w-full max-w-md 
            mx-4 sm:mx-0 
            bg-white/10 backdrop-blur-xl 
            border border-white/20 
            rounded-2xl shadow-2xl 
            p-6 sm:p-10 text-center
          "
        >
          <h2 className="text-3xl font-bold text-gray-900 lg:text-white">
            Check Your Email
          </h2>
          <p className="text-gray-700 lg:text-gray-300 mt-3">
            You will receive a password reset link to{" "}
            <span className="text-purple-600">{watch("email")}</span> shortly.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-8 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition"
          >
            Back to Login
          </button>
        </div>
      </section>
    );
  }

  // ✅ Default Form
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
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-20 w-[32rem] h-[32rem] lg:bg-purple-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 -right-40 w-[28rem] h-[28rem] lg:bg-blue-600 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute bottom-0 left-1/3 w-[18rem] h-[18rem] lg:bg-pink-500 rounded-full blur-3xl opacity-20"></div>
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
          <h2 className="text-3xl font-bold mt-4 text-gray-900 lg:text-white">
            Forgot Password
          </h2>
          <p className="text-gray-700 text-sm mt-2 lg:text-gray-300">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <p className="text-red-600 lg:text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 lg:text-red-400 text-sm mt-2">
              {errorMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition disabled:opacity-50"
          >
            {isPending ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to login */}
        <p className="text-sm text-center mt-6 text-gray-700 lg:text-gray-300">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-600 hover:underline lg:text-purple-400"
          >
            Log in
          </button>
        </p>
      </div>
    </section>
  );
}
