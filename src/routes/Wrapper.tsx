import React from "react";
import { PlatformRoutes } from "../modules/platform/routes";
import { DashboardRoutes } from "../modules/dashboard/routes";
import { StorefrontRoutes } from "../modules/storefront/routes";
import { AuthProvider } from "../modules/dashboard/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Helper: detect which module to load
const getModule = (): "platform" | "storefront" | "dashboard" => {
  const hostname = window.location.hostname;
  const port = window.location.port;

  // --- Local environment ---
  if (hostname === "localhost") {
    if (port === "3001") return "dashboard";
    if (port === "3002") return "storefront";
    return "platform"; // default on 3000
  }

  // --- Production environment ---
  if (hostname.startsWith("admin.")) return "dashboard";
  if (hostname.startsWith("platform.")) return "platform";
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
