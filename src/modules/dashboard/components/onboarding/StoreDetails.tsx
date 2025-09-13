import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";

const storeSchema = z.object({
  storeLogo: z.any().optional(),
  storeName: z.string().min(2, "Store name is required"),
  businessName: z.string().min(2, "Business name is required"),
  businessSector: z.string().min(1, "Please select a sector"),
  storeTagline: z.string().optional(),
  storeDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  address: z.string().min(5, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(3, "Zip code is required"),
  businessEmail: z.string().email("Invalid email address"),
  businessPhone: z.string().min(7, "Phone number is required"),
  website: z.string().url("Invalid website URL").optional(),
});

type StoreFormData = z.infer<typeof storeSchema>;

const businessSectors = [
  "Fashion & Apparel",
  "Food & Beverages",
  "Health & Beauty",
  "Electronics",
  "Books & Stationery",
  "Home & Furniture",
  "Sports & Fitness",
  "Automotive",
  "Digital Products",
  "Other",
];

export default function StoreDetailsForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
  });

  const onSubmit = (data: StoreFormData) => {
    console.log("Store Details:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-10 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Store Details Setup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Store Logo */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Upload Logo
            </h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-black transition">
              <input
                type="file"
                accept="image/*"
                {...register("storeLogo")}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }}
                className="hidden"
                id="storeLogo"
              />
              <label htmlFor="storeLogo" className="flex flex-col items-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-md border shadow-sm"
                  />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload or drag & drop
                    </span>
                  </>
                )}
              </label>
            </div>
          </section>

          {/* Store Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Store Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Store Name
                </label>
                <input
                  type="text"
                  {...register("storeName")}
                  placeholder="Enter your store name"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                {errors.storeName && (
                  <p className="text-red-500 text-sm">
                    {errors.storeName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  {...register("businessName")}
                  placeholder="Enter your business name"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                {errors.businessName && (
                  <p className="text-red-500 text-sm">
                    {errors.businessName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Sector
                </label>
                <select
                  {...register("businessSector")}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                >
                  <option value="">Select sector</option>
                  {businessSectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
                {errors.businessSector && (
                  <p className="text-red-500 text-sm">
                    {errors.businessSector.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tagline (Optional)
                </label>
                <input
                  type="text"
                  {...register("storeTagline")}
                  placeholder="Affordable fashion for everyone"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Store Description
              </label>
              <textarea
                {...register("storeDescription")}
                rows={4}
                placeholder="Describe your store..."
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              />
              {errors.storeDescription && (
                <p className="text-red-500 text-sm">
                  {errors.storeDescription.message}
                </p>
              )}
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Email
                </label>
                <input
                  type="email"
                  {...register("businessEmail")}
                  placeholder="you@example.com"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                {errors.businessEmail && (
                  <p className="text-red-500 text-sm">
                    {errors.businessEmail.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Phone
                </label>
                <input
                  type="text"
                  {...register("businessPhone")}
                  placeholder="+1 234 567 890"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                {errors.businessPhone && (
                  <p className="text-red-500 text-sm">
                    {errors.businessPhone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Website (Optional)
              </label>
              <input
                type="url"
                {...register("website")}
                placeholder="https://example.com"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              />
              {errors.website && (
                <p className="text-red-500 text-sm">{errors.website.message}</p>
              )}
            </div>
          </section>

          {/* Address */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  {...register("country")}
                  placeholder="Country"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  {...register("state")}
                  placeholder="State"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  {...register("zipCode")}
                  placeholder="12345"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                {...register("address")}
                placeholder="123 Main St"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-black focus:border-black sm:text-sm"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          </section>

          {/* Submit */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-lg font-medium hover:opacity-90 transition shadow-md"
            >
              Save Store Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
