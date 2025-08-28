import React, { useState, useEffect } from "react";

import Signup from "../../assets/signupHome.png";
import setupStore from "../../assets/setupStore.png";
import connectPayments from "../../assets/connectPayments.png";
import listProducts from "../../assets/listProducts.png";
import SellAnywhere from "../../assets/sellAnywhere.png";

const steps = [
  {
    id: 1,
    title: "Sign Up for an Account",
    description: "Create your MTEC account in just a few clicks.",
    image: Signup,
    color: "bg-blue-300 text-white border-blue-300",
  },
  {
    id: 2,
    title: "Set Up Your Store",
    description: "Customize your storefront with branding and colors.",
    image: setupStore,
    color: "bg-orange-300 text-white border-orange-300",
  },
  {
    id: 3,
    title: "List Products or Services",
    description: "Upload items, set prices, or create subscription plans.",
    image: listProducts,
    color: "bg-red-300 text-white border-red-300",
  },
  {
    id: 4,
    title: "Connect Payments",
    description: "Enable secure payments with your preferred providers.",
    image: connectPayments,
    color: "bg-green-300 text-white border-green-300",
  },
  {
    id: 5,
    title: "Start Selling Anywhere",
    description: "Launch your store and manage orders with ease.",
    image: SellAnywhere,
    color: "bg-purple-300 text-white border-purple-300",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(steps[0]);
  const [fade, setFade] = useState(true);

  // handle manual + auto change
  const handleStepChange = (step: any) => {
    setFade(false); // start fade-out
    setTimeout(() => {
      setActiveStep(step); // switch
      setFade(true); // fade-in
    }, 300);
  };

  // auto-play every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = steps.findIndex((s) => s.id === activeStep.id);
      const nextStep = steps[(currentIndex + 1) % steps.length];
      handleStepChange(nextStep);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeStep]); // depends on current activeStep

  return (
    <div className="w-full py-16 px-6">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Steps to Get Started with{" "}
          <span className="text-indigo-600">MTEC</span>
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Launch your online store in minutes with these simple steps.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <img
            key={activeStep.id}
            src={activeStep.image}
            alt={activeStep.title}
            className={`w-full h-auto rounded-lg transition-all duration-500 ${
              fade ? "animate-spinIn" : "animate-spinOut"
            }`}
          />
        </div>

        {/* RIGHT STEPS */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => handleStepChange(step)}
              className={`cursor-pointer rounded-xl p-5 transition-all duration-300 border ${
                activeStep.id === step.id
                  ? `${activeStep.color} shadow-md`
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:shadow"
              }`}
            >
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm mt-1">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
