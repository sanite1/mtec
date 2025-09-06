import React from "react";
import HeroSection from "../components/pricing/HeroSection";
import PricingCards from "../components/pricing/PricingCards";
import SimilarFeatures from "../components/pricing/SimilarFeatures";
import SupportSection from "../components/home/Support";

export default function Pricing() {
  return (
    <div>
      <HeroSection />

      <div className="bg-gradient-to-b from-indigo-50 via-white to-indigo-50 pb-[50px]">
        <PricingCards />

        <SimilarFeatures />

        <SupportSection />
      </div>
    </div>
  );
}
