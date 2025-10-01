// components/about/AboutSidebar.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// ----------------- Schema -----------------
const aboutSchema = z.object({
  content: z.string().min(1, "Content is required"),
  title: z.string().min(1, "About title is required"),
});

export type AboutForm = z.infer<typeof aboutSchema>;

interface AboutSidebarProps {
  initialData?: { content: string; title: string };
  onClose: () => void;
  onSave: (updated: AboutForm) => void;
}

// ----------------- Component -----------------
export default function AboutSidebar({
  initialData = { content: "", title: "" },
  onClose,
  onSave,
}: AboutSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AboutForm>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      content: initialData.content,
      title: initialData.title,
    },
  });

  const onSubmit = (data: AboutForm) => {
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
          <h2 className="text-2xl font-semibold">About Us</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="edit-about-form"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="Enter Title"
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
          {/* About Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About Content
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  className="h-60 mb-12"
                  placeholder="Write about your business, product, or team..."
                />
              )}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
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
            form="edit-about-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
