import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-800">
          {/* Navbar / Branding */}
          <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-700">SmallBus</h1>
              <nav className="flex gap-6">
                <Link
                  to="/signup"
                  className="text-blue-600 font-medium hover:text-blue-800 transition"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="text-green-600 font-medium hover:text-green-800 transition"
                >
                  Login
                </Link>
              </nav>
            </div>
          </header>


          <main className="container mx-auto px-6 py-10">
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </Router>
      <Toaster richColors position="top-right" />
    </>
  );
}
