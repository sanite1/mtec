import { Product } from "../../types/products";

const ProductCard: React.FC<{
  product: Product;
  onAddToCart: (p: Product) => void;
}> = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
      <a href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />
      </a>
      <div className="p-4">
        <a href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        </a>
        <div className="mb-3">
          {product.oldPrice && (
            <span className="text-gray-500 line-through mr-2">
              ₦{product.oldPrice}
            </span>
          )}
          <span className="text-purple-600 font-bold">₦{product.price}</span>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
