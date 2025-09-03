import React from "react";
import ServicesHero from "../components/services/ServicesHero";
import SectorsWeServe from "../components/services/SectorsWeServe";
import HowItWorks from "../components/services/HowItWorks";
import KeyFeatures from "../components/services/WhyUs";

export default function Services() {
  return (
    <div>
      <ServicesHero />

      <SectorsWeServe />

      <HowItWorks />

      <KeyFeatures />
    </div>
  );
}
