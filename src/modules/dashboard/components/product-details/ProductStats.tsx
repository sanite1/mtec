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
import { ProductDetailsResponse } from "../../lib/types/products";

interface ProductDetailsProps {
  productDetails?: ProductDetailsResponse;
}

export default function ProductStats({ productDetails }: ProductDetailsProps) {
  const data = productDetails;

  // --- derived values ---
  const price = data?.discountPrice ?? data?.price ?? 0;
  const costPrice = data?.costPrice ?? 0;
  const totalStock = data?.totalStock ?? 0;
  // const totalSold = data?.totalSold ?? 0;

  const totalRetailValue = price * totalStock;
  const totalProfit = (price - costPrice) * totalStock;

  const stats = [
    {
      label: "Quantity in Stock",
      value: totalStock,
      icon: <Package className="w-6 h-6 text-blue-500" />,
      color: "from-blue-50 to-blue-100",
    },
    // {
    //   label: "Total Sold",
    //   value: totalSold,
    //   icon: <ShoppingCart className="w-6 h-6 text-green-500" />,
    //   color: "from-green-50 to-green-100",
    // },
    // {
    //   label: "Total Returned",
    //   value: data?.totalReturned ?? "—",
    //   icon: <RotateCcw className="w-6 h-6 text-yellow-500" />,
    //   color: "from-yellow-50 to-yellow-100",
    // },
    // {
    //   label: "Total Removed",
    //   value: data?.totalRemoved ?? "—",
    //   icon: <Trash2 className="w-6 h-6 text-red-500" />,
    //   color: "from-red-50 to-red-100",
    // },
    {
      label: "Retail Price",
      value: data?.price !== undefined ? `₦${price.toLocaleString()}` : "—",
      icon: <Tag className="w-6 h-6 text-purple-500" />,
      color: "from-purple-50 to-purple-100",
    },
    {
      label: "Cost Price",
      value:
        data?.costPrice !== undefined ? `₦${costPrice.toLocaleString()}` : "—",
      icon: <DollarSign className="w-6 h-6 text-indigo-500" />,
      color: "from-indigo-50 to-indigo-100",
    },
    {
      label: "Total Profit",
      value: totalProfit > 0 ? `₦${totalProfit.toLocaleString()}` : "—",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      color: "from-green-50 to-green-100",
    },
    {
      label: "Total Retail Value",
      value:
        totalRetailValue > 0 ? `₦${totalRetailValue.toLocaleString()}` : "—",
      icon: <Layers className="w-6 h-6 text-pink-500" />,
      color: "from-pink-50 to-pink-100",
    },
  ];

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
