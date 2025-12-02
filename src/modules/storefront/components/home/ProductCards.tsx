import { useState, useMemo } from "react";
import AddToCartDialog from "./AddToCartDialog";
import ProductCard from "./ProductCard";
import { useUserProducts } from "../../lib/api/products";
import { IStoreDetails } from "../../lib/types/store";
import { ProductDetails } from "../../lib/types/products";

const ProductCards: React.FC = () => {
  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );

  const { data: products, isLoading, error } = useUserProducts(store.userId);

  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null,
  );

  const [activeCategory, setActiveCategory] = useState<string>("All");

  // ✅ ALWAYS FORCE ARRAY
  const safeProducts = Array.isArray(products?.products)
    ? products?.products
    : Array.isArray(products)
      ? products?.products
      : [];

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(safeProducts?.map((p) => p.category)),
    ).filter(Boolean) as string[];
    return ["All", ...unique];
  }, [safeProducts]);

  const filteredProducts =
    activeCategory === "All"
      ? safeProducts
      : safeProducts?.filter((p) => p.category === activeCategory);

  if (isLoading) {
    return (
      <div className="text-center py-10  h-[50vh] items-center flex w-full">
        <span className="w-full">Loading products..</span>.
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 h-[50vh] items-center flex w-full">
        <span className="w-full">No Products Found.</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Category Filter */}
      <div className="flex gap-3 overflow-x-auto whitespace-nowrap pb-2 mb-8 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border transition-all inline-block ${
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
        {filteredProducts?.map((p) => (
          <ProductCard key={p._id} product={p} />
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
