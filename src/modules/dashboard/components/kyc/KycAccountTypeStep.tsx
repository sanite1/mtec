// components/kyc/steps/KycAccountTypeStep.tsx
import { User, Building2 } from "lucide-react";

interface Props {
  value?: "individual" | "business";
  onSelect: (type: "individual" | "business") => void;
  onContinue: () => void;
}

const KycAccountTypeStep = ({ value, onSelect, onContinue }: Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Choose account type
        </h2>
        <p className="mt-2 text-gray-600">
          Select how you plan to receive payouts.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Option
          active={value === "individual"}
          icon={<User />}
          title="Individual"
          description="Receive payouts into your personal bank account."
          onClick={() => onSelect("individual")}
        />
        <Option
          active={value === "business"}
          icon={<Building2 />}
          title="Business"
          description="Receive payouts into a registered business account."
          onClick={() => onSelect("business")}
        />
      </div>

      <button
        disabled={!value}
        onClick={onContinue}
        className="w-full rounded-lg bg-purple-600 text-white py-3 font-medium disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
};

const Option = ({ icon, title, description, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`border rounded-lg p-4 text-left transition ${
      active ? "border-black bg-gray-50" : "hover:border-gray-400"
    }`}
  >
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <p className="font-medium">{title}</p>
    </div>
    <p className="text-sm text-gray-600">{description}</p>
  </button>
);

export default KycAccountTypeStep;
