import React, { useEffect } from "react";
import { PlatformRoutes } from "../modules/platform/routes";
import { DashboardRoutes } from "../modules/dashboard/routes";
import { StorefrontRoutes } from "../modules/storefront/routes";
import { AuthProvider } from "../modules/dashboard/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useResolveSlug } from "../modules/dashboard/lib/api/store";
import { getModule, getStoreSlug } from "../utils";

const queryClient = new QueryClient();

const RoutesWrapper: React.FC = () => {
  const module = getModule();

  const slug = getStoreSlug() || "";

  console.log(module, "slug:", slug);

  const { data, isLoading, refetch, isError } = useResolveSlug(
    module === "storefront" ? slug : "",
  );

  useEffect(() => {
    if (module !== "storefront") return;

    refetch();
  }, [module]);
  data
    ? localStorage.setItem("store", JSON.stringify(data))
    : localStorage.removeItem("store");

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
        Loading...
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
