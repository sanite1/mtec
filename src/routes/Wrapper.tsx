import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../components/routes/AuthRouter";
import Home from "../pages/Home";
import MainLayout from "../shared/layouts/MainLayout";
// import About from "../components/About";
import TermsOfServicePage from "../pages/TermsOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import UnderConstruction from "../shared/layouts/UnderConstructionPage";
import PricingPage from "../pages/Pricing";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";

export const RoutesWrapper: React.FC = () => {
  return (
    <Routes>
      {/* Routes that share the Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sitemap" element={<UnderConstruction />} />
      </Route>

      {/* Routes without Navbar (e.g., login/register) */}
      <Route path="/*" element={<Auth />} />
    </Routes>
  );
};
