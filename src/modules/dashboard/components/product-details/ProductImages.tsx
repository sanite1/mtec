import React from "react";

export default function ProductImages() {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Product Images</h3>
      <div className="flex gap-3">
        <div className="w-28 h-28 bg-gray-100 border rounded flex items-center justify-center">
          <span className="text-sm text-gray-600">Thumbnail</span>
        </div>
        <div className="w-28 h-28 bg-gray-100 border rounded flex items-center justify-center">
          <span className="text-sm text-gray-600">Thumbnail</span>
        </div>
      </div>
    </div>
  );
}
