import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Example tenant config
const tenantConfig = {
  logo: "/logos/fashion-store.png",
  links: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  showCart: true,
  showSearch: true,
};

const MainLayout: React.FC = () => {
  return (
    <Box>
      {/* Navbar stays on top */}
      <Navbar logo={""} />

      {/* This is where child routes render */}
      <Box>
        <Outlet />
      </Box>

      <Footer
        logo="/logo.png"
        description="MTEC is your trusted e-commerce hub providing quality products and seamless shopping experience."
        email="support@mtec.com"
        phone="+234 901 234 5678"
        address="123 Lagos Street, Lagos, Nigeria"
        links={[
          { label: "About Us", href: "/about" },
          { label: "Shop", href: "/shop" },
          { label: "Contact", href: "/contact" },
          { label: "Privacy Policy", href: "/privacy" },
        ]}
        copyright="© 2025 MTEC. All rights reserved."
        bgColor="bg-gray-900"
        whatsappLink="https://wa.me/2349012345678"
      />
    </Box>
  );
};

export default MainLayout;
