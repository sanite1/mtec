import React from "react";
import AboutHero from "../modules/platform/components/about/AboutHero";
import OurStory from "../modules/platform/components/about/OurStory";
import OurMission from "../modules/platform/components/about/OurMission";
import OurSustainability from "../modules/platform/components/about/Commitment";
import FAQSection from "../modules/platform/components/home/Faqs";

export default function About() {
  return (
    <div>
      <AboutHero />

      <OurStory />

      <OurMission />

      <OurSustainability />

      <FAQSection />
    </div>
  );
}
