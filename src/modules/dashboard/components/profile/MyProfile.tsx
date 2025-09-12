import React, { useState } from "react";
import { Mail, Phone, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import DeleteModal from "./DeleteProfileModal";

export default function ProfilePage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleDelete = () => {
    setShowDeleteModal(false);
    console.log("Account deleted!");
  };

  const handlePasswordChange = (
    oldPass: string,
    newPass: string,
    confirmPass: string
  ) => {
    setShowPasswordModal(false);
    console.log("Password changed:", { oldPass, newPass, confirmPass });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Top Section */}
      <div className="bg-white shadow-lg border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold border-2">
          CS
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold">Collins Sanni</h2>
          <p className="text-sm text-gray-500">csanni52@gmail.com</p>
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
        <div className="grid sm:grid-cols-2 gap-6 p-6">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="font-medium">Collins</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="font-medium">Sanni</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Date of Birth</span>
            <span className="ml-auto font-medium">—</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Phone</span>
            <span className="ml-auto font-medium">+2349071423222</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">Email</span>
            <span className="ml-auto font-medium">csanni52@gmail.com</span>
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
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSave={handlePasswordChange}
        />
      )}
    </div>
  );
}
