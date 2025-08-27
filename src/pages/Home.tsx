import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import ScrollSections from "../components/home/ScrollSections";

export default function Home() {
  return (
    <div className="">
      <HeroSection />

      <FeaturesSection />

      <ScrollSections />
    </div>
  );
}
