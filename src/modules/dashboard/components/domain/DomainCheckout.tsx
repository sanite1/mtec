// components/domains/DomainCheckout.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Zod Schema
const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface DomainCheckoutProps {
  domain: string;
  amount: number;
  duration: string;
  billingPeriod: string;
  onBack: () => void;
}

const DomainCheckout: React.FC<DomainCheckoutProps> = ({
  domain,
  amount,
  duration,
  billingPeriod,
  onBack,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Domain Checkout Data:", {
      domain,
      amount,
      duration,
      billingPeriod,
      ...data,
    });
  };

  return (
    <div className="w-full ">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border">
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b bg-gray-50">
          <button
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-purple-600 transition"
          >
            ← Back
          </button>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            Domain Checkout
          </h2>
        </div>

        {/* Domain Summary */}
        <div className="px-4 sm:px-6 py-5 bg-gradient-to-r from-purple-50 to-white border-b">
          <p className="text-sm text-gray-500 mb-2">Selected Domain</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-lg sm:text-xl font-semibold text-purple-700 break-all">
                {domain}
              </p>
              <p className="text-sm text-gray-600">
                {duration} • {billingPeriod}
              </p>
            </div>
            <p className="text-base sm:text-lg font-bold text-gray-900">
              ₦{amount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Checkout Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 sm:px-6 py-6 space-y-5"
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("firstName")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("lastName")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              {...register("email")}
              className={`mt-1 block w-full px-3 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold rounded-md py-2 sm:py-3 hover:bg-purple-700 transition text-sm sm:text-base"
          >
            Make Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default DomainCheckout;
