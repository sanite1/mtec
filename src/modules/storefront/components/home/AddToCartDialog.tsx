import { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";
import { ProductDetails } from "../../lib/types/products";
import { findMatchingVariation } from "../details/ProductDetails";

interface ProductDialogProps {
  product: ProductDetails;
  onClose: () => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ product, onClose }) => {
  const { dispatch } = useCart();
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState<number>(1);

  const handleAttributeSelect = (key: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    const matchingVariation = findMatchingVariation(
      selectedAttributes,
      product.variations,
    );
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        productDetails: product,
        quantity,
        productId: product._id,
        name: product.name,
        ...(selectedAttributes
          ? {
              variationId: matchingVariation?._id,
              price: matchingVariation?.price || 0,
              sku: matchingVariation?.sku,
            }
          : {
              price: product?.price || 0,
              sku: product?.sku,
            }),
      },
    });

    toast.success(`${product.name} added to cart! 🛒`);
    onClose();
  };

  // 🔒 Prevent scrolling behind dialog
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // close on backdrop
    >
      <div
        className="bg-white w-full max-w-4xl mx-4 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] relative"
        onClick={(e) => e.stopPropagation()} // prevent backdrop close on content click
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left - Product Image */}
          <div className="flex justify-center items-start w-full">
            <img
              src={product?.images ? product?.images[0] : ""}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md object-contain"
            />
          </div>

          {/* Right - Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-4">
              {product.discountPrice && (
                <span className="text-gray-400 line-through text-lg">
                  ₦{product.price?.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-semibold text-purple-600">
                ₦{product.price?.toLocaleString()}
              </span>
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
                        className={`px-4 py-2 rounded border transition ${
                          selectedAttributes[attr.name] === val.value
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
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
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Full-width Description */}
        {product.description && (
          <div className="px-6 pb-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              Product Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDialog;
