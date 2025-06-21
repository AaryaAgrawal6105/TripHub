import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import ProfilePicture from "../components/ProfilePicture";

const Profile = () => {
  const { updateProfile, updatePassword } = useAuthStore();
  const { authUser, checkAuth } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = (e) => {

      e.preventDefault();
      updateProfile(formData);

  };

  const handleUpdatePassword = (e) => {
      e.preventDefault();
      updatePassword(formData);
  };

  return (

     


    <div className="max-w-xl mx-auto my-12 p-6 bg-white shadow-md rounded-lg">

     
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Profile</h2>

      <ProfilePicture /> 
  

      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border p-2 rounded mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="w-full border p-2 rounded mt-1 bg-gray-100"
          />
        </div>

        {editing ? (
          <div className="flex gap-4 mt-4">
            <button onClick={handleUpdateProfile} className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button onClick={() => setEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        )}
      </div>

      {/* Password Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-xl font-semibold mb-3">Change Password</h3>
        <input
          type={passwordView ? "text" : "password"}
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <input
          type={passwordView ? "text" : "password"}
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />
        <div className="flex justify-between items-center">
          <button onClick={handleUpdatePassword} className="bg-green-600 text-white px-4 py-2 rounded">
            Update Password
          </button>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" onChange={() => setPasswordView(!passwordView)} />
            Show Passwords
          </label>
        </div>
      </div>
    </div>
  );
};

export default Profile;
