import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyBottomNavbar from "./StickyNavbar";

const MainLayout: React.FC = () => {
  return (
    <Box>
      {/* Navbar stays on top */}
      <Navbar />

      {/* This is where child routes render */}
      <Box>
        <Outlet />

        <StickyBottomNavbar />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
