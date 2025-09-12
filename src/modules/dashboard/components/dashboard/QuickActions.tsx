import React from "react";

const actions = [
  { label: "Create New Order", color: "bg-green-100 text-green-700" },
  { label: "Add New Product", color: "bg-blue-100 text-blue-700" },
  { label: "Run Sales Report", color: "bg-purple-100 text-purple-700" },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Actions
      </h2>
      <div className="space-y-3">
        {actions.map((action, i) => (
          <button
            key={i}
            className={`w-full py-2 rounded-md text-sm font-medium ${action.color} hover:opacity-80`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
