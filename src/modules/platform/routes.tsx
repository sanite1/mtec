import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import FAQsPage from "./pages/Faq";
import HelpCenter from "./pages/HelpCenter";
import BlogsPage from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import UnderConstruction from "./layouts/UnderConstructionPage";
import Auth from "./components/routes/AuthRouter";
import Pricing from "./pages/Pricing";
import TermsOfService from "./pages/TermsOfService";

export const PlatformRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes that share the Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQsPage />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
        <Route path="/sitemap" element={<UnderConstruction />} />
      </Route>

      {/* Routes without Navbar (e.g., login/register) */}
      <Route path="/*" element={<Auth />} />
    </Routes>
  );
};
