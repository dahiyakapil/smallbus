import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const baseUrl = import.meta.env.VITE_BACKEND_URL;  


export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", password: "" });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${baseUrl}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      setForm({ name: res.data.name, password: "" });
    } catch (err) {
      toast.error("Failed to load profile");
      console.error("Profile fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:4000/auth/profile",
        { name: form.name, password: form.password || undefined },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Profile updated!");
      fetchProfile(); 
    } catch (err) {
      toast.error("Update failed");
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete("http://localhost:4000/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || "Account deleted!");
      localStorage.removeItem("token");
      window.location.href = "/signup";
    } catch (err) {
      toast.error("Delete failed");
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!user) return <p className="text-center mt-10">No user data. Please login.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

      <div className="p-4 border rounded-md bg-gray-50 mb-6">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="Update name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Update password (optional)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>

      <button
        onClick={handleDelete}
        className="w-full mt-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Delete Account
      </button>
    </div>
  );
}
