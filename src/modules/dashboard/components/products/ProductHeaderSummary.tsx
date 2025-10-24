import React from "react";
import {
  PlusCircle,
  Package,
  CheckCircle,
  XCircle,
  BarChart2,
  Info,
} from "lucide-react";
import { Tooltip, IconButton } from "@mui/material";

// ✅ Type safety with optional fields
interface ProductSummaryProps {
  totalProducts?: number;
  activeProducts?: number;
  inactiveProducts?: number;
  totalRetailValue?: number;
  onAddProduct?: () => void;
}

// ✅ Safe number formatting helper
const safeNumber = (value?: number, fallback: number = 0): number =>
  typeof value === "number" && !isNaN(value) ? value : fallback;

// ✅ Safe currency formatter
const formatCurrency = (value?: number): string => {
  const num = safeNumber(value);
  return `₦${num.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
};

const ProductHeaderSummary: React.FC<ProductSummaryProps> = ({
  totalProducts,
  activeProducts,
  inactiveProducts,
  totalRetailValue,
  onAddProduct,
}) => {
  // ✅ Apply safe defaults to prevent crashes
  const safeTotals = {
    totalProducts: safeNumber(totalProducts),
    activeProducts: safeNumber(activeProducts),
    inactiveProducts: safeNumber(inactiveProducts),
    totalRetailValue: safeNumber(totalRetailValue),
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your store’s products, prices, stock levels, and sales
            performance.
          </p>
        </div>

        {onAddProduct && (
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
          >
            <PlusCircle size={20} />
            Add Product
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="relative rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-blue-600 font-medium">
                  Total Products
                </p>
                <Tooltip title="The total number of products in your catalog">
                  <IconButton size="small" className="text-blue-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-3xl font-bold text-blue-900">
                {safeTotals.totalProducts}
              </p>
            </div>
            <Package className="w-10 h-10 text-blue-500 opacity-80" />
          </div>
        </div>

        {/* Active Products */}
        <div className="relative rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-green-600 font-medium">Active</p>
                <Tooltip title="Number of products currently available for sale">
                  <IconButton size="small" className="text-green-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-3xl font-bold text-green-900">
                {safeTotals.activeProducts}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500 opacity-80" />
          </div>
        </div>

        {/* Inactive Products */}
        <div className="relative rounded-xl bg-gradient-to-r from-red-50 to-red-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-red-600 font-medium">Inactive</p>
                <Tooltip title="Products not currently available (e.g., out of stock, hidden)">
                  <IconButton size="small" className="text-red-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-3xl font-bold text-red-900">
                {safeTotals.inactiveProducts}
              </p>
            </div>
            <XCircle className="w-10 h-10 text-red-500 opacity-80" />
          </div>
        </div>

        {/* Total Retail Value */}
        <div className="relative rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-indigo-600 font-medium">
                  Total Retail Value
                </p>
                <Tooltip title="Total potential revenue if all stock is sold at retail price">
                  <IconButton size="small" className="text-indigo-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-2xl font-bold text-indigo-900">
                {formatCurrency(safeTotals.totalRetailValue)}
              </p>
            </div>
            <BarChart2 className="w-10 h-10 text-indigo-500 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeaderSummary;
