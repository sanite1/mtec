import React from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {
  const navigate = useNavigate();

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
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100/20 border border-green-400/30">
          <svg
            className="h-8 w-8 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Message */}
        <div className="text-center mt-6">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-white">
            Confirm Your Email
          </h2>
          <p className="text-gray-700 text-sm mt-3 lg:text-gray-300 leading-relaxed">
            Thank you for signing up! We’ve sent a confirmation link to your
            email. Please check your inbox (and spam folder) to verify your
            account before signing in.
          </p>
        </div>

        {/* Back to Login Button */}
        <button
          onClick={() => navigate("/login")}
          className="w-full mt-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition"
        >
          Back to Login
        </button>

        {/* Extra Info */}
        <p className="text-center text-sm text-gray-700 lg:text-gray-300 mt-4">
          Didn’t receive the email?{" "}
          <a
            href="/resend-verification"
            className="text-purple-600 hover:underline lg:text-purple-400"
          >
            Resend Verification
          </a>
        </p>
      </div>
    </section>
  );
}
