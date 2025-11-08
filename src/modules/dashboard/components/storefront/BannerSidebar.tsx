// BannerSidebar.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ImageIcon, Trash } from "lucide-react";

// ----------------- Schema -----------------
const bannerSchema = z.object({
  title: z.string().optional(),
  subtext: z.string().optional(),
  image: z
    .any()
    .refine((file) => file instanceof File || file === null, "Invalid file")
    .optional(),
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
    watch,
    setValue,
  } = useForm<BannerForm>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: initialData?.title || "",
      image: initialData?.image || "",
    },
  });

  const imgFile = watch("image") as File | null;
  const [preview, setPreview] = useState<string | null>(
    imgFile ? URL.createObjectURL(imgFile) : null,
  );

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0] || null;
  //   setValue("image", file, { shouldValidate: true });
  //   setPreview(file ? URL.createObjectURL(file) : null);
  // };

  const onSubmit = (data: BannerForm) => {
    console.log(data);

    onSave(data);
    onClose();
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
    setValue("image", file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
    // onFileSelect(file); // pass file back to parent form
  };

  const onDropFile = (files: FileList | null) => {
    if (files && files[0]) handleFile(files[0]);
  };

  const handleRemove = () => {
    if (file) {
    }
    setFile(null);
    setPreview(null);
    // onFileSelect(null);
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
                <label htmlFor="title">Banner Title</label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Intro title"
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
              <div className="">
                <label htmlFor="subtext">Banner Subtext</label>
                {/* Subtext */}
                <Controller
                  name="subtext"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="A short text below the title"
                      className="w-full border rounded px-3 py-2"
                    />
                  )}
                />
                {errors.subtext && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subtext.message}
                  </p>
                )}
              </div>

              {/* Image URL */}
              <section className="border rounded-lg p-4">
                <h2 className="font-semibold mb-2">Banner Image</h2>
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
                      document.getElementById("banner-file")?.click()
                    }
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <ImageIcon />
                      </div>
                      <div>
                        <div className="font-medium text-black">
                          Upload image
                        </div>
                        <div className="text-sm">PNG, JPG. Max 2MB</div>
                      </div>
                    </div>

                    <input
                      id="banner-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onDropFile(e.target.files)}
                    />
                    <div className="text-sm">Click to select</div>
                  </div>

                  {errors.image && (
                    <div className="my-4 p-3 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg">
                      {errors.image.message as string}
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
