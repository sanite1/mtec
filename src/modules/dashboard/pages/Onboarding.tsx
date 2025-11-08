import React from "react";
import { CheckCircle, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getDecodedJwt } from "../lib/auth";
import {
  useOnboardingProgress,
  useUpdateOnboardingStep,
} from "../lib/api/onboardingSteps";

// ---------------- Skeleton Loader ----------------
function OnboardingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-6 space-y-5 animate-pulse">
      <div className="space-y-2 text-center">
        <div className="h-6 w-3/4 mx-auto bg-gray-200 rounded"></div>
        <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded"></div>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full"></div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-2xl bg-gray-100 h-28 flex gap-4"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-3 bg-gray-300 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Static Step Metadata ----------------
const initialSteps = [
  {
    key: "storeDetails",
    title: "Set up your store details",
    description:
      "Add your store name, logo, and currency to personalize your website.",
    link: "/onboarding/store-details",
  },
  {
    key: "products",
    title: "Upload your first products",
    description:
      "Start building your catalog by adding products. You can always add more later.",
    link: "/onboarding/products",
  },
  {
    key: "shipping",
    title: "Configure shipping options",
    description:
      "Define shipping rules and prices so customers can check out seamlessly.",
    link: "/onboarding/shipping",
  },
  {
    key: "payout",
    title: "Connect your payout method",
    description:
      "Add your bank or payment details to receive customer payments.",
    link: "/onboarding/payout",
  },
  {
    key: "preview",
    title: "Preview your store",
    description:
      "Take a quick look at your storefront to see how everything appears before launch.",
    link: "https://yourstore.com/preview",
  },
  {
    key: "trial",
    title: "Activate your free trial",
    description: "Unlock premium features after completing the setup steps.",
    link: "/onboarding/trial",
  },
];

// ---------------- Main Component ----------------
export default function OnboardingPage() {
  const navigate = useNavigate();
  const user = getDecodedJwt();

  const { data, isLoading } = useOnboardingProgress(user?.id);

  const { mutateAsync: updateStep } = useUpdateOnboardingStep(user?.id);

  if (isLoading) return <OnboardingSkeleton />;

  if (!data)
    return (
      <div className="text-center mt-20 text-gray-500">
        No onboarding data found.
      </div>
    );

  // Merge backend progress with frontend step metadata
  const steps = initialSteps.map((metaStep, index) => {
    const backendStep = data.steps.find((s) => s.key === metaStep.key);
    return {
      id: index + 1,
      ...metaStep,
      completed: backendStep?.completed ?? false,
      optional: backendStep?.optional ?? false,
    };
  });

  // const totalSteps = data.totalSteps || 0;
  // const completedSteps = data.completedSteps || 0;
  const progress = data.overallProgress || 0;

  const storeDetailsCompleted = steps.find(
    (s) => s.key === "storeDetails",
  )?.completed;

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
          const isPreview = step.key === "preview";
          const isTrial = step.key === "trial";
          const isDisabledPreview = isPreview && !storeDetailsCompleted;

          const handleClick = async () => {
            if (isDisabledPreview) return;
            if (isPreview) {
              window.open(step.link, "_blank");
            } else if (isTrial) {
              updateStep({ key: step.key, completed: true });
            } else if (!isCompleted) {
              updateStep({ key: step.key, completed: true });
              navigate(step.link);
            }
          };

          return (
            <div
              key={step.key}
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
              {/* Tooltip */}
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
