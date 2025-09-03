import { GlobeLock, LeafIcon, UsersIcon } from "lucide-react";
import React from "react";
// import { LeafIcon, UsersIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

const OurSustainability = () => {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Our Commitment to Sustainability
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          At MTEC, we believe technology and business should create value not
          only for people but also for the planet. As we grow, we are committed
          to embedding sustainable practices into every part of our journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Eco-Friendly Operations */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <LeafIcon className="h-10 w-10 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Eco-Friendly Operations
            </h3>
            <p className="text-gray-700">
              We are dedicated to minimizing our environmental footprint by
              adopting digital-first processes and reducing unnecessary waste.
            </p>
          </div>

          {/* Supporting Local Communities */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <UsersIcon className="h-10 w-10  text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold  text-blue-600 mb-3">
              Supporting Local Communities
            </h3>
            <p className="text-gray-700">
              We strive to create opportunities for Nigerian entrepreneurs,
              helping small businesses thrive while encouraging fair and ethical
              practices.
            </p>
          </div>

          {/* Long-Term Vision */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
            <GlobeLock className="h-10 w-10 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold text-orange-600 mb-3">
              Long-Term Vision
            </h3>
            <p className="text-gray-700">
              Sustainability is a journey. We are committed to learning,
              adapting, and continuously improving our efforts as we scale
              globally.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xl font-medium text-gray-800">
          Together, we can build a future where technology drives both growth
          and sustainability 🌍
        </p>
      </div>
    </section>
  );
};

export default OurSustainability;
