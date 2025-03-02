import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, LogIn, User } from "lucide-react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contactus", label: "Contact Us" },
    { to: "/codeplayground", label: "Code Playground" },
  ];

  return (
    <nav className="bg-gray-900 shadow-lg fixed top-0 left-0 w-full z-50 border-b border-gray-800">
      <div className="flex items-center justify-between py-3 sm:py-4 md:py-4 px-4 lg:px-8 relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-bold text-xl md:text-2xl relative z-50"
        >
          Algo<span className="text-green-500">Arena</span>
        </Link>

        {/* Desktop & Tablet Menu */}
        <div className="hidden md:flex items-center gap-2 lg:gap-6 flex-wrap">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`py-1.5 sm:py-2 px-2 lg:px-4 text-sm lg:text-lg font-medium rounded-xl transition duration-300 ${
                location.pathname === to
                  ? "text-green-400 bg-gray-800"
                  : "text-white hover:text-green-400"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Auth/Profile Section - With Skeleton Loader */}
          {loading ? (
            <div className="w-20 lg:w-26 h-8 sm:h-9 md:h-10 bg-gray-700 animate-pulse rounded-xl"></div>
          ) : isLoggedIn ? (
            <Link
              to="/profile"
              className="flex items-center gap-1 lg:gap-2 py-1.5 sm:py-2 px-3 lg:px-4 text-sm lg:text-lg font-medium rounded-xl bg-white text-gray-900 hover:bg-gray-200 transition duration-300 shadow-sm border"
            >
              <User size={18} className="hidden sm:block" />
              <span>Profile</span>
            </Link>
          ) : (
            <Link
              to="/auth"
              className={`flex items-center gap-1 lg:gap-2 py-1.5 sm:py-2 px-3 lg:px-4 text-sm lg:text-lg font-medium rounded-xl transition duration-300 ml-1 lg:ml-2 ${
                location.pathname === "/auth"
                  ? "text-green-400 bg-gray-800"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              <LogIn size={18} className="hidden sm:block" />
              <span>Login</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        {!isOpen && (
          <button
            className="md:hidden text-white relative z-50 focus:outline-none"
            onClick={toggleMenu}
          >
            <Menu size={24} className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col items-center py-10 space-y-6`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white"
          onClick={toggleMenu}
        >
          <X size={24} className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>

        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`py-2 text-base sm:text-lg font-medium transition duration-300 ${
              location.pathname === to
                ? "text-green-400"
                : "text-white hover:text-green-400"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        ))}

        {/* Mobile Auth/Profile Section - With Skeleton */}
        {loading ? (
          <div className="w-32 sm:w-36 h-10 sm:h-12 bg-gray-700 animate-pulse rounded-xl"></div>
        ) : isLoggedIn ? (
          <Link
            to="/profile"
            className="flex items-center gap-2 py-2 px-5 sm:px-6 text-base sm:text-lg font-medium rounded-xl bg-white text-gray-900 hover:bg-gray-200 transition duration-300 shadow-sm border"
            onClick={() => setIsOpen(false)}
          >
            <User size={20} className="sm:h-5 sm:w-5" />
            <span>Profile</span>
          </Link>
        ) : (
          <Link
            to="/auth"
            className={`flex items-center gap-2 py-2 px-5 sm:px-6 text-base sm:text-lg font-medium rounded-xl transition duration-300 ${
              location.pathname === "/auth"
                ? "text-green-400"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <LogIn size={20} className="sm:h-5 sm:w-5" />
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
