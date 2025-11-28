import React from "react";
import { useStorefront } from "../../lib/api/storefront";
import { IStoreDetails } from "../../lib/types/store";

interface HomeHeroProps {
  banner?: string; // optional banner image
  title?: string;
  subtitle?: string;
}

const HomeHero: React.FC<HomeHeroProps> = ({ banner, title, subtitle }) => {
  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );
  const { data } = useStorefront(store.userId);

  const hasContent =
    data?.banner?.image || data?.banner?.title || data?.banner?.subtext;

  return (
    <section
      className={`relative w-full min-h-[60vh] flex items-center justify-center ${
        hasContent ? "" : "bg-gray-100"
      }`}
      style={
        data?.banner?.image
          ? {
              backgroundImage: `url(${data?.banner?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {/* Always add overlay if banner exists */}
      {<div className="absolute inset-0 bg-black/50" />}

      {/* Text content */}
      {(data?.banner?.title || data?.banner?.subtext) && (
        <div className="relative text-center text-white max-w-2xl px-6">
          {data?.banner?.title && (
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {data?.banner?.title}
            </h1>
          )}
          {data?.banner?.subtext && (
            <p className="text-lg md:text-xl opacity-90">
              {data?.banner?.subtext}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default HomeHero;
