import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Import your images (adjust paths!)
import img1 from "./spaceBg.png";
const heroImages = [img1];

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen mb-36 overflow-hidden">
      {/* Background Image Carousel */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      </div>

      {/* Hero Content */}
      <section className="relative z-20 flex flex-col items-center justify-center text-center h-full px-6 lg:px-[10%]">
        <div className="max-w-2xl text-white" data-aos="fade-up">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#1E3A8A] via-[#10B981] to-[#3B82F6] text-transparent bg-clip-text">
              Powering Innovation with MTEC Solutions
            </span>
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            Transform your business with cutting-edge technology and expert
            consulting. At MTEC, we deliver innovative solutions that empower
            organizations to grow, scale, and lead in today’s digital world.
          </p>

          <a
            href="/signup"
            className="mt-6 inline-block bg-[#1E3A8A] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-[#15306D] transition cursor-pointer"
          >
            Get Started with MTEC
          </a>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
