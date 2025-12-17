import { ArrowLeft } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getDecodedJwt } from "../../lib/auth";
import { useUpdateUser, useUserDetails } from "../../lib/api/authOnboarding";
import { toDateInputValue } from "../../lib/utils/utils";

// Zod Validation Schema
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  phone: z.string().min(1, "Phone number is required"),
  // email: z.string().email("Invalid email address"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function EditProfilePage() {
  const navigate = useNavigate();
  const user = getDecodedJwt();

  const { data: userDetails, isLoading } = useUserDetails(user?.id as string);
  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      phone: "",
      // email: "",
    },
  });

  // Load user details into the form once they are fetched
  useEffect(() => {
    if (userDetails) {
      reset({
        firstName: userDetails.firstname ?? "",
        middleName: userDetails.middlename ?? "",
        lastName: userDetails.lastname ?? "",
        dob: toDateInputValue(userDetails.dob),
        phone: userDetails.phone ?? "",
        // email: userDetails.email ?? "",
      });
    }
  }, [userDetails, reset]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateUser({
        id: userDetails?._id as string,
        payload: {
          firstname: data.firstName,
          middlename: data.middleName,
          lastname: data.lastName,
          dob: data.dob,
          phone: data.phone,
          // email: data.email,
        },
      });

      navigate("/profile");
    } catch (error: any) {
      console.warn("Update error:", error);
    }
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg border rounded-2xl p-6">
        <div className="mb-8 border-b border-gray-200 pb-4 flex items-center">
          <button
            onClick={() => navigate("/profile")}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>

          <h2 className="text-xl font-bold">Edit Profile</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("firstName")}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Middle Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                {...register("middleName")}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("lastName")}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* DOB */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                {...register("dob")}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.dob && (
                <p className="text-red-500 text-xs">{errors.dob.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                {...register("phone")}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                // {...register("email")}
                disabled
                value={userDetails?.email}
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
              {/* {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )} */}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/profile"
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
