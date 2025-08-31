import React from "react";

export default function UnderConstruction() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-yellow-500 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M4.293 6.293a1 1 0 011.414 0L12 12.586l6.293-6.293a1 
              1 0 111.414 1.414L13.414 14l6.293 6.293a1 1 0 
              01-1.414 1.414L12 15.414l-6.293 6.293a1 1 0 
              01-1.414-1.414L10.586 14 4.293 7.707a1 1 0 
              010-1.414z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Page Under Construction
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We’re working hard to finish the development of this page. Please
          check back soon or return to the homepage.
        </p>

        {/* Button */}
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
