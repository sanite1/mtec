import React from "react";

interface ProductHeroProps {
  banner?: string; // optional banner image
  title?: string;
  subtitle?: string;
}

const ProductHero: React.FC<ProductHeroProps> = ({
  banner,
  title,
  subtitle,
}) => {
  const hasContent = banner || title || subtitle;

  return (
    <section
      className={`relative w-full min-h-[40vh] flex items-center justify-center ${
        hasContent ? "" : "bg-gray-100"
      }`}
      style={
        banner
          ? {
              backgroundImage: `url(${banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {/* Always add overlay if banner exists */}
      {<div className="absolute inset-0 bg-black/50" />}

      {/* Text content */}
      <div className="relative text-center text-white max-w-2xl px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 z-30">
          Product Details
        </h1>
      </div>
    </section>
  );
};

export default ProductHero;
