import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import { sampleProducts } from "../../data/products";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { ProductDetails } from "../../lib/types/products";
import { useFetchSingleProduct } from "../../lib/api/products";
import { IStoreDetails } from "../../lib/types/store";
import { ConvertPriceRangeToLocale } from "../../lib/utils/utils";

function getPermutations(arr: string[]): string[][] {
  if (arr.length === 1) return [arr];

  const results: string[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = getPermutations(rest);

    for (const perm of perms) {
      results.push([arr[i], ...perm]);
    }
  }

  return results;
}

export function findMatchingVariation(
  selectedAttributes: Record<string, string>,
  variations: {
    _id: string;
    name: string;
    sku: string;
    price: number;
    costPrice: number;
    discountPrice: number;
    stock: number;
    createdAt?: string;
    updatedAt?: string;
  }[],
) {
  // ✅ Extract values only: ["Blue", "Large"]
  const values = Object.values(selectedAttributes);

  // ✅ Generate all permutations
  const permutations = getPermutations(values);

  // ✅ Convert to "Blue / Large" format
  const formattedNames = permutations.map((p) => p.join(" / "));

  // ✅ Find matching variation
  return variations.find((variation) =>
    formattedNames.includes(variation.name),
  );
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );

  const {
    data: product,
    isLoading: loadingProductDetails,
    isError,
    refetch: refetchDetails,
  } = useFetchSingleProduct(store.userId, id as string);

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState<number>(1);

  const { state, dispatch } = useCart();
  const { cart } = state;

  if (loadingProductDetails) {
    return (
      <div className="text-center py-10  h-[50vh] items-center flex w-full">
        <span className="w-full">Loading product...</span>.
      </div>
    );
  }

  if (!product || isError) {
    return (
      <div className="text-center py-10 text-red-500 h-[50vh] items-center flex w-full">
        <span className="w-full">Products Not Found.</span>
      </div>
    );
  }
  const handleAttributeSelect = (key: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const matchingVariation = findMatchingVariation(
    selectedAttributes,
    product.variations,
  );
  const handleAddToCart = () => {
    const hasSelectedAttributes =
      selectedAttributes && Object.keys(selectedAttributes).length > 0;

    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productDetails: product,
        quantity,
        productId: product._id,
        name: product.name,
        ...(hasSelectedAttributes
          ? {
              variationId: matchingVariation?._id,
              price: matchingVariation?.discountPrice
                ? matchingVariation.discountPrice
                : matchingVariation?.price || 0,
              sku: matchingVariation?.sku,
            }
          : {
              price: product.discountPrice
                ? product.discountPrice
                : product?.price || 0,
              sku: product?.sku,
            }),
        selectedAttributes,
      },
    });

    toast.success(`${product.name} added to cart! 🛒`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left - Product Image */}
        <div className="flex justify-center items-start w-full">
          <img
            src={product.images ? product.images[0] : ""}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md object-contain"
          />
        </div>

        {/* Right - Product Info */}
        <div>
          {store.showStockCount && (
            <span
              className={`mb-4 inline-block px-2 py-1 rounded-full text-sm font-semibold ${store.lowStock && product.totalStock < store.lowStock ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
            >
              {product.totalStock} remaining
            </span>
          )}
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center space-x-1 mb-4">
            {product.discountPrice && (
              <span className="text-gray-400 line-through text-lg">
                ₦{product.price?.toLocaleString()}
              </span>
            )}
            {product.variantsOptionGroup &&
              Object.keys(selectedAttributes).length ===
                product.variantsOptionGroup.length && (
                <span className="text-gray-400 line-through text-lg">
                  {product.variantsOptionGroup &&
                  product.variantsOptionGroup.length > 0 &&
                  Object.keys(selectedAttributes).length <
                    product.variantsOptionGroup.length
                    ? ConvertPriceRangeToLocale(product?.priceRange)
                    : matchingVariation?.discountPrice
                      ? ConvertPriceRangeToLocale(
                          String(matchingVariation?.price),
                        )
                      : ""}
                </span>
              )}
            {product.variantsOptionGroup && (
              <span
                className={`text-[${store.storeColor}] text-2xl font-semibold`}
                style={{
                  color: store.storeColor,
                }}
              >
                {product.variantsOptionGroup &&
                product.variantsOptionGroup.length > 0 &&
                Object.keys(selectedAttributes).length <
                  product.variantsOptionGroup.length
                  ? ConvertPriceRangeToLocale(product?.priceRange)
                  : matchingVariation?.discountPrice
                    ? ConvertPriceRangeToLocale(
                        String(matchingVariation?.discountPrice),
                      )
                    : ConvertPriceRangeToLocale(
                        String(matchingVariation?.price),
                      )}
              </span>
            )}
            {product.price && (
              <span
                className={`text-[${store.storeColor}] text-2xl font-semibold`}
                style={{
                  color: store.storeColor,
                }}
              >
                ₦
                {product.discountPrice
                  ? product.discountPrice.toLocaleString()
                  : product?.price?.toLocaleString()}
              </span>
            )}
          </div>

          {/* Category */}
          {product.category && (
            <p className="text-sm text-gray-500 mb-6">
              Category: {product.category}
            </p>
          )}

          {/* Attributes */}
          {product.variantsOptionGroup &&
            product.variantsOptionGroup.map((attr) => (
              <div key={attr.name} className="mb-5">
                <h4 className="font-medium mb-2">{attr.name}</h4>
                <div className="flex gap-2 flex-wrap">
                  {attr.values.map((val) => (
                    <button
                      key={val.id}
                      onClick={() =>
                        handleAttributeSelect(attr.name, val.value)
                      }
                      className={`px-4 py-1 text-sm rounded border transition ${
                        selectedAttributes[attr.name] === val.value
                          ? `bg-[${store.storeColor}] text-white border-[${store.storeColor}]`
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                      style={
                        selectedAttributes[attr.name] === val.value
                          ? {
                              backgroundColor: store.storeColor,
                              borderColor: store.storeColor,
                              color: store.isLightColor ? "#000" : "#fff",
                            }
                          : {}
                      }
                    >
                      {val.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={
              product.variantsOptionGroup &&
              product.variantsOptionGroup.length > 0 &&
              Object.keys(selectedAttributes).length <
                product.variantsOptionGroup.length
            }
            className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition
              ${
                product.variantsOptionGroup &&
                product.variantsOptionGroup.length > 0 &&
                Object.keys(selectedAttributes).length <
                  product.variantsOptionGroup.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : `bg-[${store.storeColor}] hover:bg-[${store.storeColor}] text-white`
              }`}
            style={
              product.variantsOptionGroup &&
              product.variantsOptionGroup.length > 0 &&
              Object.keys(selectedAttributes).length <
                product.variantsOptionGroup.length
                ? {}
                : {
                    backgroundColor: store.storeColor,
                    borderColor: store.storeColor,
                    color: store.isLightColor ? "#000" : "#fff",
                  }
            }
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Full-width Description */}
      {product.description && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
