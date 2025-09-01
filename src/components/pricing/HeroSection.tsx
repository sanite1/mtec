// HeroSection.tsx
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 lg:flex lg:items-center lg:gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Build, Customize & Sell <br />
            <span className="text-purple-400 sm:text-5xl lg:text-6xl ">
              Your Online Store
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
            Launch your e-commerce business in minutes. Manage products,
            payments, and shipping — all in one hub. Designed for growth,
            flexibility, and ease.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition">
              Get Started Free
            </button>
            <button className="px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition">
              View Pricing
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center relative">
          <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6">
            <div className="h-56 w-full bg-gradient-to-tr from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl font-bold text-white">
              Storefront Preview
            </div>
            <p className="mt-4 text-gray-400 text-center">
              A sleek customizable storefront that fits your brand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
