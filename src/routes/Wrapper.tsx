import React from "react";
import { Routes, Route } from "react-router-dom";
import { PlatformRoutes } from "../modules/platform/routes";
import { DashboardRoutes } from "../modules/dashboard/routes";
import { StorefrontRoutes } from "../modules/storefront/routes";

// Helper: detect which module to load
const getModule = (): "platform" | "storefront" | "dashboard" => {
  const hostname = window.location.hostname;

  if (hostname === "mtec.localhost") {
    return "platform";
  }
  if (hostname === "admin.localhost") {
    return "dashboard";
  }

  // default → storefront (tenant store)
  return "storefront";
};

const RoutesWrapper: React.FC = () => {
  const module = getModule();

  if (module === "platform") {
    return <PlatformRoutes />;
  }

  if (module === "dashboard") {
    return <DashboardRoutes />;
  }

  // Default: storefront
  return <StorefrontRoutes />;
};

export default RoutesWrapper;
