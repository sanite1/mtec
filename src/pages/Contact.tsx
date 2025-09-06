import React from "react";
import ContactHero from "../modules/platform/components/contact/ContactHero";
import ContactVariants from "../modules/platform/components/contact/ContactVariants";
import NeedMoreHelp from "../modules/platform/components/contact/NeedMoreHelp";

export default function Contact() {
  return (
    <div>
      <ContactHero />

      <ContactVariants />

      <NeedMoreHelp />
    </div>
  );
}
