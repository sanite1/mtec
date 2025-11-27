// Helper: detect which module to load
export const getModule = (): "platform" | "storefront" | "dashboard" => {
  const hostname = window.location.hostname;
  const port = window.location.port;

  // --- Local environment ---
  if (hostname === "localhost") {
    if (port === "3002") return "dashboard";
    if (port === "3001") return "storefront";
    return "platform"; // default on 3000
  }

  // --- Production environment ---
  if (hostname.startsWith("admin.")) return "dashboard";
  if (hostname.startsWith("platform.")) return "platform";
  return "storefront";
};

export function getStoreSlug(): string | null {
  const hostname = window.location.hostname;

  const pathname = window.location.pathname;

  // ✅ ✅ LOCAL DEV (storefront runs on 3002)
  if (getModule() === "storefront") {
    // URL: localhost:3002/rapunzel
    const pathParts = pathname.split("/").filter(Boolean);
    return pathParts.length > 0 ? pathParts[0] : null;
  }

  const parts = hostname.split(".");

  // rapunzel.bitec.store → ["rapunzel", "bitec", "store"]
  if (parts.length >= 2 && parts[0] !== "bitec") {
    console.log(parts[0]);
    return parts[0]; // rapunzel
  }

  return null;
}

export function getStoreBasePath() {
  const hostname = window.location.hostname;
  const port = window.location.port;

  const store = JSON.parse(localStorage.getItem("store") || "null");

  // ✅ LOCALHOST ONLY: prefix with /slug
  if (hostname === "localhost" && port === "3001") {
    if (!store?.slug) return "/";
    return `/${store.slug}`;
  }

  // ✅ PRODUCTION: no prefix needed (subdomain handles it)
  return "/";
}
