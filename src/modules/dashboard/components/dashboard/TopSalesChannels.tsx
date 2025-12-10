import React from "react";
import { useFetchTopSellingProducts } from "../../lib/api/dashboard";
import { getDecodedJwt } from "../../lib/auth";

export default function TopSalesChannels() {
  const user = getDecodedJwt();
  const { data, isLoading } = useFetchTopSellingProducts(user?.id);

  const products = data || [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Top Selling Products
      </h2>

      {/* Loading State */}
      {isLoading && (
        <p className="text-sm text-gray-500 text-center py-6">Loading...</p>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && (
        <>
          <p className="text-sm text-gray-500 text-center py-6">
            No sales data available
          </p>
          <div className="text-center">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
              Create Order
            </button>
          </div>
        </>
      )}

      {/* Data State */}
      {!isLoading && products.length > 0 && (
        <ul className="space-y-4">
          {products.map((product) => (
            <li
              key={product.productId}
              className="flex items-center justify-between border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md border"
                />
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    Sold:{" "}
                    <span className="font-semibold">{product.totalSold}</span>
                  </p>
                </div>
              </div>

              <p className="font-semibold text-gray-700">
                ₦{product.price.toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
