import React from "react";

export default function OnboardingProgress() {
  return (
    <div className="bg-white mb-6 border rounded-lg shadow-sm p-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">
        Complete your onboarding
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        Complete the next steps to launch your website
      </p>

      {/* Progress / Next Step */}
      <div className="mt-4 flex items-center justify-between bg-purple-50 border border-purple-200 rounded-md p-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Next Step:{" "}
            <span className="text-purple-600">Add Payment Method</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Secure your store’s checkout process by connecting a payment method.
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700">
          Continue
        </button>
      </div>
    </div>
  );
}
