import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const StickyBottomNavbar = () => {
  const [visible, setVisible] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const componentEnd = endRef.current?.getBoundingClientRect();

      // Show navbar only after scrolling past top
      const show = scrollY > 50;

      // Hide navbar when endRef enters the viewport
      const hide = componentEnd && componentEnd.top <= window.innerHeight;

      setVisible(show && !hide);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative z-50">
      <div ref={endRef}></div>

      {/* Sticky Navbar */}
      {visible && (
        <div className="fixed font-semibold bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-lg rounded-2xl border border-white/20 bg-white/30 backdrop-blur-md shadow-lg p-4 flex justify-around items-center transition-all duration-300">
          <Link to="/about" className="hover:text-[#e28580] transition">
            About Us
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
          {/* <button className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium">
            Contact
          </button> */}
        </div>
      )}
    </div>
  );
};

export default StickyBottomNavbar;
