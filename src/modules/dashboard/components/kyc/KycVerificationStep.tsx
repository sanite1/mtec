// components/kyc/steps/KycVerificationStep.tsx
import { Lock } from "lucide-react";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const KycVerificationStep = ({
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
  isLoading,
}: Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Submit verification details
        </h2>
        <p className="mt-2 text-gray-600">
          We’ll securely verify this information using a licensed third-party
          provider.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div className="flex gap-2 items-start text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <Lock size={16} />
        <p>
          Your information is encrypted and never stored in plain text. We do
          not have access to your full records.
        </p>
      </div>

      <button
        onClick={onSubmit}
        disabled={!value || isLoading}
        className="w-full rounded-lg bg-purple-600 text-white py-3 font-medium disabled:opacity-50"
      >
        {isLoading ? "Verifying..." : "Submit & Verify"}
      </button>
    </div>
  );
};

export default KycVerificationStep;
