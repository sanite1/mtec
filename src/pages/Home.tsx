import React from "react";
import HeroSection from "../modules/platform/components/home/HeroSection";
import FeaturesSection from "../modules/platform/components/home/FeaturesSection";
import ScrollSections from "../modules/platform/components/home/ScrollSections";
import SupportSection from "../modules/platform/components/home/Support";
import FAQSection from "../modules/platform/components/home/Faqs";

export default function Home() {
  return (
    <div className="">
      <HeroSection />

      <FeaturesSection />

      <ScrollSections />

      <SupportSection />

      <FAQSection />
    </div>
  );
}
