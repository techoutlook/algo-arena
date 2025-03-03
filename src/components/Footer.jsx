import { useState, useEffect, memo } from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
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
  FaShieldAlt,
  FaFileContract,
  FaCookieBite,
} from "react-icons/fa";

// Policy Modal Component
const PolicyModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex justify-center items-center">
      <div className="relative bg-gray-800 w-full max-w-3xl m-4 rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="text-gray-300 space-y-4">{children}</div>
        </div>
        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
PolicyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Cookie Banner Component
const CookieBanner = ({ visible, onAccept, onCustomize }) => {
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 p-4 md:p-6 z-40">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-300 text-sm md:text-base flex-1">
          <p className="mb-2">
            <FaCookieBite className="inline mr-2 text-green-500" /> We use
            cookies to enhance your experience on our website. By continuing to
            use this site, you consent to our use of cookies.
          </p>
          <p>
            Learn more in our{" "}
            <button
              className="text-green-500 hover:underline"
              onClick={onCustomize}
            >
              Cookie Policy
            </button>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Accept All
          </button>
          <button
            onClick={onCustomize}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Customize
          </button>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
CookieBanner.propTypes = {
  visible: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCustomize: PropTypes.func.isRequired,
};

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
            to="/codeplayground"
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
  const [activePolicy, setActivePolicy] = useState(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Check for cookie consent on component mount - Fixed to use useEffect
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookieBanner(false);
  };

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
                {
                  icon: <FaShieldAlt className="mr-1" />,
                  text: "Privacy",
                  policyId: "privacy",
                },
                {
                  icon: <FaFileContract className="mr-1" />,
                  text: "Terms",
                  policyId: "terms",
                },
                {
                  icon: <FaCookieBite className="mr-1" />,
                  text: "Cookies",
                  policyId: "cookie",
                },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActivePolicy(item.policyId)}
                  className="text-sm text-gray-500 hover:text-gray-400 transition-colors flex items-center"
                >
                  {item.icon} {item.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Banner */}
      <CookieBanner
        visible={showCookieBanner}
        onAccept={acceptCookies}
        onCustomize={() => setActivePolicy("cookie")}
      />

      {/* Privacy Policy Modal */}
      <PolicyModal
        isOpen={activePolicy === "privacy"}
        onClose={() => setActivePolicy(null)}
        title="Privacy Policy"
      >
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Our Commitment to Your Privacy
        </h4>
        <p className="mb-3">
          At AlgoArena, we take your privacy seriously. This Privacy Policy
          outlines how we collect, use, store, and protect your personal
          information when you use our platform.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Information We Collect
        </h4>
        <p className="mb-3">
          We collect information that you provide directly to us, such as your
          name, email address, and company information when you submit interview
          questions or contact us. We also collect usage data, including your IP
          address, browser type, and pages visited.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          How We Use Your Information
        </h4>
        <p className="mb-3">
          We use your information to provide and improve our services, respond
          to your inquiries, send updates about our platform, and analyze how
          users interact with our website to enhance user experience.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Data Security
        </h4>
        <p className="mb-3">
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, or disclosure. Your
          data is stored on secure servers and we regularly review our security
          practices.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Your Rights
        </h4>
        <p>
          You have the right to access, correct, or delete your personal
          information. You may also object to our processing of your data or
          request that we restrict how we use it. To exercise these rights,
          please contact us at privacy@algoarena.com.
        </p>
      </PolicyModal>

      {/* Terms of Service Modal */}
      <PolicyModal
        isOpen={activePolicy === "terms"}
        onClose={() => setActivePolicy(null)}
        title="Terms of Service"
      >
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Terms of Service Agreement
        </h4>
        <p className="mb-3">
          Welcome to AlgoArena. By accessing or using our platform, you agree to
          be bound by these Terms of Service. Please read them carefully.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Use of Our Services
        </h4>
        <p className="mb-3">
          You may use our services only as permitted by these terms and
          applicable laws. You are responsible for ensuring that your use of our
          platform complies with all relevant regulations.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          User Content
        </h4>
        <p className="mb-3">
          When you submit content to our platform, you grant AlgoArena a
          worldwide, non-exclusive, royalty-free license to use, reproduce,
          modify, and distribute that content for the purpose of providing and
          improving our services.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Intellectual Property
        </h4>
        <p className="mb-3">
          All content, features, and functionality of our platform, including
          but not limited to text, graphics, logos, icons, and software, are
          owned by AlgoArena and are protected by copyright, trademark, and
          other intellectual property laws.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Limitation of Liability
        </h4>
        <p>
          AlgoArena shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages arising out of or relating to your
          use of our platform. Our liability is limited to the maximum extent
          permitted by law.
        </p>
      </PolicyModal>

      {/* Cookie Policy Modal */}
      <PolicyModal
        isOpen={activePolicy === "cookie"}
        onClose={() => setActivePolicy(null)}
        title="Cookie Policy"
      >
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Our Use of Cookies
        </h4>
        <p className="mb-3">
          AlgoArena uses cookies and similar technologies to enhance your
          experience on our platform, analyze usage patterns, and deliver
          personalized content.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          What Are Cookies?
        </h4>
        <p className="mb-3">
          Cookies are small text files that are placed on your device when you
          visit our website. They allow us to recognize your device and remember
          certain information about your visit, such as your preferences and
          actions on our site.
        </p>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Types of Cookies We Use
        </h4>
        <ul className="list-disc pl-5 mb-3 space-y-2">
          <li>
            <span className="font-medium">Essential Cookies:</span> These are
            necessary for the website to function properly and cannot be
            switched off.
          </li>
          <li>
            <span className="font-medium">Performance Cookies:</span> These help
            us understand how visitors interact with our website, allowing us to
            improve the user experience.
          </li>
          <li>
            <span className="font-medium">Functional Cookies:</span> These
            enable enhanced functionality and personalization, such as
            remembering your preferences.
          </li>
          <li>
            <span className="font-medium">Targeting Cookies:</span> These may be
            set by our advertising partners to display ads that are relevant to
            your interests.
          </li>
        </ul>
        <h4 className="text-lg font-semibold mb-3 text-green-500">
          Managing Cookies
        </h4>
        <p>
          You can control and/or delete cookies as you wish through your browser
          settings. You can delete all cookies that are already on your device
          and set most browsers to prevent them from being placed. However,
          doing so may affect your ability to use certain features of our
          website.
        </p>
      </PolicyModal>
    </footer>
  );
};

export default memo(Footer);
