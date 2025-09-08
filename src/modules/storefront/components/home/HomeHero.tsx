import React from "react";

interface HomeHeroProps {
  banner?: string; // optional banner image
  title?: string;
  subtitle?: string;
}

const HomeHero: React.FC<HomeHeroProps> = ({ banner, title, subtitle }) => {
  const hasContent = banner || title || subtitle;

  return (
    <section
      className={`relative w-full min-h-[60vh] flex items-center justify-center ${
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
      {(title || subtitle) && (
        <div className="relative text-center text-white max-w-2xl px-6">
          {title && (
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          )}
          {subtitle && (
            <p className="text-lg md:text-xl opacity-90">{subtitle}</p>
          )}
        </div>
      )}
    </section>
  );
};

export default HomeHero;
