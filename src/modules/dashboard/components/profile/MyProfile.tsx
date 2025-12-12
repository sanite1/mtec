import React, { useState } from "react";
import { Mail, Phone, Calendar } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteProfileModal from "./DeleteProfileModal";
import { useDeleteUser, useUserDetails } from "../../lib/api/authOnboarding";
import { getDecodedJwt } from "../../lib/auth";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../lib/utils/formatDate";

export default function ProfilePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const user = getDecodedJwt();
  const { data: userDetails, isLoading } = useUserDetails(user?.id as string);

  const { mutateAsync: deleteUser, isPending: loadingDelete } = useDeleteUser();

  const handleDelete = async () => {
    try {
      await deleteUser(user?.id);
      setShowDeleteModal(false);
      logout();
      navigate("/");
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handlePasswordChange = (
    oldPass: string,
    newPass: string,
    confirmPass: string,
  ) => {
    setShowPasswordModal(false);
    console.log("Password changed:", { oldPass, newPass, confirmPass });
  };

  if (isLoading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  if (!userDetails) {
    return (
      <div className="p-6 text-center text-red-500">
        Could not load user details.
      </div>
    );
  }

  const { firstname, lastname, email, phone, dob } = userDetails;

  const initials =
    `${firstname?.[0] ?? ""}${lastname?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Top Section */}
      <div className="bg-white shadow-lg border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold border-2">
          {initials}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold">
            {firstname} {lastname}
          </h2>
          <p className="text-sm text-gray-500">{email}</p>

          <div className="mt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
            <Link to="/profile/edit">
              <button className="px-4 py-2 text-sm rounded-md border text-gray-700 hover:bg-gray-100 transition">
                Edit Profile
              </button>
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="bg-white shadow-md border rounded-2xl">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Personal Information</h3>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 p-6">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="font-medium">{firstname}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="font-medium">{lastname}</p>
          </div>

          <div className="">
            <div className="flex items-center gap-2">
              {/* <Calendar className="h-4 w-4 text-gray-500" /> */}
              <span className="text-sm text-gray-500">Date of Birth</span>
            </div>
            <p className="font-medium">{(dob && formatDate(dob)) || "—"}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 p-6">
          <div className="">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Phone</span>
            </div>
            <span className="ml-auto font-medium">{phone || "—"}</span>
          </div>

          <div className="">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Email</span>
            </div>
            <span className="ml-auto font-medium">{email}</span>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white shadow-md border rounded-2xl">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Security</h3>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-500">
            Keep your account secure by updating your password regularly.
          </p>
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Modals */}
      {showDeleteModal && (
        <DeleteProfileModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          loading={loadingDelete}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          // onSave={handlePasswordChange}
        />
      )}
    </div>
  );
}
