// components/settings/ReturnPolicySidebar.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// ----------------- Schema -----------------
const returnPolicySchema = z.object({
  content: z.string().min(1, "Return policy content is required"),
});

export type ReturnPolicyForm = z.infer<typeof returnPolicySchema>;

interface ReturnPolicySidebarProps {
  initialData?: { content: string };
  onClose: () => void;
  onSave: (updated: ReturnPolicyForm) => void;
}

// ----------------- Component -----------------
export default function ReturnPolicySidebar({
  initialData = { content: "" },
  onClose,
  onSave,
}: ReturnPolicySidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReturnPolicyForm>({
    resolver: zodResolver(returnPolicySchema),
    defaultValues: {
      content: initialData.content,
    },
  });

  const onSubmit = (data: ReturnPolicyForm) => {
    console.log("Return Policy:", data);
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
          <h2 className="text-2xl font-semibold">Return Policy</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="edit-return-policy-form"
        >
          {/* Return Policy Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Return Policy Content
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
                  placeholder="Write your return policy details here..."
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
            form="edit-return-policy-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
