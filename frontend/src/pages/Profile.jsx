import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import ProfilePicture from "../components/ProfilePicture";
import { FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash, FaLock, FaUser, FaEnvelope } from "react-icons/fa";

const Profile = () => {
  const { updateProfile, updatePassword } = useAuthStore();
  const { authUser, checkAuth } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [passwordView, setPasswordView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: authUser?.name || "",
    email: authUser?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authUser) {
      setFormData(prev => ({
        ...prev,
        name: authUser.name || "",
        email: authUser.email || "",
      }));
    }
  }, [authUser]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePassword(formData);
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(prev => ({
      ...prev,
      name: authUser?.name || "",
      email: authUser?.email || "",
    }));
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <FaUser className="text-white" />
            <span className="text-white font-medium">Account Settings</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-blue-100 text-lg">Manage your account information and preferences</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="mb-6">
                <ProfilePicture />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{authUser?.name}</h3>
              <p className="text-gray-600 mb-4">{authUser?.email}</p>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Active Account
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <FaUser className="text-blue-600" />
                    Profile Information
                  </h2>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <FaEdit />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!editing}
                          className={`w-full pl-10 pr-4 py-3 border rounded-xl transition-all duration-300 ${
                            editing
                              ? "border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white"
                              : "border-gray-200 bg-gray-50"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          name="email"
                          value={formData.email}
                          disabled
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600"
                          placeholder="Email cannot be changed"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Email address cannot be modified for security reasons</p>
                    </div>
                  </div>

                  {editing && (
                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaSave />
                        {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <FaTimes />
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaLock className="text-orange-600" />
                  Security Settings
                </h2>
                <p className="text-sm text-gray-600 mt-1">Update your password to keep your account secure</p>
              </div>

              <div className="p-6">
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type={passwordView ? "text" : "password"}
                          name="currentPassword"
                          placeholder="Enter current password"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordView(!passwordView)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {passwordView ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type={passwordView ? "text" : "password"}
                          name="newPassword"
                          placeholder="Enter new password"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Password should be at least 8 characters long</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      disabled={loading || !formData.currentPassword || !formData.newPassword}
                      className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaLock />
                      {loading ? "Updating..." : "Update Password"}
                    </button>

                    <label className="flex items-center gap-2 text-sm cursor-pointer group">
                      <input
                        type="checkbox"
                        onChange={() => setPasswordView(!passwordView)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
                        Show passwords
                      </span>
                    </label>
                  </div>
                </form>
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Security Tips</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Use a strong password with at least 8 characters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Include uppercase, lowercase, numbers, and special characters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Don't share your password with anyone
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  Update your password regularly for better security
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;