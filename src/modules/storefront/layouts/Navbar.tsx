import { Flag, Locate, Search, ShoppingCart, Menu, X } from "lucide-react";
import React, { useState } from "react";

interface NavbarProps {
  logo: string; // dynamic logo URL
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 z-30">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* <img src={logo} alt="Store Logo" className="h-10 w-auto" /> */}
          <p className="text-3xl font-bold text-purple-700">MTEC</p>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Icon for Mobile */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="text-gray-600" />
          </button>

          {/* Currency Selector */}
          <div className="hidden sm:flex items-center space-x-1 cursor-pointer">
            <Flag className="text-green-600 w-5 h-5" />
            <span className="text-sm font-medium">NGN</span>
          </div>

          {/* Location Selector */}
          <div className="hidden sm:flex items-center space-x-1 cursor-pointer">
            <Locate className="text-green-600 w-5 h-5" />
            <span className="text-sm font-medium">Lagos</span>
          </div>

          {/* Auth Links (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <a href="/login" className="hover:text-purple-600">
              Login
            </a>
            <a
              href="/register"
              className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              Register
            </a>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer">
            <ShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </div>

          {/* Hamburger Menu (visible on mobile) */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Flag className="text-green-600 w-5 h-5" />
            <span className="text-sm font-medium">NGN</span>
          </div>
          <div className="flex items-center space-x-2">
            <Locate className="text-green-600 w-5 h-5" />
            <span className="text-sm font-medium">Lagos</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
