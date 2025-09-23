// components/common/ErrorPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      {/* Big 404 */}
      <h1 className="text-7xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or may have been
        moved.
      </p>

      {/* Action Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
