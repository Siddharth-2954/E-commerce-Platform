// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
//   const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   useEffect(() => {
//     setUsername(localStorage.getItem("username") || "Guest");
//   }, []);

//   return (
//     <nav className="bg-green-600 text-white p-4 shadow-lg">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
//           Store
//         </h1>

//         {/* Hamburger Menu for Mobile */}
//         <button
//           className="block md:hidden text-white focus:outline-none"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>

//         {/* Navigation Links */}
//         <div
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } md:flex flex-col md:flex-row items-center gap-6`}
//         >
//           <button onClick={() => navigate("/products")} className="hover:underline">
//             Products
//           </button>
//           <button onClick={() => navigate("/orders")} className="hover:underline">
//             Orders Placed
//           </button>
//           <button onClick={() => navigate("/reviews")} className="hover:underline">
//             Reviews
//           </button>
//           <button onClick={() => navigate("/support")} className="hover:underline">
//             Support
//           </button>
//           <button onClick={() => navigate("/cart")} className="hover:underline">
//             Cart
//           </button>
//         </div>

//         {/* User Info and Logout */}
//         <div className="hidden md:flex items-center gap-4">
//           <span className="font-medium">{username}</span>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
//           >
//             Logout
//           </button>
//         </div>

//         {/* Mobile Logout */}
//         {isMenuOpen && (
//           <div className="flex md:hidden flex-col items-start mt-4 gap-2">
//             <span className="font-medium">{username}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }









import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem("username") || "Guest");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username") || "Guest");
  }, []);

  // Navigation links
  const navLinks = [
    { label: "Products", path: "/products" },
    { label: "Orders Placed", path: "/orders" },
    { label: "Reviews", path: "/reviews" },
    { label: "Support", path: "/support" },
    { label: "Cart", path: "/cart" },
  ];

  return (
    <nav className="bg-green-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
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
          } md:flex flex-col md:flex-row items-center gap-6`}
        >
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="hover:underline"
            >
              {link.label}
            </button>
          ))}
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

        {/* Mobile Logout */}
        {isMenuOpen && (
          <div className="flex md:hidden flex-col items-start mt-4 gap-2">
            <span className="font-medium">{username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
