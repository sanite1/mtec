/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

interface ColumnWithVisibility<TData, TValue> {
  columnDef: {
    accessorKey: string;
    header: string;
  };
  isVisible: boolean;
}

interface ColumnFilterSelectProps<TData, TValue> {
  columns: ColumnWithVisibility<TData, TValue>[];
  setVisibleColumns: React.Dispatch<
    React.SetStateAction<ColumnWithVisibility<TData, TValue>[]>
  >;
}

const ColumnFilterSelect = <TData, TValue>({
  columns,
  setVisibleColumns,
}: ColumnFilterSelectProps<TData, TValue>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.map((col) =>
        col.columnDef.accessorKey === columnKey
          ? { ...col, isVisible: !col.isVisible }
          : col
      )
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        Columns
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
            {columns.map((column) => (
              <label
                key={column.columnDef.accessorKey}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={column.isVisible}
                  onChange={() => toggleColumn(column.columnDef.accessorKey)}
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                {column.columnDef.header}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ColumnFilterSelect;
