// components/newsletter/NewsletterSidebar.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload } from "lucide-react";

// ----------------- Schema -----------------
const newsletterSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  subtext: z.string().min(1, "Subtext is required"),
  img: z
    .any()
    .refine((file) => file instanceof File || file === null, "Invalid file")
    .optional(),
});

export type NewsletterForm = z.infer<typeof newsletterSchema>;

interface NewsletterSidebarProps {
  initialData?: { headline: string; subtext: string; img?: File | null };
  onClose: () => void;
  onSave: (updated: NewsletterForm) => void;
}

// ----------------- Component -----------------
export default function NewsletterSidebar({
  initialData = { headline: "", subtext: "", img: null },
  onClose,
  onSave,
}: NewsletterSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      headline: initialData.headline,
      subtext: initialData.subtext,
      img: initialData.img || null,
    },
  });

  const imgFile = watch("img") as File | null;
  const [preview, setPreview] = useState<string | null>(
    imgFile ? URL.createObjectURL(imgFile) : null
  );

  const onSubmit = (data: NewsletterForm) => {
    console.log("Newsletter Data:", data);
    onSave(data);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setValue("img", file, { shouldValidate: true });
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="flex-1 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="w-full sm:w-1/3 bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-semibold">Newsletter Popup</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="newsletter-form"
        >
          {/* Headline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Headline
            </label>
            <Controller
              name="headline"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter newsletter headline"
                  className={`w-full border rounded px-3 py-2 ${
                    errors.headline ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.headline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.headline.message}
              </p>
            )}
          </div>

          {/* Subtext */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtext
            </label>
            <Controller
              name="subtext"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  placeholder="Enter supporting text for the popup"
                  className={`w-full border rounded px-3 py-2 ${
                    errors.subtext ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.subtext && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subtext.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="newsletter-img-upload"
            />
            <label
              htmlFor="newsletter-img-upload"
              className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-4 h-4" /> Choose File
            </label>
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-auto h-32 object-cover rounded"
                />
              </div>
            )}
            {errors.img && (
              <p className="text-red-500 text-sm mt-1">
                {errors.img.message as string}
              </p>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-3 bg-white sticky bottom-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-50"
            type="button"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="newsletter-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Newsletter
          </button>
        </div>
      </div>
    </div>
  );
}
