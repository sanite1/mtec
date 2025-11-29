import React, { useEffect } from "react";
import HeroSection from "../components/home/HomeHero";
import ProductCards from "../components/home/ProductCards";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      {/* Hero with image + text */}
      <HeroSection
        banner="/images/HeroSection-banner.jpg"
        title="Welcome to MTEC Store"
        subtitle="Shop the latest products at unbeatable prices"
      />

      <ProductCards />
    </div>
  );
}
