import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import { sampleProducts } from "../../data/products";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // get id from params
  const product: Product | undefined = sampleProducts.find(
    (p) => p.id.toString() === id
  );

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState<number>(1);
  const { dispatch } = useCart();

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-red-500">Product not found!</h2>
      </div>
    );
  }
  const handleAttributeSelect = (key: string, value: string) => {
    setSelectedAttributes((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity,
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
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-md object-contain"
          />
        </div>

        {/* Right - Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center space-x-4 mb-4">
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-lg">
                ₦{product.oldPrice.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-semibold text-purple-600">
              ₦{product.price.toLocaleString()}
            </span>
          </div>

          {/* Category */}
          {product.category && (
            <p className="text-sm text-gray-500 mb-6">
              Category: {product.category}
            </p>
          )}

          {/* Attributes */}
          {product.attributes &&
            product.attributes.map((attr) => (
              <div key={attr.name} className="mb-5">
                <h4 className="font-medium mb-2">{attr.name}</h4>
                <div className="flex gap-2 flex-wrap">
                  {attr.options.map((val) => (
                    <button
                      key={val}
                      onClick={() => handleAttributeSelect(attr.name, val)}
                      className={`px-4 py-2 rounded border transition ${
                        selectedAttributes[attr.name] === val
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {val}
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
              product.attributes &&
              product.attributes.length > 0 &&
              Object.keys(selectedAttributes).length < product.attributes.length
            }
            className={`flex items-center gap-2 px-6 py-3 rounded-lg shadow-md transition
    ${
      product.attributes &&
      product.attributes.length > 0 &&
      Object.keys(selectedAttributes).length < product.attributes.length
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
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
