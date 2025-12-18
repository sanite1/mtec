import React, { useState } from "react";
import { DataTable, TableParamProps } from "../../utils/data-table";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import box from "../../assets/boxEmpty.png";
// import { getDecodedJwt } from "../../lib/auth";
import { Product } from "../../lib/types/products";
import { fetchUserProducts } from "../../lib/api/products";
import { getDecodedJwt } from "../../lib/auth";
import EmptyState from "../../utils/EmptyState";

// ✅ Safe product type with optional fallbacks
export interface SafeProduct extends Partial<Product> {
  _id?: string;
  name?: string;
  price?: number;
  category?: string;
  locationName?: string;
  totalStock?: number;
  priceRange?: string;
  isActive?: boolean;
}

// ✅ Safe cell value helper
// const safeCurrency = (value?: number) => {
//   if (typeof value !== "number" || isNaN(value)) return "₦0.00";
//   return `₦${value.toFixed(2)}`;
// };

// ✅ Product table columns with fallbacks
const productColumns = [
  {
    accessorKey: "name",
    header: "Product Name",
    cell: (info: any) => info.getValue() || "Untitled Product",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info: any) => info.getValue() || "N/A",
  },
  {
    accessorKey: "locationName",
    header: "Location",
    cell: (info: any) => {
      const value = info.getValue();
      const row = info.row.original as SafeProduct;
      console.log(row);

      return row.locationName;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info: any) => {
      const value = info.getValue();
      const row = info.row.original as SafeProduct;
      const priceRange = row.priceRange;

      // ✅ Case 1: priceRange is a STRING
      if (typeof priceRange === "string") {
        // ✅ Handle RANGE: "120000 - 175000"
        if (priceRange.includes("-")) {
          const [min, max] = priceRange
            .split("-")
            .map((v) => Number(v.trim()))
            .filter((v) => !isNaN(v));

          if (min && max) {
            return `₦${min.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} - ₦${max.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          }
        }

        // ✅ Handle SINGLE value string: "15000"
        const single = Number(priceRange.trim());
        if (!isNaN(single)) {
          return `₦${single.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`;
        }
      }

      // ✅ Case 2: fallback to numeric price
      if (typeof value === "number" && !isNaN(value)) {
        return `₦${value.toLocaleString("en-NG", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;
      }

      // ✅ Final fallback
      return "—";
    },
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
  total,
  isLoading,
  error,
}: {
  products: SafeProduct[];
  isLoading: boolean;
  error: any;
  total: number;
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
        category: p.category || "N/A",
        locationName: p.locationName || "N/A",
        priceRange: p.priceRange || undefined,
        price: typeof p.price === "number" ? p.price : 0,
        totalStock:
          typeof p.totalStock === "number" && !isNaN(p.totalStock)
            ? p.totalStock
            : 0,
        isActive: p.isActive ?? true,
      }))
    : [];

  const totalItems = total;

  const handleRowClick = (product: SafeProduct) => {
    navigate(`/products/${product._id}`);
  };

  const fetchTableProducts = async (params: TableParamProps) => {
    const response = await fetchUserProducts(userId, {
      page: params.page,
      limit: params.perPage,
      search: params.search,
    });

    return {
      data: {
        data: response.products, // array of products
        meta: { total: response.total },
      },
    };
  };

  const emptyState = (
    <EmptyState
      image={box}
      message="No products found"
      subtext="When you create product, they’ll appear here."
    />
  );
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
          fetchData={fetchTableProducts}
          totalItems={totalItems}
          tableKey="products"
          onRowClick={handleRowClick}
          setSelected={setSelectedProducts}
          // hasTab={true}
          emptyState={emptyState}
          // hasAllTab={true}
          // tabInfo={[
          //   {
          //     name: "Active",
          //     columns: productColumns,
          //     data: safeProducts.filter((p) => p.isActive === true),
          //     tableKey: "active-products",
          //     onRowClick: handleRowClick,
          //     emptyState: "No active products found.",
          //     fetchData=fetchTableProducts
          //   },
          //   {
          //     name: "Inactive",
          //     columns: productColumns,
          //     data: safeProducts.filter((p) => p.isActive === false),
          //     tableKey: "inactive-products",
          //     onRowClick: handleRowClick,
          //     emptyState: "All products are active!",
          //   },
          //   {
          //     name: "Out of Stock",
          //     columns: productColumns,
          //     data: safeProducts.filter((p) => (p.totalStock ?? 0) < 1),
          //     tableKey: "out-of-stock-products",
          //     onRowClick: handleRowClick,
          //     emptyState: "All products are in stock!",
          //   },
          // ]}
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
