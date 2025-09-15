import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";

// Define the Product type
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "out-of-stock" | "discontinued";
}

// Mock data for products
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 129.99,
    stock: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Running Shoes",
    category: "Footwear",
    price: 89.99,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "3",
    name: "Coffee Maker",
    category: "Appliances",
    price: 59.99,
    stock: 12,
    status: "active",
  },
  {
    id: "4",
    name: "Desk Lamp",
    category: "Home",
    price: 34.99,
    stock: 23,
    status: "active",
  },
  {
    id: "5",
    name: "Yoga Mat",
    category: "Fitness",
    price: 24.99,
    stock: 7,
    status: "active",
  },
  {
    id: "6",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    stock: 0,
    status: "out-of-stock",
  },
  {
    id: "7",
    name: "Water Bottle",
    category: "Kitchen",
    price: 19.99,
    stock: 56,
    status: "active",
  },
  {
    id: "8",
    name: "Phone Case",
    category: "Accessories",
    price: 14.99,
    stock: 89,
    status: "active",
  },
  {
    id: "9",
    name: "Notebook",
    category: "Office",
    price: 9.99,
    stock: 34,
    status: "active",
  },
  {
    id: "10",
    name: "Old Smartphone",
    category: "Electronics",
    price: 199.99,
    stock: 3,
    status: "discontinued",
  },
];

// Define table columns
const productColumns = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (info: any) => `₦${info.getValue().toFixed(2)}`,
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: (info: any) => (
      <span className={info.getValue() === 0 ? "text-red-500 font-medium" : ""}>
        {info.getValue()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info: any) => {
      const status = info.getValue();
      let statusClass = "";

      if (status === "active") statusClass = "bg-green-100 text-green-800";
      if (status === "out-of-stock") statusClass = "bg-red-100 text-red-800";
      if (status === "discontinued") statusClass = "bg-gray-100 text-gray-800";

      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClass}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
];

// Mock API function to fetch products
const fetchProducts = async (params: any) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { page = 1, perPage = 10, search, status } = params;

  // Filter products based on search term
  let filteredProducts = mockProducts;

  if (search) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Filter products based on status (if provided)
  if (status) {
    filteredProducts = filteredProducts.filter(
      (product) => product.status === status
    );
  }

  // Calculate pagination
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    data: paginatedProducts,
    meta: {
      total: filteredProducts.length,
      page,
      perPage,
    },
  };
};

// Dashboard Products Page Component
const ProductTable = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleRowClick = (product: Product) => {
    console.log("Product clicked:", product);
    // You could navigate to a product detail page or open a modal
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Products Dashboard</h1>
        <p className="text-gray-600">Manage your product inventory</p>
      </div> */}

      <div className="bg-white rounded-lg shadow p-4">
        <DataTable<Product, unknown>
          columns={productColumns}
          fetchData={fetchProducts}
          totalItems={mockProducts.length}
          tableKey="products"
          onRowClick={handleRowClick}
          setSelected={setSelectedProducts}
          hasTab={true}
          hasAllTab={true}
          tabInfo={[
            {
              name: "Active",
              columns: productColumns,
              fetchData: (params) => {
                const activeParams = { ...params, status: "active" };
                return fetchProducts(activeParams);
              },
              tableKey: "active-products",
              onRowClick: handleRowClick,
              emptyState: "No active products found.",
            },
            {
              name: "Out of Stock",
              columns: productColumns,
              fetchData: (params) => {
                const outOfStockParams = { ...params, status: "out-of-stock" };
                return fetchProducts(outOfStockParams);
              },
              tableKey: "out-of-stock-products",
              onRowClick: handleRowClick,
              emptyState: "All products are in stock!",
            },
            {
              name: "Discontinued",
              columns: productColumns,
              fetchData: (params) => {
                const discontinuedParams = {
                  ...params,
                  status: "discontinued",
                };
                return fetchProducts(discontinuedParams);
              },
              tableKey: "discontinued-products",
              onRowClick: handleRowClick,
              emptyState: "No discontinued products.",
            },
          ]}
        />

        {selectedProducts.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {selectedProducts.length} product(s) selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
