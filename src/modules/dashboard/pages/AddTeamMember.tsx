// pages/team/AddTeamMember.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@headlessui/react";
import { Save } from "lucide-react";

// ----------------- Schema -----------------
const permissionSchema = z.object({
  view: z.boolean().default(false),
  manage: z.boolean().default(false),
  delete: z.boolean().default(false),
});

const teamMemberSchema = z.object({
  staffRole: z.string().min(1, "Staff role is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(1, "Please select a location"),
  permissions: z.object({
    products: permissionSchema,
    orders: permissionSchema,
    customers: permissionSchema,
    transactions: permissionSchema,
    staff: permissionSchema,
  }),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

// ----------------- Switch Component -----------------
interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <Switch
    checked={checked}
    onChange={onChange}
    className={`${
      checked ? "bg-purple-600" : "bg-gray-300"
    } relative inline-flex h-6 w-11 items-center rounded-full transition`}
  >
    <span
      className={`${
        checked ? "translate-x-6" : "translate-x-1"
      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
    />
  </Switch>
);

// ----------------- Main Page -----------------
const AddTeamMember: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema) as any,
    defaultValues: {
      permissions: {
        products: { view: false, manage: false, delete: false },
        orders: { view: false, manage: false, delete: false },
        customers: { view: false, manage: false, delete: false },
        transactions: { view: false, manage: false, delete: false },
        staff: { view: false, manage: false, delete: false },
      },
    },
  });

  const onSubmit = (data: TeamMemberFormData) => {
    console.log("Team Member Data:", data);
  };

  const permissions = watch("permissions");

  return (
    <div className="">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Add Team Member
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Staff Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Staff Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium">Staff Role</label>
                <input
                  {...register("staffRole")}
                  placeholder="e.g. Manager, Sales Rep"
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.staffRole && (
                  <p className="text-red-500 text-sm">
                    {errors.staffRole.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input
                  {...register("firstName")}
                  placeholder="Enter first name"
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  {...register("lastName")}
                  placeholder="Enter last name"
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  {...register("email")}
                  placeholder="Enter email"
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  {...register("phone")}
                  placeholder="Enter phone number"
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Assign Location
                </label>
                <select
                  {...register("location")}
                  className="mt-1 block w-full border rounded px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">— Select Location —</option>
                  <option value="HQ">HQ</option>
                  <option value="Branch A">Branch A</option>
                  <option value="Branch B">Branch B</option>
                </select>
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Permissions
            </h3>
            <div className="space-y-6">
              {Object.keys(permissions).map((feature) => (
                <div key={feature} className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 capitalize mb-3">
                    {feature}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(["view", "manage", "delete"] as const).map((perm) => (
                      <div
                        key={perm}
                        className="flex items-center justify-between md:justify-start"
                      >
                        <span className="text-sm text-gray-600 capitalize mr-4">
                          {perm}
                        </span>
                        <Toggle
                          checked={
                            permissions[feature as keyof typeof permissions][
                              perm
                            ]
                          }
                          onChange={(val) =>
                            setValue(
                              `permissions.${feature}.${perm}` as any,
                              val,
                              { shouldValidate: true },
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700"
            >
              <Save size={18} />
              Save Team Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMember;
