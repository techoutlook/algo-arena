import { useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  FaEnvelope,
  FaCommentAlt,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

// Memoized components to prevent unnecessary re-renders
const SocialLink = memo(({ icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center p-3 bg-gray-800 rounded-full text-green-500 hover:bg-gray-700 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
));

SocialLink.displayName = "SocialLink";
SocialLink.propTypes = {
  icon: PropTypes.element.isRequired,
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const ContactOption = memo(({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg border border-green-500 flex flex-col items-center text-center">
    <div className="p-4 bg-gray-700 rounded-full mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
));

ContactOption.displayName = "ContactOption";
ContactOption.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    questionTitle: "",
    questionDescription: "",
    difficulty: "Medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Get navbar height for dynamic padding
  useEffect(() => {
    const navbar = document.querySelector("nav");
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add document to Firestore
      await addDoc(collection(db, "SubmittedQuestions"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "pending",
      });

      // Clear form and set success
      setFormData({
        name: "",
        email: "",
        company: "",
        questionTitle: "",
        questionDescription: "",
        difficulty: "Medium",
      });
      setSubmitStatus({
        type: "success",
        message: "Thank you! Your question has been submitted successfully.",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error submitting question:", error);
      setSubmitStatus({
        type: "error",
        message:
          "There was an error submitting your question. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="bg-gray-900 text-white"
      style={{ paddingTop: navbarHeight ? `${navbarHeight}px` : "3.5rem" }}
    >
      {/* Hero Section */}
      <section className="text-center py-10 md:py-16 px-4 bg-gray-900 text-white">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Get in <span className="text-green-500">Touch</span> with AlgoArena
        </h1>
        <p className="text-base md:text-lg mt-3 text-gray-300 max-w-2xl mx-auto">
          Have a question from a technical interview? Want to contribute or give
          feedback? We would love to hear from you!
        </p>
      </section>

      {/* Contact Options */}
      <section className="py-10 bg-gray-900 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactOption
            icon={<FaEnvelope size={28} className="text-green-500" />}
            title="Email Us"
            description="Have a general inquiry? Our team is ready to answer your questions at support@algoarena.com"
          />
          <ContactOption
            icon={<FaCommentAlt size={28} className="text-green-500" />}
            title="Submit an Interview Question"
            description="Share a coding challenge you faced in an interview to help others prepare."
          />
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 md:py-16 bg-gray-900 px-4">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
            <span className="text-green-500">Submit</span> a Technical Interview
            Question
          </h2>

          {submitStatus && (
            <div
              className={`p-4 mb-6 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-900 text-green-300"
                  : "bg-red-900 text-red-300"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                  placeholder="johndoe@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                placeholder="Where was this question asked?"
              />
            </div>

            <div>
              <label
                htmlFor="questionTitle"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Question Title
              </label>
              <input
                type="text"
                id="questionTitle"
                name="questionTitle"
                value={formData.questionTitle}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                placeholder="e.g., 'Implement a Binary Search Tree'"
              />
            </div>

            <div>
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="questionDescription"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Question Description
              </label>
              <textarea
                id="questionDescription"
                name="questionDescription"
                value={formData.questionDescription}
                onChange={handleChange}
                required
                rows="6"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                placeholder="Please provide the full question details, including any constraints, input/output examples, and expected time/space complexity."
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={18} />
                    <span>Submit Question</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-10 md:py-16 bg-gray-900 text-white text-center px-4">
        <h2 className="text-xl md:text-2xl font-bold mb-8 text-green-500">
          Connect With Us
        </h2>
        <div className="flex justify-center space-x-6 mb-8">
          <SocialLink
            icon={<FaGithub size={24} />}
            href="https://github.com/algoarena"
            label="GitHub"
          />
          <SocialLink
            icon={<FaLinkedin size={24} />}
            href="https://linkedin.com/company/algoarena"
            label="LinkedIn"
          />
          <SocialLink
            icon={<FaTwitter size={24} />}
            href="https://twitter.com/algoarena"
            label="Twitter"
          />
          <SocialLink
            icon={<FaEnvelope size={24} />}
            href="mailto:contact@algoarena.com"
            label="Email"
          />
        </div>
      </section>
    </div>
  );
};

Contactus.displayName = "Contactus";

export default memo(Contactus);
