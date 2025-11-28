import { Flag, Locate, Search, ShoppingCart, Menu, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Product } from "../types/products";
import { sampleProducts } from "../data/products";
import { IStoreDetails } from "../lib/types/store";

interface NavbarProps {
  logo: string;
}

const Navbar: React.FC<NavbarProps> = ({ logo }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const store: IStoreDetails = JSON.parse(
    localStorage.getItem("store") || "null",
  );
  const { state } = useCart();
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filter products as user types
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFiltered([]);
    } else {
      const results = sampleProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFiltered(results);
    }
  }, [searchTerm]);

  // Click outside to close search results
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchTerm("");
        setFiltered([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 z-30">
      <div className="container mx-auto px-4 flex items-center justify-between py-3">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center space-x-2">
            {/* <p className="text-3xl font-bold text-purple-700">MTEC</p> */}
            <img
              src={store.logoUrl}
              alt="Logo"
              className="h-12 font-bold text-purple-700"
            />
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 mx-6 relative" ref={searchRef}>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" />
          </div>

          {/* Results Dropdown */}
          {filtered.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-40">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  onClick={() => {
                    setSearchTerm("");
                    setFiltered([]);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Toggle */}
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

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <Link to={`/login`}>
              <p className="hover:text-purple-600">Login</p>
            </Link>

            <Link to={`/register`}>
              <p className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700">
                Register
              </p>
            </Link>
          </div>

          {/* Cart */}
          <Link to={`/cart`}>
            <div className="relative cursor-pointer">
              <ShoppingCart className="text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
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

      {/* Mobile Search */}
      {searchOpen && (
        <div
          className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-3 relative"
          ref={searchRef}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" />
          </div>

          {/* Results Dropdown (Mobile) */}
          {filtered.length > 0 && (
            <div className="absolute top-16 left-0 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-40">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={`/product/${item.id}`}
                  onClick={() => {
                    setSearchTerm("");
                    setFiltered([]);
                    setSearchOpen(false);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Dropdown */}
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
