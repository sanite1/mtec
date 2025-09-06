// SupportSection.tsx
import React from "react";
import { Link } from "react-router-dom";

const SupportSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#12255a] to-[#1e3a8a] text-white py-16 px-8 rounded-2xl shadow-xl max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* LEFT CONTENT */}
      <div className="space-y-6 text-center lg:text-left">
        <h1 className="text-4xl font-bold leading-snug">
          Need guidance with <span className="text-yellow-400">MTEC</span>?
        </h1>
        <p className="text-lg text-gray-200">
          Our MTEC Support team is here to help you unlock the full potential of
          our platform. From setting up your storefront to scaling enterprise
          operations, we’ll guide you every step of the way.
        </p>

        <div className="mt-5">
          <Link
            to="/contact"
            className=" bg-yellow-400 text-[#12255a] px-8 py-3 text-lg rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Contact MTEC Support
          </Link>
        </div>
      </div>

      {/* RIGHT VISUALS */}
      <div className="flex justify-center lg:justify-end space-x-6">
        {/* Mock dashboard preview card */}
        <div className="w-40 h-56 bg-white rounded-lg shadow-lg flex flex-col justify-between p-4">
          <div>
            <p className="text-sm font-semibold text-[#12255a]">Orders</p>
            <p className="text-2xl font-bold text-[#1e3a8a]">152</p>
          </div>
          <div className="h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
            Chart
          </div>
        </div>

        {/* Mock support chat preview card */}
        <div className="w-40 h-56 bg-white rounded-lg shadow-lg flex flex-col p-4">
          <p className="text-sm font-semibold text-[#12255a] mb-2">
            Support Chat
          </p>
          <div className="flex-1 bg-gray-100 rounded p-2 text-xs text-gray-600">
            <p className="mb-1">👋 Hi! How can we help you today?</p>
            <p className="text-[#12255a] font-medium">
              I need help setting up payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportSection;
