// components/kyc/steps/KycIntroStep.tsx
import { ShieldCheck, IdCard, Building2 } from "lucide-react";

interface Props {
  onContinue: () => void;
}

const KycIntroStep = ({ onContinue }: Props) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Verify your identity
        </h2>
        <p className="mt-2 text-gray-600 w-3/3 md:w-2/3">
          To comply with regulations and protect your account, we need to verify
          your identity before you can receive payouts.
        </p>
      </div>

      <div className="space-y-4">
        <Requirement
          icon={<IdCard size={20} />}
          title="Government-issued ID"
          description="We verify your BVN or NIN to confirm your identity."
        />
        <Requirement
          icon={<Building2 size={20} />}
          title="Business verification (if applicable)"
          description="If you plan to receive funds into a business account, we’ll verify your CAC details."
        />
        <Requirement
          icon={<ShieldCheck size={20} />}
          title="Secure & compliant"
          description="Your data is encrypted and verified securely by licensed third-party providers."
        />
      </div>

      <button
        onClick={onContinue}
        className="w-full mt-6 rounded-lg bg-purple-600 text-white py-3 font-medium hover:bg-purple-870 transition"
      >
        Continue
      </button>
    </div>
  );
};

const Requirement = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex gap-4 p-4 border rounded-lg bg-gray-50">
    <div className="text-gray-700">{icon}</div>
    <div>
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default KycIntroStep;
