import { useState, memo } from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
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

// Extracted social media links to a separate component
const SocialMediaLinks = () => (
  <div className="flex space-x-4">
    {[
      { icon: <FaTelegram />, url: "https://web.telegram.org/" },
      { icon: <FaInstagram />, url: "https://www.instagram.com/" },
      { icon: <FaTwitter />, url: "https://x.com/" },
      { icon: <FaYoutube />, url: "https://www.youtube.com/" },
    ].map((item, index) => (
      <a
        key={index}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-white text-xl"
        aria-label={`Social media link ${index + 1}`}
      >
        {item.icon}
      </a>
    ))}
  </div>
);

// Extracted problem categories to a separate component
const ProblemCategories = () => (
  <div>
    <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
      <FaFolderOpen className="mr-2" /> Problem Categories
    </h3>
    <ul className="space-y-2">
      {[
        "Easy Problems",
        "Medium Problems",
        "Hard Problems",
        "All Categories",
      ].map((category, index) => (
        <li key={index}>
          <Link
            to="/Codeplayground"
            className="text-gray-400 hover:text-green-500 transition-colors"
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Extracted navigation links to a separate component
const NavigationLinks = () => (
  <div>
    <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
      <FaCode className="mr-2" /> Links
    </h3>
    <ul className="space-y-2">
      {[
        { icon: <FaHome className="mr-2" />, text: "Home", path: "/" },
        { icon: <FaBlogger className="mr-2" />, text: "Blogs", path: "/blogs" },
        {
          icon: <FaEnvelope className="mr-2" />,
          text: "Contact Us",
          path: "/contactus",
        },
        {
          icon: <FaPlay className="mr-2" />,
          text: "Code Playground",
          path: "/codeplayground",
        },
      ].map((link, index) => (
        <li key={index}>
          <Link
            to={link.path}
            className="text-gray-400 hover:text-green-500 transition-colors flex items-center"
          >
            {link.icon} {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// Footer component with error handling and optimizations
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    success: false,
    message: "Get the Latest News Delivered to Your Inbox!",
  });

  const handleEmailChange = (e) => setEmail(e.target.value);

  const addEmailToNewsletter = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubscriptionStatus({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setSubscriptionStatus(null);

    try {
      const newsletterRef = doc(db, "FooterSection", "NewsLetter");
      await updateDoc(newsletterRef, {
        Emails: arrayUnion(email),
      });
      setEmail("");
      setSubscriptionStatus({
        success: true,
        message: "Successfully subscribed!",
      });
    } catch (error) {
      console.error("Error adding email: ", error);
      setSubscriptionStatus({
        success: false,
        message: "Failed to subscribe. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <SocialMediaLinks />
          </div>

          {/* Problem Categories */}
          <ProblemCategories />

          {/* About & Legal */}
          <NavigationLinks />
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
            <div className="flex flex-col items-center">
              <form
                onSubmit={addEmailToNewsletter}
                className="flex flex-col sm:flex-row gap-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isSubmitting}
                  className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label="Email for newsletter"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting
                      ? "bg-gray-600"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white px-4 py-2 rounded transition-colors`}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              {subscriptionStatus && (
                <p
                  className={`text-sm mt-2 ${
                    subscriptionStatus.message ===
                    "Get the Latest News Delivered to Your Inbox!"
                      ? "text-white"
                      : subscriptionStatus.success
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {subscriptionStatus.message}
                </p>
              )}
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
              {[
                { icon: <FaLock className="mr-1" />, text: "Privacy" },
                { icon: <FaFileAlt className="mr-1" />, text: "Terms" },
                { icon: <FaCookieBite className="mr-1" />, text: "Cookies" },
              ].map((item, index) => (
                <Link
                  key={index}
                  to="/contactus"
                  className="text-sm text-gray-500 hover:text-gray-400 transition-colors flex items-center"
                >
                  {item.icon} {item.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
