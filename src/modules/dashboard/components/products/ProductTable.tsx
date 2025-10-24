import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getDecodedJwt } from "../../lib/auth";
import { Product } from "../../lib/types/products";

// ✅ Safe product type with optional fallbacks
export interface SafeProduct extends Partial<Product> {
  _id?: string;
  name?: string;
  collection?: string;
  price?: number;
  totalStock?: number;
  isActive?: boolean;
}

// ✅ Safe cell value helper
const safeCurrency = (value?: number) => {
  if (typeof value !== "number" || isNaN(value)) return "₦0.00";
  return `₦${value.toFixed(2)}`;
};

// ✅ Product table columns with fallbacks
const productColumns = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: (info: any) => info.getValue() || "Untitled Product",
  },
  {
    accessorKey: "collection",
    header: "Category",
    cell: (info: any) => info.getValue() || "Uncategorized",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info: any) => safeCurrency(info.getValue()),
  },
  {
    accessorKey: "totalStock",
    header: "Stock",
    cell: (info: any) => {
      const stock = Number(info.getValue() ?? 0);
      return (
        <span className={stock === 0 ? "text-red-500 font-medium" : ""}>
          {isNaN(stock) ? 0 : stock}
        </span>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: (info: any) => {
      const isActive = info.getValue() ?? true; // default to active
      const status = isActive ? "Active" : "Inactive";

      const statusClass = isActive
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800";

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClass}`}
        >
          {status}
        </span>
      );
    },
  },
];

const ProductTable = ({
  products,
  isLoading,
  error,
}: {
  products: SafeProduct[];
  isLoading: boolean;
  error: any;
}) => {
  const [selectedProducts, setSelectedProducts] = useState<SafeProduct[]>([]);
  const navigate = useNavigate();

  // 🔹 Get logged-in user ID
  const user = getDecodedJwt();
  const userId = user?.id;

  if (error) {
    toast.error(error?.message || "Failed to load products");
  }

  const safeProducts = Array.isArray(products)
    ? products.map((p) => ({
        _id: p._id || crypto.randomUUID(),
        name: p.name || "Untitled Product",
        collection: p.collection || "Uncategorized",
        price: typeof p.price === "number" ? p.price : 0,
        totalStock:
          typeof p.totalStock === "number" && !isNaN(p.totalStock)
            ? p.totalStock
            : 0,
        isActive: p.isActive ?? true,
      }))
    : [];

  const totalItems = safeProducts.length;

  const handleRowClick = (product: SafeProduct) => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mb-3">
        <p className="text-gray-600">Manage your product inventory</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <DataTable<SafeProduct, unknown>
          columns={productColumns}
          data={safeProducts}
          isLoading={isLoading}
          totalItems={totalItems}
          tableKey="products"
          onRowClick={handleRowClick}
          setSelected={setSelectedProducts}
          hasTab={true}
          hasAllTab={true}
          tabInfo={[
            {
              name: "Active",
              columns: productColumns,
              data: safeProducts.filter((p) => p.isActive === true),
              tableKey: "active-products",
              onRowClick: handleRowClick,
              emptyState: "No active products found.",
            },
            {
              name: "Inactive",
              columns: productColumns,
              data: safeProducts.filter((p) => p.isActive === false),
              tableKey: "inactive-products",
              onRowClick: handleRowClick,
              emptyState: "All products are active!",
            },
            {
              name: "Out of Stock",
              columns: productColumns,
              data: safeProducts.filter((p) => (p.totalStock ?? 0) < 1),
              tableKey: "out-of-stock-products",
              onRowClick: handleRowClick,
              emptyState: "All products are in stock!",
            },
          ]}
        />

        {selectedProducts?.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {selectedProducts?.length} product
              {selectedProducts.length > 1 ? "s" : ""} selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
