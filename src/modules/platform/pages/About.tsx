import React from "react";
import AboutHero from "../components/about/AboutHero";
import OurStory from "../components/about/OurStory";
import OurMission from "../components/about/OurMission";
import OurSustainability from "../components/about/Commitment";
import FAQSection from "../components/home/Faqs";

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
