import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  Home,
  Box,
  ShoppingCart,
  // Package,
  Users,
  Layout,
  Globe,
  Truck,
  CreditCard,
  Megaphone,
  // Search,
  Receipt,
  Users2,
  Settings,
  Rocket,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Coins,
  // Locate,
  LocationEdit,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationsDropdown from "../components/navbar/NotificationsDropdown";

const menuItems = [
  { name: "Onboarding", icon: Rocket, path: "/onboarding" },
  { name: "Dashboard Home", icon: Home, path: "/" },
  { name: "Product Management", icon: Box, path: "/products" },
  { name: "Orders", icon: ShoppingCart, path: "/orders" },
  // { name: "Inventory", icon: Package, path: "/inventory" },
  { name: "Customers", icon: Users, path: "/customers" },
  { name: "Store Customization", icon: Layout, path: "/storefront" },
  { name: "Domain Settings", icon: Globe, path: "/domain" },
  { name: "Shipping Settings", icon: Truck, path: "/shipping" },
  { name: "Payment Settings", icon: CreditCard, path: "/payments" },
  { name: "Taxes", icon: Coins, path: "/taxes" },
  { name: "Marketing Tools", icon: Megaphone, path: "/marketing" },
  { name: "Location Settings", icon: LocationEdit, path: "/location" },
  // { name: "SEO & Meta", icon: Search, path: "/seo" },
  { name: "Billing", icon: Receipt, path: "/billing" },
  { name: "Team & Access", icon: Users2, path: "/team" },
  { name: " General Settings", icon: Settings, path: "/settings" },
];

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white border-b flex items-center justify-between z-20 h-16">
        {/* Left section */}
        <div
          className="flex items-center gap-2 sm:gap-4 border-r h-full px-2 sm:px-4 
  w-auto sm:w-64 justify-between"
        >
          {/* Sidebar toggle (Menu) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-gray-100 order-1 sm:order-2"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center text-purple-600 font-bold text-lg order-2 sm:order-1">
            <span className="ml-1 sm:ml-2 text-xl sm:text-2xl">MTEC</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto  px-4">
          {/* View Store button (hidden on small screens) */}
          <button className="hidden sm:block border border-purple-600 text-purple-600 px-3 sm:px-4 py-1 rounded text-sm sm:text-md hover:bg-purple-50">
            View Store
          </button>

          <NotificationsDropdown />

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-600"
              />
              {/* Hide name on small screens */}
              <span className="hidden sm:inline text-sm sm:text-md font-medium text-gray-800">
                Collins Sanni
              </span>
              <ChevronDown
                className={`hidden sm:inline w-4 h-4 transition-transform ${
                  profileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-md w-44 py-2">
                {/* Profile */}
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  <span>Profile</span>
                </button>

                {/* Logout */}
                <button
                  onClick={() => logout()}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 text-gray-500" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-14 h-[calc(100%-56px)] bg-white border-r transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <nav className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-purple-300 text-purple-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 pt-14 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <main className="flex-1 overflow-y-auto p-6 no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
