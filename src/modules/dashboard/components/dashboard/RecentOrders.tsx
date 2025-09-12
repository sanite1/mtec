import React from "react";

export default function RecentOrders() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        <select className="border rounded-md text-sm px-2 py-1">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="text-center text-gray-500 py-12">
        <p>No sales data available</p>
        <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
          Record Order
        </button>
      </div>
    </div>
  );
}
