import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import ScrollSections from "../components/home/ScrollSections";
import SupportSection from "../components/home/Support";
import FAQSection from "../components/home/Faqs";
import StickyBottomNavbar from "../shared/layouts/StickyNavbar";

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
