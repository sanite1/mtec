import React from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactVariants from "../components/contact/ContactVariants";
import NeedMoreHelp from "../components/contact/NeedMoreHelp";

export default function Contact() {
  return (
    <div>
      <ContactHero />

      <ContactVariants />

      <NeedMoreHelp />
    </div>
  );
}
