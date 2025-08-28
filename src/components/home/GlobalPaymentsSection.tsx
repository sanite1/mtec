// components/FeatureSection.tsx

import React from "react";
import demoImg from "../../assets/globe.png"; // replace with your image path

export default function GlobalPayments() {
  return (
    <section className=" py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-300">
            Seamless Global Payments
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            With <span className="font-semibold text-primary">MTEC</span>,
            you’ll never miss out on international customers again. We’ve
            integrated multiple payment gateways so you can receive payments
            from anywhere in the world. Plus, we support local methods across{" "}
            <span className="font-semibold">12 currencies</span>, including
            PayPal and Stripe (for verified merchants), making checkout
            effortless for everyone.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src={demoImg}
            alt="Global Payments"
            className="w-full max-w-md rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
