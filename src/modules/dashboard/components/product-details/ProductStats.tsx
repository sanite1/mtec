import React from "react";
import { Package, Tag, DollarSign, TrendingUp, Layers } from "lucide-react";
import { ProductDetailsResponse } from "../../lib/types/products";

interface ProductDetailsProps {
  productDetails?: ProductDetailsResponse;
}

export default function ProductStats({ productDetails }: ProductDetailsProps) {
  const data = productDetails;
  const hasVariations = data?.variations && data.variations.length > 0;

  // --- Utility for currency formatting ---
  const formatCurrency = (n?: number) =>
    n !== undefined ? `₦${n.toLocaleString()}` : "—";

  // --- Helpers for variation range calculations ---
  const getRange = (
    field: keyof NonNullable<ProductDetailsResponse["variations"]>[number],
  ): string => {
    const variations = productDetails?.variations ?? [];

    if (variations.length === 0) return "—";

    const values = variations
      .map((v) => v[field])
      .filter((v): v is number => typeof v === "number");

    if (values.length === 0) return "—";

    const min = Math.min(...values);
    const max = Math.max(...values);

    return min === max
      ? `₦${min.toLocaleString()}`
      : `₦${min.toLocaleString()} - ₦${max.toLocaleString()}`;
  };

  const totalStock = hasVariations
    ? (data?.variations?.reduce((sum, v) => sum + (v.stock || 0), 0) ?? 0)
    : (data?.totalStock ?? 0);

  const totalRetailValue = hasVariations
    ? (data?.variations?.reduce(
        (sum, v) => sum + (v.price || 0) * (v.stock || 0),
        0,
      ) ?? 0)
    : (data?.price || 0) * (data?.totalStock || 0);

  const totalProfit = hasVariations
    ? (data?.variations?.reduce(
        (sum, v) =>
          sum + ((v.price || 0) - (v.costPrice || 0)) * (v.stock || 0),
        0,
      ) ?? 0)
    : ((data?.price || 0) - (data?.costPrice || 0)) * (data?.totalStock || 0);

  // --- Stats definition ---
  const stats = [
    {
      label: "Quantity in Stock",
      value: totalStock.toLocaleString(),
      icon: <Package className="w-6 h-6 text-blue-500" />,
      color: "from-blue-50 to-blue-100",
    },
    {
      label: "Retail Price",
      value: hasVariations ? getRange("price") : formatCurrency(data?.price),
      icon: <Tag className="w-6 h-6 text-purple-500" />,
      color: "from-purple-50 to-purple-100",
    },
    {
      label: "Cost Price",
      value: hasVariations
        ? getRange("costPrice")
        : formatCurrency(data?.costPrice),
      icon: <DollarSign className="w-6 h-6 text-indigo-500" />,
      color: "from-indigo-50 to-indigo-100",
    },
    {
      label: "Total Profit",
      value: totalProfit > 0 ? formatCurrency(totalProfit) : "—",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      color: "from-green-50 to-green-100",
    },
    {
      label: "Total Retail Value",
      value: totalRetailValue > 0 ? formatCurrency(totalRetailValue) : "—",
      icon: <Layers className="w-6 h-6 text-pink-500" />,
      color: "from-pink-50 to-pink-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
