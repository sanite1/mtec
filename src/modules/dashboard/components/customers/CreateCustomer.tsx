// CreateCustomer.tsx
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateCustomer } from "../../lib/api/customer";
import { toast } from "sonner";

/**
 * Zod Schema
 */
const customerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  // instagram: z.string().optional(),
  additionalInfo: z.string().optional(),
  // groupId: z.string().optional(),
  shipping: z.object({
    address: z.string().min(1, "Address is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "Zip is required"),
  }),
  newsletterSubscribed: z.boolean().default(false),
  billing: z.object({
    sameAsShipping: z.boolean().default(false),
    address: z.string().optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
  }),
});

type CustomerForm = z.infer<typeof customerSchema>;

export default function CreateCustomer() {
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([
    { id: "g1", name: "VIP Customers" },
    { id: "g2", name: "Regular Customers" },
  ]);
  const [newGroupModalOpen, setNewGroupModalOpen] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CustomerForm>({
    resolver: zodResolver(customerSchema) as any,
    defaultValues: {
      firstName: "",
      lastName: "",
      shipping: { country: "" },
      billing: { country: "", sameAsShipping: false },
    },
  });

  const sameAsShipping = watch("billing.sameAsShipping");
  const { mutateAsync: createCustomer, isPending } = useCreateCustomer();

  const onSubmit: SubmitHandler<CustomerForm> = async (data: CustomerForm) => {
    try {
      await createCustomer(data);
      navigate("/customers");
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleClear = () => reset();

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => navigate("/customers")}
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 mr-3"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold">Add New Customer</h1>
        </div>

        <form
          id="create-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Customer Details */}
          <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Customer Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium">
                  First Name *
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium">Last Name *</label>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                      placeholder="+234..."
                    />
                  )}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                      placeholder="example@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Instagram */}
              {/* <div>
                <label className="block text-sm font-medium">Instagram</label>
                <div className="flex items-center">
                  <span className="px-2 bg-gray-100 border border-r-0 rounded-l">
                    @
                  </span>
                  <Controller
                    name="instagram"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="mt-1 w-full border rounded-r px-3 py-2"
                      />
                    )}
                  />
                </div>
              </div> */}

              {/* Additional Info */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">
                  Additional Info
                </label>
                <Controller
                  name="additionalInfo"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                      rows={3}
                    />
                  )}
                />
              </div>
            </div>
          </section>

          {/* Customer Group */}
          {/* <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Select Customer Group</h2>
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
          </section> */}

          {/* Shipping */}
          <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Shipping Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Address</label>
                <Controller
                  name="shipping.address"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Country *</label>
                <Controller
                  name="shipping.country"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  )}
                />
                {errors.shipping?.country && (
                  <p className="text-red-500 text-sm">
                    {errors.shipping.country.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">State</label>
                <Controller
                  name="shipping.state"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">City</label>
                <Controller
                  name="shipping.city"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Zip Code</label>
                <Controller
                  name="shipping.zip"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="mt-1 w-full border rounded px-3 py-2"
                    />
                  )}
                />
              </div>
            </div>
          </section>

          {/* Billing */}
          <section className="border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Billing Address</h2>
            <label className="flex items-center gap-2 mb-3">
              <Controller
                name="billing.sameAsShipping"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={!!field.value} // ensure boolean
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                )}
              />
              <span className="text-sm">Same as shipping</span>
            </label>
            {!sameAsShipping && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">Address</label>
                  <Controller
                    name="billing.address"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Country *</label>
                  <Controller
                    name="billing.country"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                    )}
                  />
                  {errors.billing?.country && (
                    <p className="text-red-500 text-sm">
                      {errors.billing.country.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">State</label>
                  <Controller
                    name="billing.state"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">City</label>
                  <Controller
                    name="billing.city"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Zip Code</label>
                  <Controller
                    name="billing.zip"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="mt-1 w-full border rounded px-3 py-2"
                      />
                    )}
                  />
                </div>
              </div>
            )}
          </section>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Newsletter</h3>
            <label className="flex items-center gap-2 mb-3">
              <Controller
                name="newsletterSubscribed"
                control={control}
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
              <span className="text-sm">Subscribe to our newletters.</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/customers")}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2 border rounded"
              >
                Clear Fields
              </button>
            </div>
            <button
              type="submit"
              form="create-form"
              className={`px-4 py-2 rounded bg-purple-600 text-white flex items-center justify-center gap-2 transition ${
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
              {isPending ? "Saving..." : "Create Customer"}
            </button>
          </div>
        </form>
      </div>

      {/* New Group Modal (simplified example) */}
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
                    "newGroupName",
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
