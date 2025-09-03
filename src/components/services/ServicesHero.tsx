import React from "react";

const ServicesHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern / Shape */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-orange-600 opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Content */}
      <div className="relative container max-w-4xl mx-auto px-6 py-28 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          Empowering Businesses with the{" "}
          <span className="text-blue-500">Tools to Sell Smarter</span>
        </h1>
        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          At MTEC, we’re on a mission to make e-commerce simple, flexible, and
          built for growth. Whether you’re just starting out or scaling up, we
          provide the tools you need to thrive both online and offline.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            Get Started
          </a>
          <a
            href="#pricing"
            className="px-6 py-3 rounded-lg border border-gray-500 hover:bg-gray-800 transition font-medium"
          >
            View Pricing
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
