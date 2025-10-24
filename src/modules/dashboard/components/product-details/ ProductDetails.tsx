import React from "react";
import {
  Tag,
  Percent,
  Calendar,
  Package,
  Layers,
  User,
  Box,
} from "lucide-react";
import { ProductDetailsResponse } from "../../lib/types/products";
import { getDecodedJwt } from "../../lib/auth";

interface ProductDetailsProps {
  productDetails?: ProductDetailsResponse;
}

export default function ProductDetails({
  productDetails,
}: ProductDetailsProps) {
  const user = getDecodedJwt();

  const details = [
    {
      label: "Cost Price",
      value: `₦${productDetails?.costPrice?.toLocaleString() || "—"}`,
      icon: <Box className="w-4 h-4 text-green-500" />,
    },
    {
      label: "Retail Price",
      value: `₦${productDetails?.price?.toLocaleString() || "—"}`,
      icon: <Tag className="w-4 h-4 text-blue-500" />,
    },
    {
      label: "Discounted Price",
      value: `₦${productDetails?.discountPrice?.toLocaleString() || "—"}`,
      icon: <Percent className="w-4 h-4 text-green-500" />,
    },
    {
      label: "Unit",
      value: productDetails?.unit || "—",
      icon: <Package className="w-4 h-4 text-orange-500" />,
    },
    {
      label: "Date Added",
      value: productDetails?.createdAt
        ? new Date(productDetails.createdAt).toLocaleDateString()
        : "—",
      icon: <Calendar className="w-4 h-4 text-purple-500" />,
    },
    {
      label: "Last Updated",
      value: productDetails?.updatedAt
        ? new Date(productDetails.updatedAt).toLocaleDateString()
        : "—",
      icon: <Calendar className="w-4 h-4 text-purple-500" />,
    },
    {
      label: "Created By",
      value: `${user?.firstname} ${user?.lastname}`,
      icon: <User className="w-4 h-4 text-teal-500" />,
      highlight: true,
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Product Details</h3>
      <ul className="space-y-4">
        {details.map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-between rounded-lg ${
              item.highlight
                ? "bg-teal-50 font-semibold text-teal-800"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-gray-600 text-sm">{item.label}</span>
            </div>
            <span
              className={`text-sm ${
                item.highlight ? "text-teal-700" : "text-gray-800"
              }`}
            >
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
