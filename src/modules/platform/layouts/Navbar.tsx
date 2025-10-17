"use client"; // not needed in CRA but leaving won’t hurt

import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, LogIn, Menu, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import RequestQuoteCard from "./RequestQuoteCard";
// import logo from "../assets/images/logo.png";

export default function Header() {
  const pathname = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState(
    pathname.pathname === "/home"
      ? "bg-transparent text-white"
      : "bg-transparent text-black",
  );
  //   const [isCardOpen, setIsCardOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        //   setBgColor("bg-[#fff] text-black");
        setBgColor("bg-transparent text-white");
      } else {
        setBgColor("bg-transparent text-white");
      }
      // if (pathname.pathname === "/") {
      // } else {
      //   if (window.scrollY > 0) {
      //     setBgColor("bg-transparent text-black");
      //   } else {
      //     setBgColor("bg-transparent text-black");
      //   }
      // }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (window.scrollY > 0) {
      setBgColor("bg-transparent text-white");
    } else {
      setBgColor("bg-transparent text-white");
    }
    // if (pathname.pathname === "/") {
    // } else {
    //   if (window.scrollY > 0) {
    //     setBgColor("bg-transparent text-black");
    //   } else {
    //     setBgColor("bg-transparent text-black");
    //   }
    // }
  }, [pathname]);

  const isLocalhost = window.location.hostname === "mtec.localhost";

  // 🌐 Define admin login URL
  const adminLoginUrl = isLocalhost
    ? "http://admin.localhost:3000" // <-- your local admin port
    : "https://admin.yourdomain.com"; // <-- production admin domain

  return (
    <section
      className={`bg-transparent absolute top-0 w-full z-50 box-border  ${bgColor} ${
        bgColor === "bg-[#fff]" && "shadow-md"
      }`}
    >
      <header className="overflow-hidden  bg-transparent">
        <div className="mx-auto flex items-center justify-between px-6 lg:px-24 py-4 max-w-[90%] lg:max-w-[90%]">
          <div className="flex">
            {/* Logo */}
            <Link to="/" onClick={() => setIsOpen(false)}>
              {/* <img
                  src={logo}
                  alt="Amber Training Logo"
                  className="h-auto w-[120px] lg:w-[120px]"
                /> */}
              <p className="text-3xl font-bold">MTEC</p>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium pl-6 ml-6 border-l border-white">
              <Link to="/about" className="hover:text-[#e28580] transition">
                About
              </Link>
              <Link to="/services" className="hover:text-[#e28580] transition">
                Services
              </Link>
              <Link to="/pricing" className="hover:text-[#e28580] transition">
                Pricing
              </Link>
              <Link to="/contact" className="hover:text-[#e28580] transition">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Desktop CTA */}

          <div className="">
            <a href={adminLoginUrl}>
              <button className="ml-4 hidden md:inline-flex items-center gap-2 rounded-md bg-transparent border border-purple-600 px-5 py-2 text-purple-600 text-sm font-medium transition">
                <LogIn className="w-4 h-4" />
                Login
              </button>
            </a>
            <Link to={`${adminLoginUrl}/signup`}>
              <button
                // onClick={() => setIsCardOpen(true)}
                className="ml-4 hidden md:inline-flex items-center gap-2 rounded-md bg-purple-600 px-5 py-2 text-white text-sm font-medium hover:bg-purple-700 transition"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-purbg-purple-600 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[100px] left-0 w-full z-40 px-4 "
          >
            <div className="bg-gradient-to-r from-[#fff9f8] to-[#f5f5f5] rounded-2xl shadow-xl p-6 space-y-4 max-w-sm mx-auto border border-gray-100">
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 font-medium hover:text-[#e28580] transition"
              >
                About
              </Link>
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 font-medium hover:text-[#e28580] transition"
              >
                Services
              </Link>
              <Link
                to="/pricing"
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 font-medium hover:text-[#e28580] transition"
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block text-gray-800 font-medium hover:text-[#e28580] transition"
              >
                Contact Us
              </Link>
              <button
                onClick={() => {
                  setIsOpen(false);
                  //   setIsCardOpen(true);
                }}
                className="inline-flex items-center gap-2 w-full justify-center mt-4 rounded-full bg-[#09385F] px-5 py-2 text-white text-sm font-medium hover:bg-[#cc6e68] transition"
              >
                Login
                <span className="inline-flex items-center justify-center bg-white text-[#09385F] rounded-full p-1">
                  <ArrowUpRight size={14} />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <RequestQuoteCard open={isCardOpen} setOpen={setIsCardOpen} /> */}
    </section>
  );
}
