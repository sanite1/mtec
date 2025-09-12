import React from "react";
import { ShoppingBag, Users, DollarSign, Globe } from "lucide-react";

const stats = [
  {
    label: "Orders",
    value: "0",
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Customers",
    value: "0",
    icon: Users,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Revenue",
    value: "₦0.00",
    icon: DollarSign,
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Website Visits",
    value: "0",
    icon: Globe,
    color: "bg-pink-100 text-pink-600",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-lg shadow p-4 flex items-center gap-3"
        >
          <div className={`p-2 rounded-full ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-lg font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
