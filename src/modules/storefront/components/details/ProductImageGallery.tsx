import { useEffect, useRef, useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  name: string;
}

const AUTO_SLIDE_INTERVAL = 5000;

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  name,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, AUTO_SLIDE_INTERVAL);
  };

  useEffect(() => {
    if (!images || images.length <= 1) return;

    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images]);

  const handleSelectImage = (index: number) => {
    setActiveIndex(index);
    startAutoSlide(); // 🔥 RESET TIMER ON MANUAL SELECT
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-100 flex items-center justify-center rounded-xl">
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 order-2 md:order-1 justify-center">
          {images.map((img, index) => (
            <button
              key={img}
              onClick={() => handleSelectImage(index)}
              className={`relative h-16 w-16 rounded-lg overflow-hidden border transition-all ${
                activeIndex === index
                  ? "border-black scale-105 shadow-md"
                  : "border-gray-300 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${name}-${index}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Preview */}
      <div className="order-1 md:order-2 flex-1 flex justify-center">
        <div className="w-full max-w-md aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-100">
          <img
            src={images[activeIndex]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
