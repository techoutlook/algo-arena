import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaTelegram,
  FaTwitter,
  FaCode,
  FaFolderOpen,
  FaHome,
  FaBlogger,
  FaEnvelope,
  FaPlay,
  FaLock,
  FaFileAlt,
  FaCookieBite,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-white font-bold text-xl">
                Algo<span className="text-green-500">Arena</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Master algorithms and ace coding interviews with our progressive
              learning platform.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://web.telegram.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaTelegram />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-xl"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Problem Categories */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <FaFolderOpen className="mr-2" /> Problem Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/Codeplayground"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Easy Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/Codeplayground"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Medium Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/Codeplayground"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Hard Problems
                </Link>
              </li>
              <li>
                <Link
                  to="/Codeplayground"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <FaCode className="mr-2" /> Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center"
                >
                  <FaHome className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center"
                >
                  <FaBlogger className="mr-2" /> Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/contactus"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center"
                >
                  <FaEnvelope className="mr-2" /> Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/codeplayground"
                  className="text-gray-400 hover:text-green-500 transition-colors flex items-center"
                >
                  <FaPlay className="mr-2" /> Code Playground
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-white font-medium mb-2">
                Stay updated with AlgoArena
              </h4>
              <p className="text-sm text-gray-400">
                Get notified about new problems and features
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-2 sm:mb-0">
              © {currentYear} AlgoArena. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/contactus"
                className="text-sm text-gray-500 hover:text-gray-400 transition-colors flex items-center"
              >
                <FaLock className="mr-1" /> Privacy
              </Link>
              <Link
                to="/contactus"
                className="text-sm text-gray-500 hover:text-gray-400 transition-colors flex items-center"
              >
                <FaFileAlt className="mr-1" /> Terms
              </Link>
              <Link
                to="/contactus"
                className="text-sm text-gray-500 hover:text-gray-400 transition-colors flex items-center"
              >
                <FaCookieBite className="mr-1" /> Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
