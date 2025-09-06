import React from "react";
import helpIntro from "../../assets/helpIntro.png";

export default function HeroSection() {
  const suggestions = [
    "How do I connect a domain?",
    "How do I choose a premium plan?",
    "How do I create a dynamic page?",
    "How can I run Google Ads with Wix?",
    "How do I connect an external email?",
  ];

  return (
    <div className="bg-gray-50">
      <div className="bg-black w-full h-[8vh] lg:h-[10vh]"></div>
      <section className="w-full bg-gray-50 py-16 px-6 lg:px-24 m-auto max-w-[90%] lg:max-w-[90%]">
        <div className=" mx-auto flex flex-col md:flex-row items-center gap-10 bg-white rounded-2xl p-10 shadow">
          {/* Left Section */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How can we help?
            </h2>
            <p className="text-gray-600 mb-6">
              To get the best answer, ask a detailed question
            </p>
            {/* Search Box */}
            <div className="flex w-full max-w-xl mb-6">
              <input
                type="text"
                placeholder="Ask us anything"
                className="flex-1 px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 rounded-r-full bg-gradient-to-r from-blue-500 to-green-400 text-white font-medium">
                Get Answer
              </button>
            </div>
            {/* Suggestions */}
            <div className="flex flex-wrap gap-3">
              {suggestions.map((item, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm cursor-pointer"
                >
                  {item}
                </span>
              ))}
            </div>
            {/* Explore More */}
            <div className="mt-8">
              <a
                href="#more"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
              >
                Explore More ↓
              </a>
            </div>
          </div>
          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={helpIntro}
              alt="Help Center Illustration"
              className="rounded-xl shadow-md w-full "
            />
          </div>
        </div>
      </section>
    </div>
  );
}
