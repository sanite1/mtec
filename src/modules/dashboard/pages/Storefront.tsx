// pages/Storefront.tsx
import React from "react";
import exampleStoreFront from "../assets/exampleStoreFront.png";
import { useNavigate } from "react-router-dom";

const Storefront = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Storefront Customisation
        </h1>
        <p className="text-gray-600 mt-1">Choose your preferred store theme</p>
      </div>

      {/* My Themes */}
      <section>
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          My Theme(s)
        </h2>
        <div className="flex gap-6 flex-wrap">
          {/* Active Theme Card */}
          <div
            onClick={() => {
              navigate("/storefront/customization/mtec");
            }}
            className="w-72 cursor-pointer bg-white border rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="h-44 bg-gray-200 flex items-center justify-center p-3">
              <img
                src={exampleStoreFront}
                alt="Theme preview"
                className="h-full w-full object-cover rounded-md"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-medium text-gray-900">MTEC</h3>
              <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium">
                Current
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* More Themes */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          More Themes
        </h2>
        <p className="text-gray-600 mb-4">
          You can buy more themes to elevate your store’s look and feel.
        </p>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button className="px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-medium shadow-sm hover:bg-purple-700 transition">
            All
          </button>
          <button className="px-5 py-2 rounded-full bg-white text-gray-700 border hover:bg-gray-50 text-sm font-medium">
            Fashion
          </button>
          <button className="px-5 py-2 rounded-full bg-white text-gray-700 border hover:bg-gray-50 text-sm font-medium">
            Electronics
          </button>
        </div>

        {/* Coming Soon */}
        <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg bg-white text-gray-500 font-medium">
          🚀 New themes coming soon...
        </div>
      </section>
    </div>
  );
};

export default Storefront;
