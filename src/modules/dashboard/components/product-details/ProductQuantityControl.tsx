import React from "react";
import {
  ProductDetailsResponse,
  ProductVariation,
} from "../../lib/types/products";
import { Package, Layers, Tag, Cuboid } from "lucide-react"; // ✅ fixed here

interface ProductDetailsProps {
  productDetails?: ProductDetailsResponse;
}

export default function ProductQuantityControl({
  productDetails,
}: ProductDetailsProps) {
  const variations: ProductVariation[] = Array.isArray(
    productDetails?.variations,
  )
    ? productDetails!.variations
    : [];

  const hasVariations = variations.length > 0;

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <Cuboid className="text-purple-600 w-6 h-6" /> {/* ✅ replaced Box */}
        <h3 className="text-xl font-semibold text-gray-800">
          {hasVariations ? "Product Variations" : "Stock Summary"}
        </h3>
      </div>

      {hasVariations ? (
        <div className="space-y-4">
          {variations.map((variation) => (
            <div
              key={variation._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors p-4 rounded-xl border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <Layers className="text-gray-400 w-5 h-5" />
                <div>
                  <p className="font-medium text-gray-800">{variation.name}</p>
                  <p className="text-sm text-gray-500">
                    <Tag className="inline w-4 h-4 text-gray-400 mr-1" />₦
                    {variation.price?.toLocaleString() ?? "0"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Package className="text-gray-400 w-5 h-5" />
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    variation.stock && variation.stock > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {variation.stock ?? 0} in stock
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors p-5 rounded-xl border border-gray-100">
          <div className="flex items-center gap-3">
            <Package className="text-gray-400 w-6 h-6" />
            <div>
              <p className="font-medium text-gray-800">Total Stock</p>
              <p className="text-sm text-gray-500">
                <Tag className="inline w-4 h-4 text-gray-400 mr-1" />₦
                {productDetails?.price
                  ? productDetails.price.toLocaleString()
                  : "0"}
              </p>
            </div>
          </div>

          <span
            className={`text-sm font-medium px-4 py-1 rounded-full ${
              productDetails?.totalStock && productDetails.totalStock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {productDetails?.totalStock ?? 0} in stock
          </span>
        </div>
      )}
    </div>
  );
}
