"use client";
import React, { useEffect, useState } from "react";
import { Check, CheckCircle, Loader2 } from "lucide-react";
import { getDecodedJwt } from "../../lib/auth";
import { useUserProducts } from "../../lib/api/products";

interface SelectProductsDialogProps {
  open: boolean;
  onClose: () => void;
  location: string;
  onSave: (
    selected: {
      productId: string;
      variationId?: string;
      name: string;
      sku: string;
      price: number;
      quantity: number;
    }[],
  ) => void;
}

export default function SelectProductsDialog({
  open,
  onClose,
  location,
  onSave,
}: SelectProductsDialogProps) {
  const user = getDecodedJwt();
  const userId = user?.id;

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error } = useUserProducts(userId, {
    search: debouncedSearch,
    location,
  });

  const [selectedItems, setSelectedItems] = useState<
    {
      productId: string;
      variationId?: string;
      quantity: number;
    }[]
  >([]);

  const toggleSelection = (productId: string, variationId?: string) => {
    setSelectedItems((prev) => {
      const exists = prev.find(
        (p) => p.productId === productId && p.variationId === variationId,
      );

      if (exists) {
        return prev.filter(
          (p) => !(p.productId === productId && p.variationId === variationId),
        );
      }

      return [...prev, { productId, variationId, quantity: 1 }];
    });
  };

  const updateQuantity = (
    productId: string,
    variationId: string | undefined,
    delta: number,
  ) => {
    setSelectedItems((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.variationId === variationId) {
          return {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
          };
        }
        return item;
      }),
    );
  };

  const handleSave = () => {
    const payload = selectedItems.map(
      ({ productId, variationId, quantity }) => {
        const product = data?.products.find((p) => p._id === productId)!;

        if (variationId) {
          const variation = product.variations.find(
            (v) => v._id === variationId,
          )!;

          return {
            productId,
            variationId,
            name: `${product.name} (${variation.name})`,
            sku: variation.sku,
            price:
              variation.discountPrice && variation.discountPrice !== 0
                ? variation.discountPrice
                : variation.price,
            quantity,
          };
        }

        return {
          productId,
          name: product.name,
          sku: product.sku,
          price:
            product.discountPrice && product.discountPrice !== 0
              ? product.discountPrice
              : product.price,
          quantity,
        };
      },
    );

    onSave(payload);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-6 z-10 mx-4 ">
        <h3 className="text-lg font-semibold text-gray-800">Select Products</h3>
        <p className="text-sm text-gray-500 mt-1 mb-3">
          Choose one or more products from your catalog.
        </p>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products or variations..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {search && (
          <p className="mt-1 text-xs text-gray-500">
            Showing results for “{search}”
          </p>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-purple-600 animate-spin" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        )}

        {data?.total === 0 && (
          <div className="flex items-center justify-center py-10">
            {location ? (
              <span className="ml-2 text-gray-600">
                No products found for this location...
              </span>
            ) : (
              <span className="ml-2 text-gray-600">No products found...</span>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center py-6">
            Failed to load products.
          </p>
        )}

        {/* Product List */}
        {!isLoading && !error && (
          <div className="mt-4 space-y-4 max-h-64 overflow-y-auto">
            {data?.products?.map((product) => {
              const hasVariations = product.variations?.length > 0;

              return (
                <div key={product._id} className="border rounded-lg p-3">
                  <p className="font-medium text-gray-800">{product.name}</p>

                  {/* SIMPLE PRODUCT */}
                  {!hasVariations && (
                    <div
                      onClick={() => toggleSelection(product._id)}
                      className={`mt-2 flex justify-between items-center cursor-pointer p-2 rounded-md border hover:bg-gray-50 ${
                        selectedItems.some(
                          (i) => i.productId === product._id && !i.variationId,
                        ) && "border-purple-400"
                      }`}
                    >
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        {product.discountPrice &&
                        product.discountPrice !== 0 ? (
                          <>
                            <span className="line-through text-gray-400">
                              ₦{product.price?.toLocaleString()}
                            </span>
                            <span className="font-semibold text-green-600">
                              ₦{product.discountPrice.toLocaleString()}
                            </span>
                          </>
                        ) : (
                          <span>₦{product.price?.toLocaleString()}</span>
                        )}
                        · Stock: {product.totalStock}
                      </span>

                      {selectedItems.some(
                        (i) => i.productId === product._id && !i.variationId,
                      ) ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(product._id, undefined, -1);
                            }}
                            className="px-2 py-1 border rounded"
                          >
                            −
                          </button>

                          <span className="text-sm font-medium">
                            {
                              selectedItems.find(
                                (i) =>
                                  i.productId === product._id && !i.variationId,
                              )?.quantity
                            }
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(product._id, undefined, 1);
                            }}
                            className="px-2 py-1 border rounded"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  )}

                  {/* VARIATIONS */}
                  {hasVariations && (
                    <div className="mt-2 space-y-2">
                      {product.variations.map((v) => (
                        <div
                          key={v._id}
                          onClick={() => toggleSelection(product._id, v._id)}
                          className={`flex justify-between items-center cursor-pointer p-2 rounded-md border hover:bg-gray-50 ${
                            selectedItems.some(
                              (i) =>
                                i.productId === product._id &&
                                i.variationId === v._id,
                            ) && "border-purple-400"
                          }`}
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {v.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {v.discountPrice && v.discountPrice !== 0 ? (
                                <>
                                  <span className="line-through text-gray-400 mr-1">
                                    ₦{v.price?.toLocaleString()}
                                  </span>
                                  <span className="font-semibold text-green-600">
                                    ₦{v.discountPrice.toLocaleString()}
                                  </span>
                                </>
                              ) : (
                                <span>₦{v.price?.toLocaleString()}</span>
                              )}{" "}
                              · Stock: {v.stock}
                            </p>
                          </div>

                          {selectedItems.some(
                            (i) =>
                              i.productId === product._id &&
                              i.variationId === v._id,
                          ) ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(product._id, v._id, -1);
                                }}
                                className="px-2 py-1 border rounded"
                              >
                                −
                              </button>

                              <span className="text-sm font-medium">
                                {
                                  selectedItems.find(
                                    (i) =>
                                      i.productId === product._id &&
                                      i.variationId === v._id,
                                  )?.quantity
                                }
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(product._id, v._id, 1);
                                }}
                                className="px-2 py-1 border rounded"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={selectedItems.length === 0}
            className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50"
          >
            Add Selected
          </button>
        </div>
      </div>
    </div>
  );
}

export function useDebounce<T>(value: T, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
