import React, { useState } from "react";
import { CheckCircle, Circle, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Step {
  id: number;
  title: string;
  description: string;
  link: string;
  optional?: boolean;
  completed?: boolean;
}

const initialSteps: Step[] = [
  {
    id: 1,
    title: "Set up your store details",
    description:
      "Add your store name, logo, and currency to personalize your website.",
    link: "/onboarding/store-details",
    completed: true,
  },
  {
    id: 2,
    title: "Upload your first products",
    description:
      "Start building your catalog by adding products. You can always add more later.",
    link: "/onboarding/products",
    completed: true,
  },
  {
    id: 3,
    title: "Configure shipping options",
    description:
      "Define shipping rules and prices so customers can check out seamlessly.",
    link: "/onboarding/shipping",
    completed: true,
  },
  {
    id: 4,
    title: "Connect your payout method",
    description:
      "Add your bank or payment details to receive customer payments.",
    link: "/onboarding/payout",
    completed: true,
  },
  {
    id: 5,
    title: "Preview your store",
    description:
      "Take a quick look at your storefront to see how everything appears before launch.",
    link: "https://yourstore.com/preview",
    optional: true,
    completed: false,
  },
  {
    id: 6,
    title: "Activate your free trial",
    description: "Unlock premium features after completing the setup steps.",
    link: "/onboarding/trial",
    optional: true,
    completed: true,
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<Step[]>(initialSteps);

  // Progress calculation
  const totalSteps = steps.filter((step) => !step.optional).length;
  const completedSteps = steps.filter(
    (step) => step.completed && !step.optional
  ).length;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  // Check if store details are completed
  const storeDetailsCompleted = steps.find((s) => s.id === 1)?.completed;

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-5">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          🚀 Getting Your Store Ready
        </h1>
        <p className="text-gray-600">
          Follow the steps below to complete your setup and launch your store.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-right text-sm text-gray-500 mt-0">
        {progress}% completed
      </p>

      {/* Steps */}
      <div className="grid md:grid-cols-2 gap-6">
        {steps.map((step) => {
          const isCompleted = step.completed;
          const isPreview = step.id === 5;

          // Disable Preview if store details not completed
          const isDisabledPreview = isPreview && !storeDetailsCompleted;

          const handleClick = () => {
            if (isDisabledPreview) return;
            if (isPreview) {
              window.open(step.link, "_blank"); // open new tab
            } else if (!isCompleted) {
              navigate(step.link); // normal navigation
            }
          };

          return (
            <div
              key={step.id}
              onClick={handleClick}
              className={`group relative p-6 border rounded-2xl shadow-sm transition flex items-start gap-4
                ${
                  isCompleted
                    ? "bg-purple-50 border-purple-200 cursor-not-allowed"
                    : "bg-white hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                }
                ${isDisabledPreview ? "opacity-60 cursor-not-allowed" : ""}
              `}
            >
              {/* Tooltip when preview disabled */}
              {isDisabledPreview && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-md">
                  Complete store setup first
                </div>
              )}

              {/* Icon */}
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition
                  ${
                    isCompleted
                      ? "bg-purple-100 text-purple-600 border border-purple-300"
                      : "border border-gray-300 text-gray-500 group-hover:border-purple-500 group-hover:text-purple-600"
                  }
                `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Step Info */}
              <div className="flex-1">
                <h3
                  className={`text-lg font-semibold ${
                    isCompleted ? "text-purple-700" : "text-gray-900"
                  }`}
                >
                  {step.title}{" "}
                  {step.optional && (
                    <span className="ml-2 text-xs font-medium text-gray-400">
                      (Optional)
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
