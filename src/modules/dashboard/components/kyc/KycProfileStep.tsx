import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef } from "react";

import { useUpdateUser, useUserDetails } from "../../lib/api/authOnboarding";
import { getDecodedJwt } from "../../lib/auth";
import { toDateInputValue } from "../../lib/utils/utils";

const kycProfileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  middlename: z.string().min(1, "Middle name is required"),
  lastname: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
});

type KycProfileFormValues = z.infer<typeof kycProfileSchema>;

interface Props {
  onContinue: () => void;
}

const KycProfileStep = ({ onContinue }: Props) => {
  const user = getDecodedJwt();

  const { data: userDetails, isLoading } = useUserDetails(user?.id as string);
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<KycProfileFormValues>({
    resolver: zodResolver(kycProfileSchema),
    defaultValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      dob: "",
    },
  });

  // ✅ Populate form once backend data loads
  useEffect(() => {
    if (userDetails) {
      reset({
        firstname: userDetails.firstname ?? "",
        middlename: userDetails.middlename ?? "",
        lastname: userDetails.lastname ?? "",
        dob: toDateInputValue(userDetails.dob),
      });
    }
  }, [userDetails, reset]);

  const onSubmit = async (data: KycProfileFormValues) => {
    if (!userDetails?._id) return;

    try {
      await updateUser({
        id: userDetails._id,
        payload: {
          firstname: data.firstname.trim(),
          middlename: data.middlename.trim(),
          lastname: data.lastname.trim(),
          dob: data.dob, // YYYY-MM-DD (safe)
        },
      });

      onContinue(); // ✅ move to next KYC step
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading your details…</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Confirm your details
        </h2>
        <p className="mt-2 text-gray-600">
          These details must match exactly with your BVN or NIN records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First name"
          error={errors.firstname?.message}
          {...register("firstname")}
        />
        <Input
          label="Last name"
          error={errors.lastname?.message}
          {...register("lastname")}
        />
        <Input
          label="Middle name"
          error={errors.middlename?.message}
          {...register("middlename")}
        />
        <Input
          label="Date of birth"
          type="date"
          error={errors.dob?.message}
          {...register("dob")}
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg text-sm text-yellow-800">
        Ensure these details match your government records exactly to avoid
        verification failure.
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-purple-600 text-white py-3 font-medium hover:bg-purple-700 disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save & Continue"}
      </button>
    </form>
  );
};
export default KycProfileStep;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  ),
);

Input.displayName = "Input";
