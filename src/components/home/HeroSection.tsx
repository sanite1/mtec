import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Import your images
import img1 from "../../assets/spaceBg.png";
import homeImg from "../../assets/homeIntro.png";

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative w-full h-fit lg:h-screen overflow-hidden flex items-center"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Hero Content Grid */}
      <section className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full h-full items-center px-6 lg:px-0 gap-8 pt-[15vh] lg:pt-[10vh]">
        {/* Left Side - Text */}
        <div
          className="text-white flex flex-col justify-center mx-auto lg:mx-0 lg:pl-[10vw]"
          data-aos="fade-up"
        >
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-[#1E3A8A] via-[#10B981] to-[#3B82F6] text-transparent bg-clip-text">
              Build it your way. Your future in commerce starts here.
            </span>
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            With MTEC, you don’t just build an online store — you build a
            business on your terms. Think big, sell bigger. From custom
            storefronts to seamless payments, inventory control, and
            multi-channel selling, MTEC gives you the flexibility to grow at
            your pace and the tools to go beyond your goals.
          </p>

          <Link
            to="/signup"
            className="mt-6 w-fit inline-block bg-[#1E3A8A] text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-[#15306D] transition cursor-pointer"
          >
            Discover MTEC
          </Link>
        </div>

        {/* Right Side - Image */}
        <div
          className="flex justify-center items-center w-full h-full"
          data-aos="fade-left"
        >
          <img
            src={homeImg}
            alt="MTEC Hero"
            className="w-auto h-auto overflow-hidden"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
