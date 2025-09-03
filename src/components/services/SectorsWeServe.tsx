import React, { useState, useEffect } from "react";
import fashionSector from "../../assets/fashionSector.png";
import cosmeticsSector from "../../assets/cosmeticsSector.png";
import homeSector from "../../assets/homeSector.png";
import digitalSector from "../../assets/digitalSector.png";
import gadgetsSector from "../../assets/gadgetsSector.png";

// Example sectors data
const sectors = [
  {
    id: 1,
    title: "Retail & Fashion",
    description:
      "Helping boutiques and clothing brands expand their online presence with seamless e-commerce tools.",
    image: fashionSector,
    color: "blue",
  },
  {
    id: 2,
    title: "Cosmetics & Beauty",
    description:
      "Supporting beauty brands, skincare lines, and cosmetics sellers with sleek online stores and secure checkout experiences.",
    image: cosmeticsSector,
    color: "orange",
  },
  {
    id: 3,
    title: "Furniture & Home Decor",
    description:
      "Helping furniture makers and home decor businesses showcase products beautifully and reach more customers online.",
    image: homeSector,
    color: "green",
  },
  {
    id: 4,
    title: "Digital Products",
    description:
      "Enabling creators to sell eBooks, courses and other digital products with instant payment and downloads options.",
    image: digitalSector,
    color: "brown",
  },
  {
    id: 5,
    title: "Electronics & Gadgets",
    description:
      "Empowering gadget shops and electronics retailers to manage inventory and serve tech-savvy customers.",
    image: gadgetsSector,
    color: "gray",
  },
];

const SectorsWeServe = () => {
  const [active, setActive] = useState<number>(1);

  // Auto cycle every 4 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActive((prev) => (prev % sectors.length) + 1);
  //   }, 7000);

  //   return () => clearInterval(interval);
  // }, []);

  const activeSector = sectors.find((s) => s.id === active);

  return (
    <section className="bg-gray-50 py-16">
      {/* Header */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Sectors We Serve
        </h2>
        <p className="text-lg text-gray-600 max-w-5xl mx-auto">
          MTEC empowers businesses across diverse industries — whether you’re
          running a small boutique or managing a fast-growing service brand, our
          tools help you sell smarter and scale faster.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-3 lg:gap-12 gap-y-12 items-start">
        {/* Accordion Section */}
        <div className="space-y-4">
          {sectors.map((sector) => {
            const isActive = active === sector.id;
            return (
              <div
                key={sector.id}
                className={`rounded-xl border transition overflow-hidden ${
                  isActive
                    ? `border-${sector.color}-600 bg-${sector.color}-50`
                    : "border-gray-200"
                }`}
              >
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left"
                  onClick={() => setActive(isActive ? sector.id : sector.id)}
                >
                  <span
                    className={`font-medium text-lg ${
                      isActive ? `text-${sector.color}-700` : "text-gray-800"
                    }`}
                  >
                    {sector.title}
                  </span>
                  <span>{isActive ? "−" : "+"}</span>
                </button>
                {isActive && (
                  <div className="px-6 pb-4 text-gray-600">
                    {sector.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center col-span-2 w-full h-56 md:h-[430px] lg:h-full">
          {activeSector && (
            <div
              style={{
                backgroundImage: `url(${activeSector.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="relative w-full h-full rounded-lg transition-all duration-500"
            >
              <div
                className={`absolute top-4 left-4 bg-white/80 px-4 py-2 rounded-lg shadow text-sm font-medium text-${activeSector.color}-700`}
              >
                {activeSector.title}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectorsWeServe;
