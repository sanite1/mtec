// components/settings/SocialMediaSidebar.tsx
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, Trash } from "lucide-react";

// ----------------- Schema -----------------
const platforms = ["Instagram", "Facebook", "Twitter", "WhatsApp"] as const;

const socialMediaSchema = z.object({
  socialMedia: z
    .array(
      z.object({
        platform: z.enum(platforms).refine((val) => platforms.includes(val), {
          message: "Select a valid platform",
        }),
        handle: z.string().min(1, "Handle is required"),
      }),
    )
    .refine(
      (arr) => {
        const unique = new Set(arr.map((s) => s.platform));
        return unique.size === arr.length;
      },
      { message: "Duplicate platforms are not allowed" },
    ),
});

export type SocialMediaForm = z.infer<typeof socialMediaSchema>;

interface SocialMediaSidebarProps {
  initialData?: Partial<SocialMediaForm>;
  onSave: (data: SocialMediaForm) => void;
  onClose: () => void;
}

// ----------------- Component -----------------
export default function SocialMediaSidebar({
  initialData,
  onSave,
  onClose,
}: SocialMediaSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialMediaForm>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      socialMedia: initialData?.socialMedia || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMedia",
  });

  const onSubmit = (data: SocialMediaForm) => {
    console.log(data);

    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Sidebar */}
      <div className="w-full sm:w-1/3 bg-white h-full shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-2xl font-semibold">Edit Social Media</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="social-media-form"
        >
          <section>
            <h3 className="font-semibold mb-3">Social Media Handles</h3>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center gap-3 border p-3 rounded"
                >
                  {/* Platform Select */}
                  <Controller
                    name={`socialMedia.${index}.platform`}
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="border rounded px-2 py-1 w-1/3"
                      >
                        <option value="">Select</option>
                        {platforms.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    )}
                  />

                  {/* Handle Input */}
                  <Controller
                    name={`socialMedia.${index}.handle`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder="@yourhandle"
                        className="flex-1 border rounded px-2 py-1"
                      />
                    )}
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              ))}

              {/* Global duplicate error */}
              {errors.socialMedia?.message && (
                <p className="text-red-500 text-sm">
                  {errors.socialMedia?.message as string}
                </p>
              )}

              {/* Add Button */}
              {fields.length < platforms.length && (
                <button
                  type="button"
                  onClick={() => append({ platform: "" as any, handle: "" })}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-800"
                >
                  <Plus size={18} />
                  Add Social Media
                </button>
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
            form="social-media-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
