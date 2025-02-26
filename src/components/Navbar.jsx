import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contacts", label: "Contacts" },
    { to: "/products", label: "Products" },
  ];

  return (
    <nav className="bg-gray-900 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between py-4 px-8 relative">
        {/* Logo (Always Visible) */}
        <Link to="/" className="text-white font-bold text-2xl relative z-50">
          Algo<span className="text-green-500">Arena</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
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
      </div>
    </nav>
  );
}

export default Navbar;
