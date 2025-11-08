import { useNavigate } from "react-router-dom";
import ProductHeaderSummary from "../components/products/ProductHeaderSummary";
import ProductTable from "../components/products/ProductTable";
import { useUserProducts } from "../lib/api/products";
import { getDecodedJwt } from "../lib/auth";

export default function ProductsPage() {
  const navigate = useNavigate();
  // 🔹 Get logged-in user ID
  const user = getDecodedJwt();
  const userId = user?.id;
  const { data: products, isLoading, error } = useUserProducts(userId); // example hook

  // compute summaries dynamically
  const totalProducts = products?.products.length || 0;
  const activeProducts =
    products?.products.filter((p) => p.isActive).length || 0;
  const inactiveProducts = totalProducts - activeProducts;
  const totalRetailValue = products?.products.reduce(
    (sum, p) => sum + (p.price || 0),
    0,
  );
  // const totalInventoryValue = products?.products.reduce((sum, p) => sum + (p.costPrice || 0), 0);
  // const retailValueSold = ...; // depends on sales data
  // const totalProfit = ...;

  return (
    <div>
      <ProductHeaderSummary
        totalProducts={totalProducts || 0}
        activeProducts={activeProducts || 0}
        inactiveProducts={inactiveProducts || 0}
        totalRetailValue={totalRetailValue || 0} // ₦450,000
        // totalInventoryValue={300000} // ₦300,000
        // retailValueSold={150000} // ₦150,000
        // totalProfit={70000} // ₦70,000
        onAddProduct={() => navigate("/products/create")}
      />
      <div className="">
        <ProductTable
          products={products?.products || []}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
