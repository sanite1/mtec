// app/billing/page.tsx
"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description:
      "Perfect for testing ideas and getting your first sales without commitment.",
    prices: {
      quarterly: 30000,
      biannual: 60000,
      annual: 120000,
    },
    features: ["10 Products", "Basic Analytics", "Community Support"],
    highlighted: false,
    color: "from-green-400 to-emerald-600",
  },
  {
    name: "Pro",
    description:
      "Unlock advanced features and integrations to grow your business faster.",
    prices: {
      quarterly: 45000, // 15k * 3
      biannual: 90000, // 15k * 6
      annual: 180000, // 15k * 12
    },
    features: [
      "Unlimited Products",
      "Advanced Analytics",
      "Priority Email Support",
    ],
    highlighted: true,
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "Growth",
    description:
      "Scale with premium features, memberships, and dedicated account management.",
    prices: {
      quarterly: 90000, // 30k * 3
      biannual: 180000, // 30k * 6
      annual: 360000, // 30k * 12
    },
    features: [
      "Everything in Pro",
      "Membership Tools",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
    highlighted: false,
    color: "from-orange-400 to-pink-600",
  },
];

type BillingCycle = "quarterly" | "biannual" | "annual";

export default function BillingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("quarterly");
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  if (selectedPlan) {
    return (
      <div className="py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Confirm Your Plan
          </h2>
          <p className="text-gray-600 text-center mb-6">
            You’ve selected the <strong>{selectedPlan.name}</strong> plan (
            {cycle}).
          </p>
          <div className="text-center mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₦{selectedPlan.prices[cycle].toLocaleString()}
            </span>
            <p className="text-gray-500 mt-1 capitalize">{cycle} billing</p>
          </div>
          {/* <ul className="space-y-2 mb-6">
            {selectedPlan.features.map((f: string, i: number) => (
              <li key={i} className="flex items-center text-gray-700 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" /> {f}
              </li>
            ))}
          </ul> */}
          <button className="w-full py-3 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 transition">
            Proceed to Payment
          </button>
          <button
            className="w-full mt-3 py-2 rounded-xl text-gray-700 border hover:bg-gray-50 transition"
            onClick={() => setSelectedPlan(null)}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Choose the right plan for{" "}
          <span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
            MTEC
          </span>
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Flexible pricing to match your growth. Upgrade anytime as your needs
          evolve.
        </p>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center gap-3 mb-10">
        {(["quarterly", "biannual", "annual"] as BillingCycle[]).map((c) => (
          <button
            key={c}
            onClick={() => setCycle(c)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
              cycle === c
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative bg-white rounded-2xl shadow-md overflow-hidden border transition hover:shadow-xl flex flex-col ${
              plan.highlighted ? "ring-2 ring-purple-500 lg:scale-105" : ""
            }`}
          >
            <div className={`h-2 w-full bg-gradient-to-r ${plan.color}`} />
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                {plan.description}
              </p>

              <div className="mt-4">
                <span className="text-2xl sm:text-3xl font-bold">
                  ₦{plan.prices[cycle].toLocaleString()}
                </span>
                <span className="text-gray-500 ml-1 text-sm capitalize">
                  {cycle} billing
                </span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-gray-700 text-sm sm:text-base"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan)}
                className={`mt-6 w-full py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-white transition bg-gradient-to-r ${plan.color} hover:opacity-90`}
              >
                {plan.highlighted ? "Choose Pro" : "Choose Plan"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
