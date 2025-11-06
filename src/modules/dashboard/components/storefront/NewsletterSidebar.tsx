// components/newsletter/NewsletterSidebar.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Trash, ImageIcon } from "lucide-react";

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
    imgFile ? URL.createObjectURL(imgFile) : null,
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
  const [file, setFile] = useState<File | null>(null);

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB

  const handleFile = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Image must be under 2MB");
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
    setValue("img", file, { shouldValidate: true });
  };

  const onDropFile = (files: FileList | null) => {
    if (files && files[0]) handleFile(files[0]);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setValue("img", file, { shouldValidate: true });
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
          <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-2">Newsletter Image</h2>
            <p className="text-sm text-gray-500 mb-3">
              Drag & drop or click to upload
            </p>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onDropFile(e.dataTransfer.files);
              }}
            >
              <div
                className="border-dashed cursor-pointer border-2 text-gray-400 border-gray-200 hover:border-black hover:text-black rounded-md p-6 flex items-center justify-between gap-4"
                onClick={() =>
                  document.getElementById("newsletter-file")?.click()
                }
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <ImageIcon />
                  </div>
                  <div>
                    <div className="font-medium text-black">Upload image</div>
                    <div className="text-sm">PNG, JPG. Max 2MB</div>
                  </div>
                </div>

                <input
                  id="newsletter-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onDropFile(e.target.files)}
                />
                <div className="text-sm">Click to select</div>
              </div>

              {errors.img && (
                <div className="my-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg">
                  {errors.img.message as string}
                </div>
              )}

              {/* Preview */}
              {preview && (
                <div className="mt-4 relative w-40 h-40 border rounded overflow-hidden">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                    title="Remove"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              )}
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
