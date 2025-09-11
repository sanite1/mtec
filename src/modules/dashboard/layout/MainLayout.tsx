import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Home,
  Box,
  ShoppingCart,
  Package,
  Users,
  Layout,
  Globe,
  Truck,
  CreditCard,
  Megaphone,
  Search,
  Receipt,
  Users2,
  Settings,
  Rocket,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const menuItems = [
  { name: "Onboarding", icon: Rocket, path: "/onboarding" },
  { name: "Dashboard Home", icon: Home, path: "/" },
  { name: "Product Management", icon: Box, path: "/products" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  { name: "Inventory", icon: Package, path: "/inventory" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Storefront Customization", icon: Layout, path: "/storefront" },
  { name: "Domain Settings", icon: Globe, path: "/domain" },
  { name: "Shipping Settings", icon: Truck, path: "/shipping" },
  { name: "Payment Settings", icon: CreditCard, path: "/payments" },
  { name: "Marketing Tools", icon: Megaphone, path: "/marketing" },
  { name: "SEO & Meta", icon: Search, path: "/seo" },
  { name: "Billing", icon: Receipt, path: "/billing" },
  { name: "Team & Access", icon: Users2, path: "/team" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 flex flex-col justify-between ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Sidebar content scrollable */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="flex items-center justify-between p-4 border-b">
            <h1
              className={`transition-opacity ${
                sidebarOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="inline-block px-4 py-2 rounded-md bg-gray-800 text-sm font-medium text-white">
                Powered by{" "}
                <span className="text-purple-500 font-semibold">MTEC</span>
              </div>
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded hover:bg-gray-200"
            >
              {sidebarOpen ? "<" : ">"}
            </button>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span>{item.name}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Profile Section */}
        <div className="relative p-4 border-t">
          <button
            onClick={() => setProfileOpen((prev) => !prev)}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            {sidebarOpen && (
              <>
                <span className="flex-1 text-left text-gray-800">Admin</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </>
            )}
          </button>

          {profileOpen && (
            <div className="absolute bottom-16 left-4 right-4 bg-white border rounded-lg shadow-lg">
              <button
                onClick={() => logout()}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Top Navbar */}
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 p-1">
            Welcome 👋
          </h2>
        </header>

        {/* Page Content scrollable */}
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
