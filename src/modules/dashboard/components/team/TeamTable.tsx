// components/team/TeamTable.tsx
import React, { useState } from "react";
import { DataTable } from "../../utils/data-table";
import { Edit, Trash } from "lucide-react";
import EmptyState from "../../utils/EmptyState";
import teamEmpty from "../../assets/boxEmpty.png";
import { z } from "zod";
import DeleteTeamMemberModal from "./DeleteTeamMemberModal";
import TeamFormSidebar from "./TeamFormSidebar";

// ----------------- Schema -----------------
export const teamMemberSchema = z.object({
  id: z.string().optional(),
  staffRole: z.string().min(1, "Role is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  dateJoined: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  status: z.string(),
  permissions: z.object({
    products: z.object({
      view: z.boolean(),
      manage: z.boolean(),
      delete: z.boolean(),
    }),
    orders: z.object({
      view: z.boolean(),
      manage: z.boolean(),
      delete: z.boolean(),
    }),
    customers: z.object({
      view: z.boolean(),
      manage: z.boolean(),
      delete: z.boolean(),
    }),
    transactions: z.object({
      view: z.boolean(),
      manage: z.boolean(),
      delete: z.boolean(),
    }),
    staff: z.object({
      view: z.boolean(),
      manage: z.boolean(),
      delete: z.boolean(),
    }),
  }),
});

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

// ----------------- Mock Team -----------------
export const mockTeam: TeamMemberFormData[] = [
  {
    id: "1",
    staffRole: "Admin",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phone: "08012345678",
    location: "Lagos",
    dateJoined: "2025-01-15",
    status: "active",
    permissions: {
      products: { view: true, manage: true, delete: false },
      orders: { view: true, manage: true, delete: false },
      customers: { view: true, manage: true, delete: false },
      transactions: { view: true, manage: false, delete: false },
      staff: { view: true, manage: true, delete: true },
    },
  },
  {
    id: "2",
    staffRole: "Manager",
    firstName: "John",
    lastName: "Smith",
    email: "john@example.com",
    phone: "08098765432",
    location: "Abuja",
    dateJoined: "2025-03-02",
    status: "inactive",
    permissions: {
      products: { view: true, manage: false, delete: false },
      orders: { view: true, manage: true, delete: false },
      customers: { view: true, manage: false, delete: false },
      transactions: { view: true, manage: false, delete: false },
      staff: { view: false, manage: false, delete: false },
    },
  },
];

// ----------------- Fetch Function -----------------
const fetchTeam = async (params: {
  page?: number;
  perPage?: number;
  search?: string;
}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { page = 1, perPage = 10, search } = params;
  let filtered = mockTeam;

  // 🔍 Search filter
  if (search && search.trim() !== "") {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.lastName.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.staffRole.toLowerCase().includes(query),
    );
  }

  // 📄 Pagination
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return {
    data: paginated,
    meta: {
      total: filtered.length,
      page,
      perPage,
    },
  };
};

// ----------------- Component -----------------
const TeamTable = () => {
  const [selected, setSelected] = useState<TeamMemberFormData[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<TeamMemberFormData | null>(
    null,
  );
  const [editTarget, setEditTarget] = useState<TeamMemberFormData | null>(null);

  const teamColumns = [
    { accessorKey: "dateJoined", header: "Date Joined" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "role", header: "Role" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: any) => {
        const member = row.original as TeamMemberFormData;
        return (
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              member.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {member.status}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }: any) => {
        const member = row.original as TeamMemberFormData;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => setEditTarget(member)}
              className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => setDeleteTarget(member)}
              className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition"
            >
              <Trash size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  const emptyState = (
    <EmptyState
      image={teamEmpty}
      message="No team members found"
      subtext="When you add team members, they’ll appear here."
    />
  );

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <DataTable<TeamMemberFormData, unknown>
        columns={teamColumns}
        fetchData={fetchTeam}
        totalItems={mockTeam.length}
        tableKey="team"
        onRowClick={(member) => console.log("Clicked team member:", member)}
        setSelected={setSelected}
        hasTab={false}
        emptyState={emptyState}
      />

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteTeamMemberModal
          memberName={`${deleteTarget.firstName} ${deleteTarget.lastName}`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            console.log("Deleting:", deleteTarget);
            setDeleteTarget(null);
          }}
        />
      )}

      {/* Edit Sidebar */}
      {editTarget && (
        <TeamFormSidebar
          initialData={editTarget} // ✅ renamed prop to match expected interface
          onClose={() => setEditTarget(null)}
          onSave={(updated) => {
            console.log("Updated:", updated);
            setEditTarget(null);
          }}
        />
      )}

      {/* Selection info */}
      {selected.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-800">{selected.length} member(s) selected</p>
        </div>
      )}
    </div>
  );
};

export default TeamTable;
