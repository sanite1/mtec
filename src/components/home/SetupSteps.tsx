import React, { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Sign Up for an Account",
    description: "Create your MTEC account in just a few clicks.",
    image: "https://via.placeholder.com/500x400?text=Sign+Up", // replace with real image
  },
  {
    id: 2,
    title: "Set Up Your Store",
    description: "Customize your storefront with branding and colors.",
    image: "https://via.placeholder.com/500x400?text=Set+Up+Store",
  },
  {
    id: 3,
    title: "List Products or Services",
    description: "Upload items, set prices, or create subscription plans.",
    image: "https://via.placeholder.com/500x400?text=List+Products",
  },
  {
    id: 4,
    title: "Connect Payments",
    description: "Enable secure payments with your preferred providers.",
    image: "https://via.placeholder.com/500x400?text=Payments",
  },
  {
    id: 5,
    title: "Start Selling Anywhere",
    description: "Launch your store and manage orders with ease.",
    image: "https://via.placeholder.com/500x400?text=Start+Selling",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(steps[0]);

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
        {/* Left - Image */}
        <div className="flex justify-center items-center">
          <img
            src={activeStep.image}
            alt={activeStep.title}
            className="w-full max-w-md rounded-2xl shadow-lg transition-all duration-500"
          />
        </div>

        {/* Right - Steps */}
        <div className="space-y-6">
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(step)}
                className={`cursor-pointer rounded-xl p-5 transition-all duration-300 border ${
                  activeStep.id === step.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
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
    </div>
  );
}
