import React from "react";
import ServicesHero from "../modules/platform/components/services/ServicesHero";
import SectorsWeServe from "../modules/platform/components/services/SectorsWeServe";
import HowItWorks from "../modules/platform/components/services/HowItWorks";
import KeyFeatures from "../modules/platform/components/services/WhyUs";

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
