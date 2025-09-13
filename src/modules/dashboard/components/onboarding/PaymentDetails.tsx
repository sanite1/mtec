import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Schema
const payoutSchema = z.object({
  accountName: z.string().min(2, "Account name is required"),
  accountNumber: z
    .string()
    .length(10, "Account number must be 10 digits")
    .regex(/^\d+$/, "Account number must be numeric"),
  bankName: z.string().min(1, "Bank name is required"),
  allowCustomerCharges: z.boolean(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});

type PayoutFormData = z.infer<typeof payoutSchema>;

// ✅ Nigerian Banks (basic list)
const banks = [
  "Access Bank",
  "Zenith Bank",
  "First Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Guaranty Trust Bank (GTBank)",
  "Union Bank",
  "Sterling Bank",
  "Fidelity Bank",
  "Ecobank",
  "Keystone Bank",
  "Polaris Bank",
  "Stanbic IBTC Bank",
  "Wema Bank",
  "Heritage Bank",
];

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

// ✅ Reusable Toggle Component
const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        onClick={onChange}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
          checked ? "bg-purple-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </label>
  );
};

// ✅ Main Component
const ConnectPayoutPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PayoutFormData>({
    resolver: zodResolver(payoutSchema),
    defaultValues: {
      allowCustomerCharges: false,
      acceptTerms: false,
    },
  });

  const allowCharges = watch("allowCustomerCharges");
  const acceptTerms = watch("acceptTerms");

  const onSubmit = (data: PayoutFormData) => {
    console.log("Payout Data:", data);
  };

  return (
    <div className=" flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Connect Payout Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Account Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Name
            </label>
            <input
              {...register("accountName")}
              className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter account name"
            />
            {errors.accountName && (
              <p className="text-red-500 text-sm">
                {errors.accountName.message}
              </p>
            )}
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              {...register("accountNumber")}
              className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter 10-digit account number"
              maxLength={10}
            />
            {errors.accountNumber && (
              <p className="text-red-500 text-sm">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          {/* Bank Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <select
              {...register("bankName")}
              className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">— Select Bank —</option>
              {banks.map((bank, i) => (
                <option key={i} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
            {errors.bankName && (
              <p className="text-red-500 text-sm">{errors.bankName.message}</p>
            )}
          </div>

          {/* Toggles */}
          <div className="space-y-4">
            <Toggle
              label="Allow customer to pay transaction charges"
              checked={allowCharges}
              onChange={() =>
                setValue("allowCustomerCharges", !allowCharges, {
                  shouldValidate: true,
                })
              }
            />
            <Toggle
              label="I understand and accept terms"
              checked={acceptTerms}
              onChange={() =>
                setValue("acceptTerms", !acceptTerms, {
                  shouldValidate: true,
                })
              }
            />
            {errors.acceptTerms && (
              <p className="text-red-500 text-sm">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white rounded py-2 hover:bg-purple-700 transition"
          >
            Save Payout Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConnectPayoutPage;
