import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import ProductDialog from "./AddToCartDialog";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { dispatch } = useCart();
  const [showDialog, setShowDialog] = useState(false);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...product,
        quantity: 1,
        selectedAttributes: {}, // no attributes
      },
    });

    toast.success(`${product.name} added to cart! 🛒`);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        </Link>
        <div className="mb-3">
          {product.oldPrice && (
            <span className="text-gray-500 line-through mr-2">
              ₦{product.oldPrice.toLocaleString()}
            </span>
          )}
          <span className="text-purple-600 font-bold">
            ₦{product.price.toLocaleString()}
          </span>
        </div>

        {/* Button Behavior */}
        {product.attributes && product.attributes.length > 0 ? (
          <button
            onClick={() => setShowDialog(true)}
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Select Options
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Add to Cart
          </button>
        )}
      </div>

      {/* Attribute Dialog */}
      {showDialog && (
        <ProductDialog product={product} onClose={() => setShowDialog(false)} />
      )}
    </div>
  );
};

export default ProductCard;
