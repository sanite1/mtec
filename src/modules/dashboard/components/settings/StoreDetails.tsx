import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import {
  useCreateStore,
  useFetchStoreById,
  useUpdateStore,
} from "../../lib/api/store";
import { IStoreUpdate } from "../../lib/types/store";
import { getDecodedJwt } from "../../lib/auth";
import { useNavigate } from "react-router-dom";
import { convertUrlToFile, isLightColor } from "../../lib/utils/utils";

const storeSchema = z.object({
  storeLogo: z.file().optional(),
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
  website: z.string().optional(),
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

export function formatNameToSlug(name: string): string {
  return name
    .toLowerCase() // convert to lowercase
    .replace(/\s+/g, "") // remove all spaces
    .trim(); // remove leading/trailing spaces
}

export default function StoreDetailsSettings() {
  const [preview, setPreview] = useState<string | null>(null);
  const [color, setColor] = useState("#000000");

  // ✅ Validate hex properly
  const isValidHex = (value: string) => /^#([0-9A-Fa-f]{3}){1,2}$/.test(value);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
  });

  const user = getDecodedJwt();
  const navigate = useNavigate();
  const { mutateAsync: updateStore, isPending } = useUpdateStore();
  const { data: storeDetails, isLoading } = useFetchStoreById(user?.id);

  const onSubmit = async (data: StoreFormData) => {
    try {
      const payload: IStoreUpdate = {
        logoUrl: data.storeLogo || undefined,

        storeName: data.storeName,
        businessName: data.businessName,
        businessSector: data.businessSector,
        tagline: data.storeTagline,
        storeDescription: data.storeDescription,
        slug: formatNameToSlug(data.storeName),
        storeLink: `${formatNameToSlug(data.storeName)}.bitec.store`,
        storeColor: color,
        isLightColor: isLightColor(color),

        businessEmail: data.businessEmail,
        businessPhone: data.businessPhone,
        website: data.website,

        country: data.country,
        state: data.state,
        zipCode: data.zipCode,
        streetAddress: data.address,
      };

      await updateStore({ storeId: storeDetails?._id, payload });
    } catch (error) {
      console.error("Store update failed:", error);
    }
  };

  useEffect(() => {
    if (storeDetails) {
      if (storeDetails.storeColor) {
        setColor(storeDetails.storeColor);
      }
      reset({
        storeLogo: undefined, // files can’t be prefilled, leave as undefined
        storeName: storeDetails.storeName ?? "",
        businessName: storeDetails.businessName ?? "",
        businessSector: storeDetails.businessSector ?? "",
        storeTagline: storeDetails.tagline ?? "",
        storeDescription: storeDetails.storeDescription ?? "",
        address: storeDetails.streetAddress ?? "",
        country: storeDetails.country ?? "",
        state: storeDetails.state ?? "",
        zipCode: storeDetails.zipCode ?? "",
        businessEmail: storeDetails.businessEmail ?? "",
        businessPhone: storeDetails.businessPhone ?? "",
        website: storeDetails.website ?? "",
      });

      const loadImg = async () => {
        const imageFile = storeDetails.logoUrl
          ? await convertUrlToFile(storeDetails.logoUrl)
          : undefined;
        let imgFile: File | undefined;
        imgFile = imageFile || undefined;

        imageFile && setPreview(URL.createObjectURL(imageFile));

        setValue("storeLogo", imgFile);
      };
      loadImg();
    }
  }, [storeDetails, reset]);

  //   let imgFile = watch("image") as File | null;

  return (
    <div className="min-h-screen flex items-center justify-center py-6">
      <div className="w-full max-w-4xl ">
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
                id="storeLogo"
                className="hidden"
                // {...register("storeLogo")}
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setValue("storeLogo", file); // store ONLY the file
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
              <label htmlFor="storeLogo" className="flex flex-col items-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-auto p-1 h-24 object-cover rounded-md border shadow-sm"
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                className="mt-1 block w-full border rounded px-3 py-2"
              />
              {errors.storeDescription && (
                <p className="text-red-500 text-sm">
                  {errors.storeDescription.message}
                </p>
              )}
            </div>

            <div className="space-y-2 w-full max-w-sm">
              <label className="text-sm font-medium text-gray-700">
                Select Color
              </label>

              <div className="flex items-center gap-3">
                {/* ✅ Color Picker */}
                <input
                  type="color"
                  value={isValidHex(color) ? color : "#000000"}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded border border-gray-300"
                />

                {/* ✅ Manual Hex Input */}
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                  maxLength={7}
                  className={`h-10 px-3 rounded-md border text-sm focus:outline-none ${
                    isValidHex(color)
                      ? "border-gray-300 focus:ring-2 focus:ring-purple-500"
                      : "border-red-400"
                  }`}
                />

                {/* ✅ Live Color Preview */}
                <div
                  className="h-10 w-10 rounded border border-gray-300"
                  style={{
                    backgroundColor: isValidHex(color) ? color : "#ffffff",
                  }}
                />
              </div>

              {/* ✅ Validation message */}
              {!isValidHex(color) && color.length > 0 && (
                <p className="text-xs text-red-500">
                  Enter a valid hex color (e.g. #FF5733)
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                className="mt-1 block w-full border rounded px-3 py-2"
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                  className="mt-1 block w-full border rounded px-3 py-2"
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
                className="mt-1 block w-full border rounded px-3 py-2"
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
              disabled={isPending}
              className={`px-4 py-2 rounded-lg bg-purple-600 text-white flex items-center justify-center gap-2 transition ${
                isPending
                  ? "opacity-75 cursor-not-allowed"
                  : "hover:bg-purple-700"
              }`}
            >
              {isPending && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
