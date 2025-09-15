// components/products/ProductHeaderSummary.tsx
import React from "react";
import { PlusCircle, Package, CheckCircle, XCircle } from "lucide-react";

interface ProductSummaryProps {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  onAddProduct?: () => void;
}

const ProductHeaderSummary: React.FC<ProductSummaryProps> = ({
  totalProducts,
  activeProducts,
  inactiveProducts,
  onAddProduct,
}) => {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold ">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your store’s products, prices, and stock levels in one place.
          </p>
        </div>

        {onAddProduct && (
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-lg bg-purple-600  text-white font-medium hover:bg-purple-700 transition-transform transform hover:scale-105"
          >
            <PlusCircle size={20} />
            Add Product
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Products */}
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">
                Total Products
              </p>
              <p className="mt-1 text-3xl font-bold text-blue-900">
                {totalProducts}
              </p>
            </div>
            <Package className="w-10 h-10 text-blue-500 opacity-80" />
          </div>
        </div>

        {/* Active Products */}
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Active</p>
              <p className="mt-1 text-3xl font-bold text-green-900">
                {activeProducts}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500 opacity-80" />
          </div>
        </div>

        {/* Inactive Products */}
        <div className="rounded-xl bg-gradient-to-r from-red-50 to-red-100 p-5 shadow hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Inactive</p>
              <p className="mt-1 text-3xl font-bold text-red-900">
                {inactiveProducts}
              </p>
            </div>
            <XCircle className="w-10 h-10 text-red-500 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeaderSummary;
