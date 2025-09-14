import React from "react";

const VerifyEmailSuccess: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
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
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Email Verified Successfully!
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm text-gray-600">
          Your account has been verified. You can now log in and start using
          your dashboard.
        </p>

        {/* Login Button */}
        <div className="mt-6">
          <a
            href="/login"
            className="w-full inline-block bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailSuccess;
