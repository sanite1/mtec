import React from "react";
import aboutPeople from "../../assets/aboutPeople.png";

const AboutHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern / Shape */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-600 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-red-600 opacity-20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative container max-w-7xl mx-auto px-6 py-28 pb-0 lg:px-12 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-center lg:text-left">
            About <span className="text-green-500">MTEC</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-xl text-center lg:text-left">
            At MTEC, we are dedicated to empowering individuals and businesses
            through innovative technology, hands-on training, and professional
            consultancy services. We aim to bridge the gap between knowledge and
            practice, driving growth across industries.
          </p>

          <div className="mt-8 flex gap-4 justify-center lg:justify-start">
            <a
              href="#vision"
              className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition"
            >
              Our Vision
            </a>
            <a
              href="#team"
              className="px-6 py-3 rounded-lg border border-gray-500 hover:bg-gray-800 transition"
            >
              Meet the Team
            </a>
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="flex justify-center">
          <img
            src={aboutPeople}
            alt="About MTEC"
            className="w-full max-w-md lg:max-w-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
