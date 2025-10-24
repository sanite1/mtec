import React, { useState, useMemo } from "react";
import { DataTable } from "../../utils/data-table";
import { IProductHistory } from "../../lib/types/products";
import { formatDate, formatDateTime } from "../../lib/utils/formatDate";

// ---------------- Columns ----------------
const historyColumns = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: (info: any) => {
      const val = info.getValue();
      return formatDate(val);
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: (info: any) => {
      const val = info.getValue();
      return val.toUpperCase();
    },
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
    accessorKey: "qtyChange",
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

// ---------------- Component ----------------
const ProductHistory = ({
  history,
  isLoading,
  error,
}: {
  history: IProductHistory[];
  isLoading: boolean;
  error: any;
}) => {
  const [selectedRows, setSelectedRows] = useState<IProductHistory[]>([]);

  // Group by activity type
  const groupedHistory = useMemo(() => {
    return {
      all: history || [],
      sold: history?.filter((h) => h.activity === "sold") || [],
      added: history?.filter((h) => h.activity === "added") || [],
      removed: history?.filter((h) => h.activity === "removed") || [],
      returned: history?.filter((h) => h.activity === "returned") || [],
    };
  }, [history]);

  const handleRowClick = (entry: IProductHistory) => {
    console.log("History entry clicked:", entry);
  };

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Failed to load product history.
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="mb-3">
        <p className="text-gray-600">
          Track all product history activities (sales, additions, removals, and
          returns).
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <DataTable<IProductHistory, unknown>
          columns={historyColumns}
          data={groupedHistory.all}
          isLoading={isLoading}
          totalItems={groupedHistory.all.length}
          tableKey="product-history"
          onRowClick={handleRowClick}
          setSelected={setSelectedRows}
          hasTab={true}
          hasAllTab={true}
          tabInfo={[
            {
              name: "Sold",
              columns: historyColumns,
              data: groupedHistory.sold,
              tableKey: "sold-history",
              onRowClick: handleRowClick,
              emptyState: "No sold history entries.",
            },
            {
              name: "Added",
              columns: historyColumns,
              data: groupedHistory.added,
              tableKey: "added-history",
              onRowClick: handleRowClick,
              emptyState: "No added stock entries.",
            },
            {
              name: "Removed",
              columns: historyColumns,
              data: groupedHistory.removed,
              tableKey: "removed-history",
              onRowClick: handleRowClick,
              emptyState: "No removed stock entries.",
            },
            {
              name: "Returned",
              columns: historyColumns,
              data: groupedHistory.returned,
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
