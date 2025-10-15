import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailSuccess() {
  const navigate = useNavigate();

  return (
    <section
      className="
    fixed inset-0 
    flex justify-center items-center 
    bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 
    text-white overflow-hidden
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
          p-8 sm:p-10 text-center
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

        {/* Heading */}
        <h2 className="mt-6 text-3xl font-bold text-white">
          Email Verified Successfully!
        </h2>

        {/* Message */}
        <p className="mt-3 text-gray-300 text-sm">
          Your account has been verified. You can now log in and start using
          your dashboard.
        </p>

        {/* Login Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </section>
  );
}
