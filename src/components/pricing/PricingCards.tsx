// PricingCards.tsx
import React, { useState } from "react";

const PricingCards = () => {
  const [currency, setCurrency] = useState("NGN");
  const [billing, setBilling] = useState("monthly");

  const prices: any = {
    NGN: {
      monthly: { starter: "Free", pro: "₦12,000", turbo: "₦22,500" },
      annually: { starter: "Free", pro: "₦120,000", turbo: "₦220,000" },
    },
    USD: {
      monthly: { starter: "Free", pro: "$15", turbo: "$29" },
      annually: { starter: "Free", pro: "$150", turbo: "$290" },
    },
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 via-white to-indigo-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Find the right plan for you
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get started for free and upgrade as your business grows. We’ve
          designed our plans with Nigerian entrepreneurs in mind, giving you
          world-class tools at local-friendly pricing.
        </p>

        {/* Toggles */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Currency Toggle */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-700 shadow-sm"
          >
            <option value="NGN">₦ NGN</option>
            <option value="USD">$ USD</option>
          </select>

          {/* Billing Toggle */}
          <div className="flex items-center gap-2 bg-white border rounded-lg shadow-sm p-1">
            {["monthly", "annually"].map((option) => (
              <button
                key={option}
                onClick={() => setBilling(option)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  billing === option
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {option === "monthly" ? "Monthly" : "Annually (Save 20%)"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Starter */}
        <div className="rounded-2xl border shadow-md bg-white p-8 flex flex-col">
          <h3 className="text-lg font-semibold">Starter</h3>
          <p className="text-gray-600 mt-2 mb-4">
            Start for free forever. Perfect for testing your idea and getting
            your first sales.
          </p>
          <p className="text-3xl font-bold">
            {prices[currency][billing].starter}
          </p>
          <button className="mt-6 py-3 px-4 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition">
            Get Started
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>✔ 20 Products</li>
            <li>✔ Basic analytics</li>
            <li>✔ Email support</li>
          </ul>
        </div>

        {/* Pro (Recommended) */}
        <div className="rounded-2xl border-2 border-indigo-600 shadow-xl bg-white p-8 flex flex-col relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            RECOMMENDED
          </div>
          <h3 className="text-lg font-semibold">Pro</h3>
          <p className="text-gray-600 mt-2 mb-4">
            Unlock advanced features, integrations, and priority support to grow
            your business faster.
          </p>
          <p className="text-3xl font-bold">{prices[currency][billing].pro}</p>
          <button className="mt-6 py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
            Get Started
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>✔ Everything in Starter</li>
            <li>✔ Unlimited products</li>
            <li>✔ Advanced analytics</li>
            <li>✔ Priority email & chat support</li>
          </ul>
        </div>

        {/* Turbo */}
        <div className="rounded-2xl border shadow-md bg-white p-8 flex flex-col">
          <h3 className="text-lg font-semibold">Turbo</h3>
          <p className="text-gray-600 mt-2 mb-4">
            Supercharge your growth with premium features, memberships, and
            dedicated account management.
          </p>
          <p className="text-3xl font-bold">
            {prices[currency][billing].turbo}
          </p>
          <button className="mt-6 py-3 px-4 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition">
            Get Started
          </button>
          <ul className="mt-6 space-y-2 text-sm text-gray-600">
            <li>✔ Everything in Pro</li>
            <li>✔ Membership site tools</li>
            <li>✔ Dedicated account manager</li>
            <li>✔ 24/7 priority support</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PricingCards;
