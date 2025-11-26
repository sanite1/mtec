import React, { useEffect } from "react";
import { PlatformRoutes } from "../modules/platform/routes";
import { DashboardRoutes } from "../modules/dashboard/routes";
import { StorefrontRoutes } from "../modules/storefront/routes";
import { AuthProvider } from "../modules/dashboard/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useResolveSlug } from "../modules/dashboard/lib/api/store";

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

export function getStoreSlug(): string | null {
  const hostname = window.location.hostname;

  // localhost handling: rapunzel.localhost:3002
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    return parts.length > 1 ? parts[0] : null;
  }

  const parts = hostname.split(".");

  // rapunzel.bitec.store → ["rapunzel", "bitec", "store"]
  if (parts.length >= 3) {
    return parts[0]; // rapunzel
  }

  return null;
}

const queryClient = new QueryClient();

const RoutesWrapper: React.FC = () => {
  const module = getModule();

  const slug = getStoreSlug() || "";

  const { data, isLoading, refetch, isError } = useResolveSlug(
    module === "storefront" ? slug : "",
  );

  useEffect(() => {
    if (module !== "storefront") return;

    refetch();
  }, [module]);

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
  // ✅ Loading store
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Store...
      </div>
    );
  }

  // // ✅ Invalid store
  if (isError || !data) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">Store Not Found</h1>
        <p className="text-gray-500">This store does not exist.</p>
      </div>
    );
  }

  // Default: storefront
  return <StorefrontRoutes />;
};

export default RoutesWrapper;
