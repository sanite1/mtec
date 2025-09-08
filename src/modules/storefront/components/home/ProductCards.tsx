import { useState, useMemo } from "react";
import { Product } from "../../types/products";
import AddToCartDialog from "./AddToCartDialog";
import ProductCard from "./ProductCard";

interface ProductCardsProps {
  products: Product[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category))).filter(
      Boolean
    ) as string[]; // removes undefined/null
    return ["All", ...unique];
  }, [products]);

  // Filter products by category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all ${
              activeCategory === cat
                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={(prod) => setSelectedProduct(prod)}
          />
        ))}
      </div>

      {/* Add to Cart Dialog */}
      {selectedProduct && (
        <AddToCartDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductCards;
