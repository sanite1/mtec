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
        onAddProduct={() => console.log("Add Product Clicked")}
      />
      <ProductTable />
    </div>
  );
}
