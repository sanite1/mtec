import React from "react";
import HeroSection from "../modules/platform/components/pricing/HeroSection";
import PricingCards from "../modules/platform/components/pricing/PricingCards";
import SupportSection from "../modules/platform/components/home/Support";
import MTECFeatures from "../modules/platform/components/pricing/SimilarFeatures";

export default function Pricing() {
  return (
    <div>
      <HeroSection />

      <div className="bg-gradient-to-b from-indigo-50 via-white to-indigo-50 pb-[50px]">
        <PricingCards />

        <MTECFeatures />

        <SupportSection />
      </div>
    </div>
  );
}
