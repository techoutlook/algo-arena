import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contactus", label: "Contact Us" },
    { to: "/codeplayground", label: "Code Playground" },
  ];

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      if (uid) {
        setIsLoggedIn(true);
      }
    }
  });

  return (
    <nav className="bg-gray-900 shadow-lg fixed top-0 left-0 w-full z-50 h-20 border-b border-gray-800">
      <div className="flex items-center justify-between py-4 px-8 relative">
        {/* Logo (Always Visible) */}
        <Link to="/" className="text-white font-bold text-2xl relative z-50">
          Algo<span className="text-green-500">Arena</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`py-2 px-4 text-lg font-medium rounded-xl transition duration-300 ${
                location.pathname === to
                  ? "text-green-400 bg-gray-800"
                  : "text-white hover:text-green-400"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Auth Button/Profile - Desktop */}
          {isLoggedIn && isLoggedIn ? (
            <Link
              to="/profile"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700 flex items-center"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/auth"
              className={`flex items-center gap-2 py-2 px-4 text-lg font-medium rounded-xl transition duration-300 ml-2 ${
                location.pathname === "/auth"
                  ? "text-green-400 bg-gray-800"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <LogIn size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button (Only Shows When Menu is Closed) */}
        {!isOpen && (
          <button
            className="md:hidden text-white relative z-50 focus:outline-none"
            onClick={toggleMenu}
          >
            <Menu size={28} />
          </button>
        )}
      </div>

      {/* Mobile Menu (Slides from Right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col items-center py-10 space-y-6`}
      >
        {/* Close Button inside Menu */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleMenu}
        >
          <X size={28} />
        </button>

        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`py-2 text-xl font-medium transition duration-300 ${
              location.pathname === to
                ? "text-green-400"
                : "text-white hover:text-green-400"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        ))}

        {/* Auth Button - Mobile */}
        <Link
          to="/auth"
          className={`flex items-center gap-2 py-2 px-6 text-xl font-medium rounded-xl transition duration-300 ${
            location.pathname === "/auth"
              ? "text-green-400"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <LogIn size={22} />
          <span>Login</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
