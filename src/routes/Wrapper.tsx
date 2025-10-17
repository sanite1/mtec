import React from "react";
import { PlatformRoutes } from "../modules/platform/routes";
import { DashboardRoutes } from "../modules/dashboard/routes";
import { StorefrontRoutes } from "../modules/storefront/routes";
import { AuthProvider } from "../modules/dashboard/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Helper: detect which module to load
const getModule = (): "platform" | "storefront" | "dashboard" => {
  const hostname = window.location.hostname;

  // --- Local environment ---
  if (hostname.includes("localhost")) {
    if (hostname.startsWith("admin.")) return "dashboard";
    if (hostname.startsWith("mtec.")) return "platform";
    return "storefront";
  }

  // --- Production environment ---
  if (hostname.startsWith("admin.")) return "dashboard";
  if (hostname.startsWith("platform.")) return "platform";

  // Default: storefront (tenant)
  return "storefront";
};

const queryClient = new QueryClient();

const RoutesWrapper: React.FC = () => {
  const module = getModule();

  if (module === "platform") {
    return <PlatformRoutes />;
  }

  if (module === "dashboard") {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DashboardRoutes />
        </AuthProvider>
      </QueryClientProvider>
    );
  }

  // Default: storefront
  return <StorefrontRoutes />;
};

export default RoutesWrapper;
