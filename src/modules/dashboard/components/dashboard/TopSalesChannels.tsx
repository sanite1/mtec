import React from "react";

export default function TopSalesChannels() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Top Sales Channels
      </h2>
      <p className="text-sm text-gray-500 text-center py-6">
        No sales data available
      </p>
      <div className="text-center">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
          Create Order
        </button>
      </div>
    </div>
  );
}
