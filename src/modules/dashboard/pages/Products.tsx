import React from "react";
import ProductTable from "../components/products/ProductTable";
import ProductHeaderSummary from "../components/products/ProductHeaderSummary";

export default function ProductsPage() {
  return (
    <div>
      <ProductHeaderSummary
        totalProducts={120}
        activeProducts={95}
        inactiveProducts={25}
        totalRetailValue={450000} // ₦450,000
        totalInventoryValue={300000} // ₦300,000
        retailValueSold={150000} // ₦150,000
        totalProfit={70000} // ₦70,000
        onAddProduct={() => console.log("Add Product Clicked")}
      />
      <ProductTable />
    </div>
  );
}
