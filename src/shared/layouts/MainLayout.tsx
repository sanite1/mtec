import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./Navbar";

const MainLayout: React.FC = () => {
  return (
    <Box>
      {/* Navbar stays on top */}
      <Navbar />

      {/* This is where child routes render */}
      <Box sx={{ mt: 8, p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
