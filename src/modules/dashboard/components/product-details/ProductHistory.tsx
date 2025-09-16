import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";

// Define the ProductHistory type
interface ProductHistoryEntry {
  id: string;
  date: string;
  source: string;
  activity: "sold" | "added" | "removed" | "returned";
  qtyBefore: number;
  qty: number;
  qtyAfter: number;
}

// Mock data
const mockHistory: ProductHistoryEntry[] = [
  {
    id: "1",
    date: "2025-09-11",
    source: "POS",
    activity: "sold",
    qtyBefore: 100,
    qty: -2,
    qtyAfter: 98,
  },
  {
    id: "2",
    date: "2025-09-10",
    source: "Admin",
    activity: "added",
    qtyBefore: 80,
    qty: 20,
    qtyAfter: 100,
  },
  {
    id: "3",
    date: "2025-09-08",
    source: "POS",
    activity: "returned",
    qtyBefore: 78,
    qty: 2,
    qtyAfter: 80,
  },
];

// Define table columns
const historyColumns = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "activity",
    header: "Activity",
    cell: (info: any) => {
      const value = info.getValue();
      let color = "";
      if (value === "sold") color = "bg-blue-100 text-blue-800";
      if (value === "added") color = "bg-green-100 text-green-800";
      if (value === "removed") color = "bg-yellow-100 text-yellow-800";
      if (value === "returned") color = "bg-red-100 text-red-800";
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "qtyBefore",
    header: "Qty Before",
  },
  {
    accessorKey: "qty",
    header: "Change",
    cell: (info: any) => {
      const val = info.getValue();
      return (
        <span className={val < 0 ? "text-red-600" : "text-green-600"}>
          {val > 0 ? `+${val}` : val}
        </span>
      );
    },
  },
  {
    accessorKey: "qtyAfter",
    header: "Qty After",
  },
];

// Mock API function
const fetchHistory = async (params: any) => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const { page = 1, perPage = 10, activity } = params;

  let filtered = mockHistory;

  if (activity) {
    filtered = filtered.filter((item) => item.activity === activity);
  }

  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return {
    data: filtered.slice(startIndex, endIndex),
    meta: {
      total: filtered.length,
      page,
      perPage,
    },
  };
};

// ProductHistory Component
const ProductHistory = () => {
  const [selectedRows, setSelectedRows] = useState<ProductHistoryEntry[]>([]);
  //   const navigate = useNavigate();

  const handleRowClick = (entry: ProductHistoryEntry) => {
    console.log("History entry clicked:", entry);
    // navigate(`/history/${entry.id}`);
  };

  return (
    <div className="bg-gray-50 ">
      <div className="mb-3">
        <p className="text-gray-600">
          Track all product history activities (sales, additions, removals, and
          returns).
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <DataTable<ProductHistoryEntry, unknown>
          columns={historyColumns}
          fetchData={fetchHistory}
          totalItems={mockHistory.length}
          tableKey="product-history"
          onRowClick={handleRowClick}
          setSelected={setSelectedRows}
          hasTab={true}
          hasAllTab={true}
          tabInfo={[
            {
              name: "Sold",
              columns: historyColumns,
              fetchData: (params) =>
                fetchHistory({ ...params, activity: "sold" }),
              tableKey: "sold-history",
              onRowClick: handleRowClick,
              emptyState: "No sold history entries.",
            },
            {
              name: "Added",
              columns: historyColumns,
              fetchData: (params) =>
                fetchHistory({ ...params, activity: "added" }),
              tableKey: "added-history",
              onRowClick: handleRowClick,
              emptyState: "No added stock entries.",
            },
            {
              name: "Removed",
              columns: historyColumns,
              fetchData: (params) =>
                fetchHistory({ ...params, activity: "removed" }),
              tableKey: "removed-history",
              onRowClick: handleRowClick,
              emptyState: "No removed stock entries.",
            },
            {
              name: "Returned",
              columns: historyColumns,
              fetchData: (params) =>
                fetchHistory({ ...params, activity: "returned" }),
              tableKey: "returned-history",
              onRowClick: handleRowClick,
              emptyState: "No returned stock entries.",
            },
          ]}
        />

        {selectedRows.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              {selectedRows.length} history record(s) selected
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHistory;
