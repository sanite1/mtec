// components/settings/WhatsAppSidebar.tsx
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";

// ✅ Schema
const whatsappSchema = z.object({
  number: z
    .string()
    .min(10, "WhatsApp number must be at least 10 digits")
    .max(14, "WhatsApp number cannot exceed 14 digits")
    .regex(/^\d+$/, "WhatsApp number must be numeric"),
});

export type WhatsAppForm = z.infer<typeof whatsappSchema>;

interface WhatsAppSidebarProps {
  initialData?: { number: string };
  onClose: () => void;
  onSave: (updated: WhatsAppForm) => void;
}

// ✅ Component
export default function WhatsAppSidebar({
  initialData,
  onClose,
  onSave,
}: WhatsAppSidebarProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WhatsAppForm>({
    resolver: zodResolver(whatsappSchema),
    defaultValues: {
      number: initialData?.number || "",
    },
  });

  const onSubmit = (data: WhatsAppForm) => {
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
          <h2 className="text-2xl font-semibold">WhatsApp Settings</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id="whatsapp-form"
        >
          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp Number
            </label>
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="tel"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.number ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter WhatsApp number (e.g. 2348012345678)"
                  maxLength={14}
                />
              )}
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.number.message}
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
            form="whatsapp-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
