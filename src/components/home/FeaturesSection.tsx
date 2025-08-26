import React, { useEffect } from "react";
import {
  Store,
  ShoppingCart,
  CreditCard,
  Boxes,
  BarChart3,
  Globe,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

import img1 from "../../assets/featuresImg.png";

const FeaturesSection: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // initialize AOS
  }, []);

  const features = [
    {
      icon: (
        <div className="flex p-3 rounded-full w-fit bg-blue-100">
          <Store className="w-8 h-8 text-blue-600" />
        </div>
      ),
      title: "Custom Storefronts",
      description:
        "Design a storefront that matches your brand. With flexible themes and full customization, your store stands out in any industry.",
    },
    {
      icon: (
        <div className="flex p-3 rounded-full w-fit bg-green-100">
          <ShoppingCart className="w-8 h-8 text-green-600" />
        </div>
      ),
      title: "Sell Anything",
      description:
        "Products, services, or subscriptions — MTEC lets you sell it all from one platform, tailored to your business model.",
    },
    {
      icon: (
        <div className="flex p-3 rounded-full w-fit bg-purple-100">
          <CreditCard className="w-8 h-8 text-purple-600" />
        </div>
      ),
      title: "Seamless Payments",
      description:
        "Accept payments globally with secure, reliable integrations. Multiple gateways supported for hassle-free transactions.",
    },
    {
      icon: (
        <div className="flex p-3 rounded-full w-fit bg-orange-100">
          <Boxes className="w-8 h-8 text-orange-600" />
        </div>
      ),
      title: "Inventory Management",
      description:
        "Keep track of your stock in real-time. Manage variants, bundles, and subscriptions effortlessly with smart inventory tools.",
    },
    {
      icon: (
        <div className="flex p-3 rounded-full w-fit bg-pink-100">
          <BarChart3 className="w-8 h-8 text-pink-600" />
        </div>
      ),
      title: "Analytics & Insights",
      description:
        "Make data-driven decisions with built-in reporting. Track sales, customers, and growth to optimize your strategy.",
    },
    {
      icon: (
        <div className="flex p-3 rounded-full w-fit bg-indigo-100">
          <Globe className="w-8 h-8 text-indigo-600" />
        </div>
      ),
      title: "Multi-Channel Selling",
      description:
        "Expand your reach by selling across multiple channels — from your storefront to marketplaces and social platforms.",
    },
  ];

  return (
    <section className="py-16 px-6 lg:px-[10%] bg-white">
      <h2
        className="text-3xl lg:text-4xl font-bold text-center m-auto mb-8 w-full lg:w-[70%]"
        data-aos="fade-up"
      >
        Power Your Business with <span className="text-blue-600">MTEC</span> —
        Sell Products and Services Effortlessly
      </h2>
      <div className="grid lg:grid-cols-4 gap-0 lg:gap-12 items-center">
        {/* Image Section */}
        <div
          data-aos="fade-right"
          className="col-span-4 lg:col-span-1 w-full h-full mb-8 lg:mb-0"
        >
          <img
            src={img1}
            alt="MTEC Dashboard"
            className="rounded-xl shadow-lg h-full w-full"
          />
        </div>

        {/* Content Section */}
        <div data-aos="fade-left" className="col-span-3">
          {/* Features Grid */}
          <div className="grid sm:grid-cols-3 gap-8 w-full">
            {features.map((feature, index) => (
              <div
                data-aos="fade-up"
                data-aos-delay={`${index + 1}00`}
                key={index}
                className=""
              >
                <div className="flex-shrink-0 mb-4">{feature.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
