import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    console.log("Forgot password request submitted:", data);
    toast("If this email is registered, a password reset link will be sent.");
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
          <h2 className="text-3xl font-bold mt-4">Forgot Password</h2>
          <p className="text-gray-300 text-sm mt-2">
            Enter your email address and we’ll send you a link to reset your
            password.
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to login */}
        <p className="text-sm text-center mt-6 text-gray-300">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </section>
  );
}
