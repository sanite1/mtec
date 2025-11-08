import React from "react";

interface ProductImagesProps {
  images: string[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  console.log(images);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Product Images</h3>

      {images && images.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {images.map((item, index) => (
            <div
              key={index}
              className="w-28 h-28 bg-gray-100 border rounded-lg overflow-hidden flex items-center justify-center"
            >
              <img
                src={item}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/150?text=No+Image";
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-28 h-28 bg-gray-100 border rounded flex items-center justify-center">
          <span className="text-sm text-gray-500 text-center">
            No images available
          </span>
        </div>
      )}
    </div>
  );
}
