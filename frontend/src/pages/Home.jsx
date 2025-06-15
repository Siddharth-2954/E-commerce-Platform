import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Guest");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
            Store
          </h1>

          {/* Hamburger Menu for Mobile */}
          <button
            className="block md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex flex-col md:flex-row items-center gap-4 md:gap-6`}
          >
            <button onClick={() => navigate("/products")} className="hover:underline">
              Products
            </button>
            <button onClick={() => navigate("/orders")} className="hover:underline">
              Orders Placed
            </button>
            <button onClick={() => navigate("/reviews")} className="hover:underline">
              Reviews
            </button>
            <button onClick={() => navigate("/support")} className="hover:underline">
              Support
            </button>
            <button onClick={() => navigate("/cart")} className="hover:underline">
              Cart
            </button>
          </div>

          {/* User Info and Logout */}
          <div className="hidden md:flex items-center gap-4">
            <span className="font-medium">{username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Logout Button */}
        {isMenuOpen && (
          <div className="flex md:hidden items-center gap-4 mt-4">
            <span className="font-medium">{username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-4 md:p-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to the Store</h1>
          <p className="text-base md:text-lg text-gray-700">
            Explore our products and shop with ease!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center text-sm md:text-base">
          <p>&copy; {new Date().getFullYear()} Store. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
