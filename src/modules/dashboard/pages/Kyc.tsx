// components/kyc/KycFlow.tsx
import React, { useState } from "react";
import KycIntroStep from "../components/kyc/KycIntroStep";
import KycProfileStep from "../components/kyc/KycProfileStep";
import KycAccountTypeStep from "../components/kyc/KycAccountTypeStep";
import KycVerificationStep from "../components/kyc/KycVerificationStep";

type AccountType = "individual" | "business";

const STEPS = ["Requirements", "Profile", "Account Type", "Verification"];

const KycFlow = () => {
  const [step, setStep] = useState(0);

  // 🔹 Prefilled from backend later
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    dob: "1995-06-15",
  });

  const [accountType, setAccountType] = useState<AccountType | undefined>();
  const [bvnOrNin, setBvnOrNin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 Handlers
  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const updateProfile = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const submitVerification = async () => {
    setIsSubmitting(true);

    // 🔌 API call will go here
    console.log({
      profile,
      accountType,
      bvnOrNin,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Verification submitted (mock)");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* 🔹 Step Indicator */}
      <StepIndicator currentStep={step} />

      <div className="mt-8 bg-white border rounded-xl p-6 shadow-sm">
        {step === 0 && <KycIntroStep onContinue={nextStep} />}

        {step === 1 && (
          <KycProfileStep
            // values={profile}
            // onChange={updateProfile}
            onContinue={nextStep}
          />
        )}

        {step === 2 && (
          <KycAccountTypeStep
            value={accountType}
            onSelect={setAccountType}
            onContinue={nextStep}
          />
        )}

        {step === 3 && (
          <KycVerificationStep
            label={
              accountType === "business" ? "Director BVN / NIN" : "BVN or NIN"
            }
            placeholder="Enter your number"
            value={bvnOrNin}
            onChange={setBvnOrNin}
            onSubmit={submitVerification}
            isLoading={isSubmitting}
          />
        )}
      </div>

      {/* 🔹 Back button */}
      {step > 0 && (
        <button
          onClick={prevStep}
          className="mt-4 text-sm text-gray-600 hover:text-black"
        >
          ← Go back
        </button>
      )}
    </div>
  );
};

export default KycFlow;

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-center justify-between">
      {STEPS.map((label, index) => (
        <div key={label} className="flex-1 flex items-center">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
              index <= currentStep
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {index + 1}
          </div>

          <p className="ml-2 text-sm text-gray-700 hidden sm:block">{label}</p>

          {index !== STEPS.length - 1 && (
            <div className="flex-1 h-px bg-gray-300 mx-3" />
          )}
        </div>
      ))}
    </div>
  );
};
