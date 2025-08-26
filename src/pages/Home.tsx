import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import ScrollSections from "../components/home/ScrollSections";
import FullPageScroll from "../components/home/FullPageScroll";
// import HeroSection from "../components/home/HeroSection";
export default function Home() {
  return (
    <div className="">
      <HeroSection />

      <FeaturesSection />

      <ScrollSections />

      {/* <FullPageScroll /> */}
    </div>
  );
}
