// BannerSidebar.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Image } from "lucide-react";

// ----------------- Schema -----------------
const bannerSchema = z.object({
  title: z.string().min(1, "Banner title is required"),
  image: z
    .string()
    .url("Must be a valid image URL")
    .min(1, "Image URL is required"),
});

type BannerForm = z.infer<typeof bannerSchema>;

interface BannerSidebarProps {
  initialData?: Partial<BannerForm>;
  onSave: (data: BannerForm) => void;
  onClose: () => void;
}

// ----------------- Component -----------------
export default function BannerSidebar({
  initialData,
  onSave,
  onClose,
}: BannerSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BannerForm>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: initialData?.title || "",
      image: initialData?.image || "",
    },
  });

  const onSubmit = (data: BannerForm) => {
    onSave(data);
    onClose();
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
          <h2 className="text-2xl font-semibold">Edit Banner</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="banner-form"
        >
          {/* Banner Details */}
          <section>
            <h3 className="font-semibold mb-3">Banner Details</h3>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Banner Title *"
                      className="w-full border rounded px-3 py-2"
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Image className="text-gray-400" size={18} />
                      <input
                        {...field}
                        placeholder="Image URL *"
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  )}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
          </section>
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
            form="banner-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
