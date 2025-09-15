// components/export-table.tsx
import React from "react";
import { exportToCSV } from "../utils";

interface ExportSelectProps<T> {
  data: T[];
  filename?: string;
}

const ExportSelect = <T,>({
  data,
  filename = "export",
}: ExportSelectProps<T>) => {
  const handleExport = () => {
    if (data.length === 0) return;
    exportToCSV(data, filename);
  };

  return (
    <button
      onClick={handleExport}
      disabled={data.length === 0}
      className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
      Export CSV
    </button>
  );
};

export default ExportSelect;
