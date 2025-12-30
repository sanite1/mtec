import React from "react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    label: "Create New Order",
    action: "/orders/create",
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Add New Product",
    action: "/products/create",
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Run Sales Report",
    action: "/sales/create",
    color: "bg-purple-100 text-purple-700",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Actions
      </h2>
      <div className="space-y-3">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => {
              navigate(action.action);
            }}
            className={`w-full py-2 rounded-md text-sm font-medium ${action.color} hover:opacity-80`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}
