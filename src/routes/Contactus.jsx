import { useState, memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  FaEnvelope,
  FaCommentAlt,
  FaPaperPlane,
  FaTwitter,
  FaTelegram,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

// Memoized components to prevent unnecessary re-renders
const SocialLink = memo(({ icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center p-3 bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
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
    <div className="p-4 bg-gray-700 rounded-full mb-4" aria-hidden="true">
      {icon}
    </div>
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

const FormField = memo(
  ({
    id,
    name,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    rows,
    options,
  }) => {
    const inputId = `${id}-input`;

    if (type === "select") {
      return (
        <div className="form-field">
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            required={required}
            aria-required={required}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (type === "textarea") {
      return (
        <div className="form-field">
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            rows={rows || 6}
            required={required}
            aria-required={required}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            placeholder={placeholder}
          ></textarea>
        </div>
      );
    }

    return (
      <div className="form-field">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-required={required}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          placeholder={placeholder}
        />
      </div>
    );
  }
);

FormField.displayName = "FormField";
FormField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "email", "textarea", "select"]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

const SubmitButton = memo(({ isSubmitting }) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-gray-800"
    aria-busy={isSubmitting}
  >
    {isSubmitting ? (
      <>
        <span
          className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        ></span>
        <span>Submitting...</span>
      </>
    ) : (
      <>
        <FaPaperPlane size={18} aria-hidden="true" />
        <span>Submit Question</span>
      </>
    )}
  </button>
));

SubmitButton.displayName = "SubmitButton";
SubmitButton.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
};

const StatusMessage = memo(({ status }) => {
  if (!status) return null;

  const isSuccess = status.type === "success";

  return (
    <div
      className={`p-4 mb-6 rounded-lg ${
        isSuccess ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"
      }`}
      role="alert"
      aria-live="polite"
    >
      {status.message}
    </div>
  );
});

StatusMessage.displayName = "StatusMessage";
StatusMessage.propTypes = {
  status: PropTypes.shape({
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    message: PropTypes.string.isRequired,
  }),
};

const ContactUs = () => {
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

  const difficultyOptions = [
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ];

  const socialLinks = [
    {
      icon: <FaTelegram size={24} />,
      href: "https://web.telegram.org/",
      label: "Telegram",
    },
    {
      icon: <FaInstagram size={24} />,
      href: "https://www.instagram.com/",
      label: "Instagram",
    },
    { icon: <FaTwitter size={24} />, href: "https://x.com/", label: "Twitter" },
    {
      icon: <FaYoutube size={24} />,
      href: "https://www.youtube.com/",
      label: "Youtube",
    },
  ];

  const contactOptions = [
    {
      icon: <FaEnvelope size={28} className="text-green-500" />,
      title: "Email Us",
      description:
        "Have a general inquiry? Our team is ready to answer your questions at support@algoarena.com",
    },
    {
      icon: <FaCommentAlt size={28} className="text-green-500" />,
      title: "Submit an Interview Question",
      description:
        "Share a coding challenge you faced in an interview to help others prepare.",
    },
  ];

  // Get navbar height for dynamic padding
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    // Initial measurement
    updateNavbarHeight();

    // Add resize listener for responsive layouts
    window.addEventListener("resize", updateNavbarHeight);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

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
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

      // Cleanup timeout if component unmounts
      return () => clearTimeout(timer);
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
      className="bg-gray-900 text-white min-h-screen"
      style={{ paddingTop: navbarHeight ? `${navbarHeight}px` : "3.5rem" }}
    >
      {/* Hero Section */}
      <section className="text-center py-10 md:py-16 px-4 bg-gray-900 text-white">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Get in touch with <span className="text-green-500">AlgoArena</span>
        </h1>
        <p className="text-base md:text-lg mt-3 text-gray-300 max-w-2xl mx-auto">
          Have a question from a technical interview? Want to contribute or give
          feedback? We would love to hear from you!
        </p>
      </section>

      {/* Contact Options */}
      <section
        className="py-10 bg-gray-900 px-4"
        aria-labelledby="contact-options-heading"
      >
        <h2 id="contact-options-heading" className="sr-only">
          Contact Options
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactOptions.map((option, index) => (
            <ContactOption
              key={index}
              icon={option.icon}
              title={option.title}
              description={option.description}
            />
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section
        className="py-10 md:py-16 bg-gray-900 px-4"
        aria-labelledby="contact-form-heading"
      >
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          <h2
            id="contact-form-heading"
            className="text-xl md:text-2xl font-bold mb-6 text-center"
          >
            Submit a{" "}
            <span className="text-green-500">Technical Interview Question</span>
          </h2>

          <StatusMessage status={submitStatus} />

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                id="name"
                name="name"
                label="Your Name"
                value={formData.name}
                onChange={handleChange}
                required={true}
                placeholder="John Doe"
              />
              <FormField
                id="email"
                name="email"
                type="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required={true}
                placeholder="johndoe@example.com"
              />
            </div>

            <FormField
              id="company"
              name="company"
              label="Company (Optional)"
              value={formData.company}
              onChange={handleChange}
              placeholder="Where was this question asked?"
            />

            <FormField
              id="questionTitle"
              name="questionTitle"
              label="Question Title"
              value={formData.questionTitle}
              onChange={handleChange}
              required={true}
              placeholder="e.g., 'Implement a Binary Search Tree'"
            />

            <FormField
              id="difficulty"
              name="difficulty"
              type="select"
              label="Difficulty Level"
              value={formData.difficulty}
              onChange={handleChange}
              options={difficultyOptions}
            />

            <FormField
              id="questionDescription"
              name="questionDescription"
              type="textarea"
              label="Question Description"
              value={formData.questionDescription}
              onChange={handleChange}
              required={true}
              rows={6}
              placeholder="Please provide the full question details, including any constraints, input/output examples, and expected time/space complexity."
            />

            <div className="flex justify-center">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>
      </section>

      {/* Social Links */}
      <section
        className="py-10 md:py-16 bg-gray-900 text-white text-center px-4"
        aria-labelledby="connect-heading"
      >
        <h2
          id="connect-heading"
          className="text-xl md:text-2xl font-bold mb-8 text-white"
        >
          Connect With Us
        </h2>
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((link, index) => (
            <SocialLink
              key={index}
              icon={link.icon}
              href={link.href}
              label={link.label}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

ContactUs.displayName = "ContactUs";

export default memo(ContactUs);
