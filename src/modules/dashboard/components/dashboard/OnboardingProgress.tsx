import React, { useMemo } from "react";
import { OnboardingData } from "../../lib/types/onboardingSteps";
import { useNavigate } from "react-router-dom";

const steps = [
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

export default function OnboardingProgress({
  onboardingDetails,
}: {
  onboardingDetails?: OnboardingData;
}) {
  const navigate = useNavigate();

  // ✅ Find the next required incomplete step
  const nextStep = useMemo(() => {
    if (!onboardingDetails?.steps?.length) return null;

    const pendingStep = onboardingDetails.steps.find(
      (s) => !s.completed && !s.optional,
    );

    const fallbackOptional = onboardingDetails.steps.find(
      (s) => !s.completed && s.optional,
    );

    const target = pendingStep || fallbackOptional;
    if (!target) return null;

    return steps.find((step) => step.key === target.key);
  }, [onboardingDetails]);

  if (!onboardingDetails || !nextStep) {
    return null;
  }

  return (
    <div className="bg-white mb-6 border rounded-lg shadow-sm p-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800">
        Complete your onboarding
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        {onboardingDetails.completedSteps} of {onboardingDetails.totalSteps}{" "}
        steps completed
      </p>

      {/* ✅ Progress Card */}
      <div className="mt-4 flex items-center justify-between bg-purple-50 border border-purple-200 rounded-md p-4">
        <div>
          <p className="text-sm font-medium text-gray-800">
            Next Step: <span className="text-purple-600">{nextStep.title}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">{nextStep.description}</p>
        </div>

        <button
          onClick={() => navigate(nextStep.link)}
          className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
