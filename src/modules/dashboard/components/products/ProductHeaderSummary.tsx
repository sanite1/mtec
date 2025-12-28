import React from "react";
import {
  PlusCircle,
  Package,
  CheckCircle,
  XCircle,
  BarChart2,
  Box,
} from "lucide-react";

// ✅ Type safety with optional fields
interface ProductSummaryProps {
  totalProducts?: number;
  activeProducts?: number;
  totalCostValue?: number;
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
  totalCostValue,
  totalRetailValue,
  onAddProduct,
}) => {
  // ✅ Apply safe defaults to prevent crashes
  const safeTotals = {
    totalProducts: safeNumber(totalProducts),
    activeProducts: safeNumber(activeProducts),
    totalCostValue: safeNumber(totalCostValue),
    totalRetailValue: safeNumber(totalRetailValue),
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="z-10">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600 mt-1">
            Manage your store’s products, prices, stock levels, and sales
            performance.
          </p>
        </div>

        {onAddProduct && (
          <button
            onClick={onAddProduct}
            className="text-sm flex items-center gap-2 px-5 py-2.5 rounded-lg shadow-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition w-fit"
          >
            <PlusCircle />
            Add Product
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Products */}
        <div className="relative rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <div className="flex items-center space-x-2">
                <p className="text-xs md:text-sm text-blue-600 font-medium">
                  Total Products
                </p>
                {/* <Tooltip title="The total number of products in your catalog">
                  <IconButton size="small" className="text-blue-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip> */}
              </div>
              <p className="mt-1 text-md md:text-xl font-bold text-blue-900">
                {safeTotals.totalProducts}
              </p>
            </div>
            <Package className="absolute md:relative flex-shrink-0 right-0 text-blue-500 opacity-80" />
          </div>
        </div>

        {/* Active Products */}
        <div className="relative rounded-xl bg-gradient-to-r from-green-50 to-green-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <div className="flex items-center space-x-2">
                <p className="text-xs md:text-sm text-green-600 font-medium">
                  Active
                </p>
                {/* <Tooltip title="Number of products currently available for sale">
                  <IconButton size="small" className="text-green-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip> */}
              </div>
              <p className="mt-1 text-md md:text-xl font-bold text-green-900">
                {safeTotals.activeProducts}
              </p>
            </div>
            <CheckCircle className="absolute md:relative flex-shrink-0 right-0 text-green-500 opacity-80" />
          </div>
        </div>

        {/* Inactive Products */}
        <div className="relative rounded-xl bg-gradient-to-r from-yellow-50 to-yellow-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <div className="flex items-center space-x-2">
                <p className="text-xs md:text-sm text-yellow-600 font-medium">
                  Total Cost Value
                </p>
                {/* <Tooltip title="Products not currently available (e.g., out of stock, hidden)">
                  <IconButton size="small" className="text-yellow-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip> */}
              </div>
              <p className="mt-1 text-md md:text-xl font-bold text-yellow-900">
                {formatCurrency(safeTotals.totalCostValue)}
              </p>
            </div>
            <Box className="absolute md:relative flex-shrink-0 right-0 text-yellow-500 opacity-80" />
          </div>
        </div>

        {/* Total Retail Value */}
        <div className="relative rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100 p-5 shadow hover:shadow-md transition">
          <div className="relative flex items-center justify-between">
            <div className="z-10">
              <div className="flex items-center space-x-2">
                <p className="text-xs md:text-sm text-indigo-600 font-medium">
                  Total Retail Value
                </p>
                {/* <Tooltip title="Total potential revenue if all stock is sold at retail price">
                  <IconButton size="small" className="text-indigo-500">
                    <Info size={16} />
                  </IconButton>
                </Tooltip> */}
              </div>
              <p className="mt-1 text-md md:text-xl font-bold text-indigo-900">
                {formatCurrency(safeTotals.totalRetailValue)}
              </p>
            </div>
            <BarChart2 className="absolute md:relative flex-shrink-0 right-0 text-indigo-500 opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeaderSummary;
