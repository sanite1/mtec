// PricingSection.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import RequestDemoModal from "../contact/RequestDemoModal";

const PricingSection: React.FC = () => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r py-20 px-6 text-black">
      <RequestDemoModal open={demoOpen} setOpen={setDemoOpen} />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left">
          <p className="text-sm uppercase tracking-widest text-purple-500">
            MTEC Enterprise Pricing
          </p>
          <h1 className="text-4xl font-bold mt-3 leading-snug">
            Scalable plans. <br className="hidden md:block" />
            No additional transaction fees.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Our enterprise eCommerce plans come with enhanced features to power
            your business success. Request a quote to discover how MTEC is
            powerful, flexible, and cost-effective.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 justify-center lg:justify-start">
            {/* Pricing Link */}
            <Link
              to="/pricing"
              className="bg-red-500 text-white px-6 py-2 text-lg rounded-lg font-semibold hover:bg-red-400 transition"
            >
              View Pricing
            </Link>

            {/* Demo Modal Button */}
            <button
              onClick={() => setDemoOpen(true)}
              className="bg-purple-600 text-white text-lg px-6 py-2 rounded-lg font-semibold hover:bg-purple-500 transition"
            >
              Schedule a Demo
            </button>
          </div>

          {/* Small Business Link */}
          <p className="mt-6 text-sm text-gray-500">
            Looking for small business plans?{" "}
            <a href="/pricing" className="underline hover:text-purple-500">
              View Essentials
            </a>
          </p>
        </div>

        {/* RIGHT VISUAL MOCKUP */}
        <div className="text-[#fff] relative flex flex-col items-center lg:items-end space-y-6">
          {/* Dashboard Card */}
          <div className="w-full max-w-md bg-gray-800 p-5 rounded-xl shadow-lg">
            {/* Current Month Section */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Current Month</span>
              <span className="text-xs text-gray-400 cursor-pointer">
                + View
              </span>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg">
              <div className="flex justify-between text-xs">
                <span>Order Visits</span>
                <span>6,219</span>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span>Conversions</span>
                <span className="text-gray-400">Q1</span>
              </div>
              <div className="w-full h-20 bg-gray-700 mt-3 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400">Graph Placeholder</span>
              </div>
            </div>

            {/* Product Performance Section */}
            <div className="mt-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium">Product Performance</span>
                <span className="text-xs text-gray-400 cursor-pointer">
                  + View
                </span>
              </div>
              <div className="bg-gray-900 p-3 rounded-lg space-y-2 text-xs">
                <div className="flex justify-between font-medium text-gray-400">
                  <span>Product</span>
                  <span>Sales</span>
                  <span>Category</span>
                </div>
                <div className="flex justify-between">
                  <span>#PRODUCT1</span>
                  <span>305</span>
                  <span>Jewelry</span>
                </div>
                <div className="flex justify-between">
                  <span>#PRODUCT2</span>
                  <span>287</span>
                  <span>Shoes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Store Card */}
          <div className="bg-black p-4 rounded-lg shadow-lg w-60">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">MTEC Store</span>
              <span className="text-xs text-gray-400">View Store</span>
            </div>
            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>10</span>
              </div>
              <div className="flex justify-between">
                <span>Orders</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
