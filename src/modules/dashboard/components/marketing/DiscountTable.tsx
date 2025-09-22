// components/discount/DiscountTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import gift from "../../assets/boxEmpty.png";
import DeleteDiscountModal from "./DeleteDiscountModal";
import EditDiscountSidebar from "./DiscountFormSidebar";
import DiscountFormSidebar from "./DiscountFormSidebar";

// ----------------- Types -----------------
export interface Discount {
  id: string;
  dateCreated: string;
  name: string;
  description?: string;
  value: string; // percentage or fixed
  type: "percentage" | "fixed";
  startDate: string;
  endDate: string;
  products?: string[];
}

// ----------------- Mock Products -----------------
const mockProducts = [
  "iPhone 15 Pro",
  "Samsung Galaxy S23",
  "Dell XPS 13",
  "Sony Headphones",
  "Nike Sneakers",
];

// ----------------- Mock Discounts -----------------
const mockDiscounts: Discount[] = [
  {
    id: "1",
    dateCreated: "2025-09-01",
    name: "Summer Sale",
    description: "20% off all electronics",
    value: "20",
    type: "percentage",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    products: [mockProducts[0], mockProducts[2]],
  },
  {
    id: "2",
    dateCreated: "2025-09-05",
    name: "New User Discount",
    description: "₦1000 off for first purchase",
    value: "1000",
    type: "fixed",
    startDate: "2025-09-05",
    endDate: "2025-09-20",
    products: [mockProducts[1]],
  },
  {
    id: "3",
    dateCreated: "2025-09-10",
    name: "Black Friday",
    description: "50% off storewide",
    value: "50",
    type: "percentage",
    startDate: "2025-11-25",
    endDate: "2025-11-30",
    products: mockProducts,
  },
];

// ----------------- Fetch Function -----------------
const fetchDiscounts = async (params: any) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const { page = 1, perPage = 10, search } = params;
  let filtered = mockDiscounts;

  if (search) {
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description?.toLowerCase().includes(search.toLowerCase())
    );
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return {
    data: paginated,
    meta: {
      total: filtered.length,
      page,
      perPage,
    },
  };
};

// ----------------- Component -----------------
const DiscountTable = () => {
  const [selected, setSelected] = useState<Discount[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<Discount | null>(null);
  const [editTarget, setEditTarget] = useState<Discount | null>(null);

  const discountColumns = [
    { accessorKey: "dateCreated", header: "Date Created" },
    { accessorKey: "name", header: "Discount Name" },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "value",
      header: "Discount Value",
      cell: ({ row }: any) => {
        const discount = row.original as Discount;
        return discount.type === "percentage"
          ? `${discount.value}%`
          : `₦${discount.value}`;
      },
    },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    // {
    //   accessorKey: "products",
    //   header: "Products",
    //   cell: ({ row }: any) => {
    //     const discount = row.original as Discount;
    //     return (
    //       <span className="text-sm text-gray-700">
    //         {discount.products && discount.products.length > 0
    //           ? discount.products.join(", ")
    //           : "All Products"}
    //       </span>
    //     );
    //   },
    // },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const discount = row.original as Discount;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setEditTarget(discount)}
              className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(discount)}
              className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              <Trash size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  const emptyState = (
    <EmptyState
      image={gift}
      message="No discounts found"
      subtext="When you create discounts, they’ll appear here."
    />
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<Discount, unknown>
        columns={discountColumns}
        fetchData={fetchDiscounts}
        totalItems={mockDiscounts.length}
        tableKey="discounts"
        onRowClick={(discount) => console.log("Clicked discount:", discount)}
        setSelected={setSelected}
        hasTab={false}
        emptyState={emptyState}
      />

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteDiscountModal
          discountName={deleteTarget.name}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            console.log("Deleting:", deleteTarget);
            setDeleteTarget(null);
          }}
        />
      )}

      {/* Edit Sidebar */}
      {editTarget && (
        <DiscountFormSidebar
          discount={editTarget}
          //   products={mockProducts} // ✅ Pass products for selection
          onClose={() => setEditTarget(null)}
          onSave={(updated) => {
            console.log("Updated:", updated);
            setEditTarget(null);
          }}
        />
      )}

      {/* Selection info */}
      {selected.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">
            {selected.length} discount(s) selected
          </p>
        </div>
      )}
    </div>
  );
};

export default DiscountTable;
