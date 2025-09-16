import React from "react";
import {
  ShoppingCart,
  Package,
  RotateCcw,
  Trash2,
  Tag,
  DollarSign,
  TrendingUp,
  Layers,
} from "lucide-react";

const stats = [
  {
    label: "Quantity in Stock",
    value: 120,
    icon: <Package className="w-6 h-6 text-blue-500" />,
    color: "from-blue-50 to-blue-100",
  },
  {
    label: "Total Sold",
    value: 350,
    icon: <ShoppingCart className="w-6 h-6 text-green-500" />,
    color: "from-green-50 to-green-100",
  },
  {
    label: "Total Returned",
    value: 15,
    icon: <RotateCcw className="w-6 h-6 text-yellow-500" />,
    color: "from-yellow-50 to-yellow-100",
  },
  {
    label: "Total Removed",
    value: 8,
    icon: <Trash2 className="w-6 h-6 text-red-500" />,
    color: "from-red-50 to-red-100",
  },
  {
    label: "Retail Price",
    value: "₦90,000.00",
    icon: <Tag className="w-6 h-6 text-purple-500" />,
    color: "from-purple-50 to-purple-100",
  },
  {
    label: "Cost Price",
    value: "₦70,000.00",
    icon: <DollarSign className="w-6 h-6 text-indigo-500" />,
    color: "from-indigo-50 to-indigo-100",
  },
  {
    label: "Total Profit",
    value: "₦7,000,000.00",
    icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    color: "from-green-50 to-green-100",
  },
  {
    label: "Total Retail Value",
    value: "₦10,800,000.00",
    icon: <Layers className="w-6 h-6 text-pink-500" />,
    color: "from-pink-50 to-pink-100",
  },
];

export default function ProductStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`bg-gradient-to-r ${stat.color} rounded-xl shadow p-5 flex items-center justify-between hover:shadow-md transition`}
        >
          <div>
            <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{stat.value}</p>
          </div>
          <div className="flex-shrink-0">{stat.icon}</div>
        </div>
      ))}
    </div>
  );
}
