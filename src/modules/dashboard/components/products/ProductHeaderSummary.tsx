// components/products/ProductHeaderSummary.tsx
import React from "react";
import {
  PlusCircle,
  Package,
  CheckCircle,
  XCircle,
  DollarSign,
  ShoppingCart,
  BarChart2,
  TrendingUp,
  Info,
} from "lucide-react";
import { Tooltip, IconButton } from "@mui/material";

interface ProductSummaryProps {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  totalInventoryValue: number;
  totalRetailValue: number;
  retailValueSold: number;
  totalProfit: number;
  onAddProduct?: () => void;
}

const ProductHeaderSummary: React.FC<ProductSummaryProps> = ({
  totalProducts,
  activeProducts,
  inactiveProducts,
  totalInventoryValue,
  totalRetailValue,
  retailValueSold,
  totalProfit,
  onAddProduct,
}) => {
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
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
            <div className="">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-blue-600 font-medium">
                  Total Products
                </p>
                <Tooltip title="The total number of products in your catalog">
                  <IconButton size="small" className=" text-blue-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-3xl font-bold text-blue-900">
                {totalProducts}
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
                  <IconButton size="small" className=" text-green-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-3xl font-bold text-green-900">
                {activeProducts}
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
                  <IconButton size="small" className=" text-red-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-3xl font-bold text-red-900">
                {inactiveProducts}
              </p>
            </div>
            <XCircle className="w-10 h-10 text-red-500 opacity-80" />
          </div>
        </div>

        {/* Total Inventory Value */}
        <div className="relative rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-yellow-600 font-medium">
                  Inventory Value
                </p>
                <Tooltip title="The total cost value of all stock you currently hold">
                  <IconButton size="small" className="text-yellow-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-2xl font-bold text-yellow-900">
                ₦{totalInventoryValue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-10 h-10 text-yellow-500 opacity-80" />
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
                  <IconButton size="small" className=" text-indigo-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-2xl font-bold text-indigo-900">
                ₦{totalRetailValue.toLocaleString()}
              </p>
            </div>
            <BarChart2 className="w-10 h-10 text-indigo-500 opacity-80" />
          </div>
        </div>

        {/* Retail Value Sold */}
        <div className="relative rounded-xl bg-gradient-to-r from-pink-50 to-pink-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-pink-600 font-medium">
                  Retail Value Sold
                </p>
                <Tooltip title="The total value of products already sold at retail price">
                  <IconButton size="small" className=" text-pink-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-2xl font-bold text-pink-900">
                ₦{retailValueSold.toLocaleString()}
              </p>
            </div>
            <ShoppingCart className="w-10 h-10 text-pink-500 opacity-80" />
          </div>
        </div>

        {/* Total Profit */}
        <div className="relative rounded-xl bg-gradient-to-r from-teal-50 to-teal-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-teal-600 font-medium">
                  Total Profit
                </p>
                <Tooltip title="Your total profit (sales minus costs)">
                  <IconButton size="small" className=" text-teal-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip>
              </div>
              <p className="mt-1 text-2xl font-bold text-teal-900">
                ₦{totalProfit.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-teal-500 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeaderSummary;
