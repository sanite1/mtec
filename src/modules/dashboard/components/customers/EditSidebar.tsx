// EditSidebar.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, FolderPlus } from "lucide-react";

// ----------------- Schema -----------------
const customerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  instagram: z.string().optional(),
  additionalInfo: z.string().optional(),
  groupId: z.string().optional(),
  shipping: z.object({
    address: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
  }),
  billing: z.object({
    sameAsShipping: z.boolean().default(false),
    address: z.string().optional(),
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
  }),
});

type CustomerForm = z.infer<typeof customerSchema>;

interface EditSidebarProps {
  customer: CustomerForm;
  onClose: () => void;
  onSave: (updatedCustomer: CustomerForm) => void;
}

// ----------------- Component -----------------
export default function EditSidebar({
  customer,
  onClose,
  onSave,
}: EditSidebarProps) {
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([
    { id: "g1", name: "VIP Customers" },
    { id: "g2", name: "Regular Customers" },
  ]);
  const [newGroupModalOpen, setNewGroupModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema) as any,
    defaultValues: customer,
  });

  const sameAsShipping = watch("billing.sameAsShipping");

  const onSubmit = (data: CustomerForm) => {
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
          <h2 className="text-2xl font-semibold">Edit Customer</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Customer Details */}
          <section>
            <h3 className="font-semibold mb-3">Customer Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="First Name *"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}

              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Last Name *"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Phone"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Email"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <Controller
                name="instagram"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Instagram @username"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />

              <Controller
                name="additionalInfo"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={3}
                    placeholder="Additional Info"
                    className="w-full border rounded px-3 py-2 col-span-2"
                  />
                )}
              />
            </div>
          </section>

          {/* Customer Group */}
          <section>
            <h3 className="font-semibold mb-3">Customer Group</h3>
            <div className="flex gap-2">
              <Controller
                name="groupId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">— None —</option>
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              <button
                type="button"
                onClick={() => setNewGroupModalOpen(true)}
                className="px-3 py-2 border rounded bg-purple-50 text-purple-600 flex items-center gap-1"
              >
                <FolderPlus size={16} /> New
              </button>
            </div>
          </section>

          {/* Shipping */}
          <section>
            <h3 className="font-semibold mb-3">Shipping Address</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Controller
                name="shipping.address"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Address"
                    className="w-full border rounded px-3 py-2 md:col-span-2"
                  />
                )}
              />
              <Controller
                name="shipping.country"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Country *"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />
              <Controller
                name="shipping.state"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="State"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />
              <Controller
                name="shipping.city"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="City"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />
              <Controller
                name="shipping.zip"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Zip Code"
                    className="w-full border rounded px-3 py-2"
                  />
                )}
              />
            </div>
          </section>

          {/* Billing */}
          <section>
            <h3 className="font-semibold mb-3">Billing Address</h3>
            <label className="flex items-center gap-2 mb-3">
              <Controller
                name="billing.sameAsShipping"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <span className="text-sm">Same as shipping</span>
            </label>

            {!sameAsShipping && (
              <div className="grid md:grid-cols-2 gap-4">
                <Controller
                  name="billing.address"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Address"
                      className="w-full border rounded px-3 py-2 md:col-span-2"
                    />
                  )}
                />
                <Controller
                  name="billing.country"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Country *"
                      className="w-full border rounded px-3 py-2"
                    />
                  )}
                />
                <Controller
                  name="billing.state"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="State"
                      className="w-full border rounded px-3 py-2"
                    />
                  )}
                />
                <Controller
                  name="billing.city"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="City"
                      className="w-full border rounded px-3 py-2"
                    />
                  )}
                />
                <Controller
                  name="billing.zip"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Zip Code"
                      className="w-full border rounded px-3 py-2"
                    />
                  )}
                />
              </div>
            )}
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
            form="edit-form"
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* New Group Modal */}
      {newGroupModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="font-semibold mb-3">Create New Group</h3>
            <input
              type="text"
              placeholder="Group name"
              className="w-full border rounded px-3 py-2 mb-4"
              id="newGroupName"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setNewGroupModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById(
                    "newGroupName"
                  ) as HTMLInputElement;
                  if (input.value.trim()) {
                    setGroups((prev) => [
                      ...prev,
                      { id: `g${prev.length + 1}`, name: input.value },
                    ]);
                  }
                  setNewGroupModalOpen(false);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
