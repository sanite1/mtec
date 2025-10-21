import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyAccount } from "../lib/api/authOnboarding";
import { Loader2 } from "lucide-react";

export default function VerifyEmailSuccess() {
  const navigate = useNavigate();
  const { mutateAsync: verifyAccount } = useVerifyAccount();
  const { id, token } = useParams();

  const [isVerified, setIsVerified] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current || !id || !token) return;
    hasCalled.current = true;

    const verify = async () => {
      try {
        await verifyAccount({ id: id as string, token: token as string });
        setIsVerified(true);
        setIsLoading(false);

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (error) {
        console.error("Verification failed:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    verify();
  }, [id, token, verifyAccount, navigate]);

  return (
    <section
      className="
        relative min-h-screen 
        flex justify-center items-start 
        lg:items-center
        lg:bg-gradient-to-b lg:from-gray-900 lg:via-gray-800 lg:to-gray-900 
        text-gray-900 lg:text-white overflow-auto
        py-8 sm:py-12
      "
    >
      {/* Background Decorative Blurs (Only on large screens) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hidden lg:block absolute -top-32 -left-20 w-[32rem] h-[32rem] bg-purple-600 rounded-full blur-3xl opacity-30"></div>
        <div className="hidden lg:block absolute top-1/2 -right-40 w-[28rem] h-[28rem] bg-blue-600 rounded-full blur-3xl opacity-25"></div>
        <div className="hidden lg:block absolute bottom-0 left-1/3 w-[18rem] h-[18rem] bg-pink-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Center Card */}
      <div
        className="
          relative z-10 
          w-full max-w-md 
          mx-4 sm:mx-0 
          bg-white/80 lg:bg-white/10 
          backdrop-blur-xl 
          border border-gray-200 lg:border-white/20 
          rounded-2xl shadow-2xl 
          p-8 sm:p-10 text-center
        "
      >
        {/* Loading State */}
        {isLoading && (
          <>
            <Loader2 className="mx-auto h-16 w-16 text-purple-600 mb-6 animate-spin" />
            <h2 className="text-2xl font-semibold lg:text-white">
              Verifying Account...
            </h2>
            <p className="mt-2 text-gray-600 lg:text-gray-400 text-sm">
              Please wait while we confirm your email.
            </p>
          </>
        )}

        {/* Success State */}
        {!isLoading && isVerified && !hasError && (
          <>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100/40 lg:bg-green-100/20 border border-green-400/30">
              <svg
                className="h-8 w-8 text-green-500 lg:text-green-400"
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

            <h2 className="mt-6 text-2xl font-bold text-gray-900 lg:text-white">
              Email Verified Successfully!
            </h2>
            <p className="mt-3 text-gray-600 lg:text-gray-300 text-sm">
              Your account has been verified. You’ll be redirected to the login
              page shortly.
            </p>

            <div className="mt-8">
              <button
                disabled
                className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg transition"
              >
                Redirecting to login...
              </button>
            </div>
          </>
        )}

        {/* Error State */}
        {!isLoading && hasError && (
          <>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100/40 lg:bg-red-100/20 border border-red-400/30">
              <svg
                className="h-8 w-8 text-red-500 lg:text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-red-500 lg:text-red-400">
              Verification Failed
            </h2>
            <p className="mt-3 text-gray-600 lg:text-gray-300 text-sm">
              The verification link may have expired or is invalid. Please try
              again or contact support.
            </p>

            <div className="mt-8">
              <button
                onClick={() => navigate("/signup")}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition"
              >
                Go to Signup
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
