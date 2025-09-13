import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const navigate = useNavigate();
  // Initial values (could come from API or props)
  const [formData, setFormData] = useState({
    firstName: "Collins",
    middleName: "",
    lastName: "Sanni",
    dob: "",
    phone: "+2349071423222",
    email: "csanni52@gmail.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
    navigate("/profile");
    // API call to update profile can go here
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg border rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/profile"
              className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
