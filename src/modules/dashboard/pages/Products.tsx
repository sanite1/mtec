import { useNavigate } from "react-router-dom";
import ProductHeaderSummary from "../components/products/ProductHeaderSummary";
import ProductTable from "../components/products/ProductTable";
import { useProductStats, useUserProducts } from "../lib/api/products";
import { getDecodedJwt } from "../lib/auth";

export default function ProductsPage() {
  const navigate = useNavigate();

  const user = getDecodedJwt();
  const userId = user?.id;

  const { data: products, isLoading, error } = useUserProducts(userId);
  const { data: stats, isLoading: statsLoading } = useProductStats(userId);

  return (
    <div>
      <ProductHeaderSummary
        totalProducts={stats?.totalProducts}
        activeProducts={stats?.activeProducts}
        totalCostValue={stats?.totalCostValue}
        totalRetailValue={stats?.totalRetailValue}
        onAddProduct={() => navigate("/products/create")}
      />

      <div>
        <ProductTable
          products={products?.products || []}
          total={products?.total || 0}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}
