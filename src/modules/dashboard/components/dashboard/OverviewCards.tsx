import React from "react";
import { ShoppingBag, Users, DollarSign, Box } from "lucide-react";
import { getDecodedJwt } from "../../lib/auth";
import { useDashboardStats } from "../../lib/api/dashboard";
import { ConvertPriceRangeToLocale } from "../../lib/utils/utils";

export default function OverviewCards() {
  const user = getDecodedJwt();
  const { data, isLoading } = useDashboardStats(user?.id || "");

  // ✅ Skeleton while loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow p-4 flex items-center gap-3 animate-pulse"
          >
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="h-5 w-28 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Safe fallback values (avoids undefined crashes)
  const stats = [
    {
      label: "Orders",
      value: data?.totalOrders ?? 0,
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Customers",
      value: data?.totalCustomers ?? 0,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Revenue",
      value: ConvertPriceRangeToLocale(String(data?.totalRevenue ?? 0)),
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Inventory Value",
      value: ConvertPriceRangeToLocale(String(data?.totalInventoryValue ?? 0)),
      icon: Box,
      color: "bg-pink-100 text-pink-600",
    },
  ];

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
            <p className="text-md md:text-lg font-semibold truncate max-w-[120px]">
              {stat.value ?? "—"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
