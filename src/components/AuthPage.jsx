import { useState, useEffect, useCallback } from "react";
import { Eye, EyeOff, User, Lock, Mail, ArrowRight, Info } from "lucide-react";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Get the auth instance using the existing Firebase app
const auth = getAuth();

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isPasswordless, setIsPasswordless] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [userUid, setUserUid] = useState(null);
  console.log(userUid);

  const stableNavigate = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        stableNavigate();
      }
    });

    return () => unsubscribe();
  }, [stableNavigate]);

  useEffect(() => {
    // Check if the URL contains a sign-in link when the component mounts
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Get the email if saved in localStorage
      let email = localStorage.getItem("emailForSignIn");

      if (!email) {
        // If email is not saved, prompt the user for it
        email = window.prompt("Please provide your email for confirmation");
      }

      setLoading(true);

      // Check if this is a new user or existing user
      const isNewUser = localStorage.getItem("isNewUser") === "true";
      const username = localStorage.getItem("usernameForSignIn");

      // Complete the sign-in process
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // If this is a new user and we have a username, update their profile
          if (isNewUser && username && result.user) {
            return updateProfile(result.user, {
              displayName: username,
            }).then(() => result);
          }
          return result;
        })
        .then((result) => {
          // Clear the stored data
          localStorage.removeItem("emailForSignIn");
          localStorage.removeItem("isNewUser");
          localStorage.removeItem("usernameForSignIn");

          // Handle successful sign-in
          setSuccess(
            `Successfully ${
              isNewUser ? "created account" : "signed in"
            } with email link!`
          );
          console.log("User signed in:", result.user);

          // Here you would typically redirect to a dashboard or main page
          // window.location.href = '/dashboard';
        })
        .catch((error) => {
          setError("Error signing in with email link: " + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear any previous messages when user types
    setError("");
    setSuccess("");
    setEmailSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (isPasswordless) {
      sendPasswordlessLink();
    } else {
      if (isLogin) {
        // Handle sign in with email/password
        signInWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            setUserUid(userCredential.user.uid); // Store UID in state
            setSuccess("Successfully signed in!");
          })
          .catch((error) => {
            if (error.code === "auth/invalid-credential") {
              setError("Invalid email or password. Please try again.");
            } else {
              setError("Error signing in: " + error.message);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        // Handle sign up with email/password
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            return updateProfile(userCredential.user, {
              displayName: formData.username,
            }).then(() => userCredential);
          })
          .then((userCredential) => {
            setUserUid(userCredential.user.uid); // Store UID in state
            setSuccess("Account created successfully!");
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              setError(
                "Email is already in use. Please use a different email or sign in."
              );
            } else if (error.code === "auth/weak-password") {
              setError("Password is too weak. Please use a stronger password.");
            } else {
              setError("Error creating account: " + error.message);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  };

  const sendPasswordlessLink = () => {
    const actionCodeSettings = {
      // URL you want to redirect to after email verification
      url: window.location.origin + window.location.pathname,
      handleCodeInApp: true,
    };

    sendSignInLinkToEmail(auth, formData.email, actionCodeSettings)
      .then(() => {
        // Save the email locally to remember what email to sign in with
        localStorage.setItem("emailForSignIn", formData.email);

        // If it's a new registration, save the username and flag
        if (!isLogin) {
          localStorage.setItem("usernameForSignIn", formData.username);
          localStorage.setItem("isNewUser", "true");
        } else {
          localStorage.removeItem("usernameForSignIn");
          localStorage.setItem("isNewUser", "false");
        }

        setEmailSent(true);
        setSuccess(`A sign-in link has been sent to ${formData.email}`);
      })
      .catch((error) => {
        setError("Error sending email link: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    // Reset states
    setIsPasswordless(false);
    setEmailSent(false);
    setError("");
    setSuccess("");
    setLoading(false);
    // Reset form data when switching modes
    setFormData({
      email: "",
      username: isLogin ? "" : formData.username,
      password: "",
    });
  };

  const togglePasswordlessMode = () => {
    setIsPasswordless(!isPasswordless);
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-76px)] bg-gray-900 text-white overflow-hidden">
      {/* Left panel - Auth form */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4 md:p-8 lg:p-12">
        <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-400">
              {isLogin
                ? "Sign in to access your account"
                : "Sign up to get started with coding"}
            </p>
          </div>

          {emailSent ? (
            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <Info size={32} className="mx-auto mb-4 text-blue-400" />
              <h3 className="text-lg font-medium mb-2">Check Your Email</h3>
              <p className="mb-4">
                We have sent a sign-in link to <strong>{formData.email}</strong>
                . Click the link to complete the{" "}
                {isLogin ? "sign-in" : "registration"} process.
              </p>
              <button
                onClick={() => setEmailSent(false)}
                className="text-blue-500 hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      placeholder="username"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail size={18} className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full pl-10 p-2.5 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              {!isPasswordless && (
                <div className="space-y-2">
                  <label
                    className="block text-sm font-medium"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock size={18} className="text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-gray-700 border border-gray-600 text-white rounded-lg block w-full pl-10 pr-10 p-2.5 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                      placeholder="••••••••"
                      required={!isPasswordless}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff
                          size={18}
                          className="text-gray-500 hover:text-gray-300"
                        />
                      ) : (
                        <Eye
                          size={18}
                          className="text-gray-500 hover:text-gray-300"
                        />
                      )}
                    </button>
                  </div>
                  {isLogin && (
                    <div className="flex justify-end">
                      <a
                        href="#"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="bg-red-900/50 border border-red-800 text-red-100 px-4 py-2 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-900/50 border border-green-800 text-green-100 px-4 py-2 rounded-md">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-white transition-all duration-200 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                ) : null}
                {isPasswordless
                  ? `Send ${isLogin ? "Sign-in" : "Registration"} Link`
                  : isLogin
                  ? "Sign In"
                  : "Sign Up"}
                {!loading && <ArrowRight size={18} />}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-400">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="ml-1 text-green-500 hover:underline focus:outline-none"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </p>
              </div>

              <div className="relative flex items-center justify-center">
                <hr className="w-full border-gray-600" />
                <span className="absolute bg-gray-800 px-2 text-gray-400 text-sm">
                  OR
                </span>
              </div>

              <button
                type="button"
                onClick={togglePasswordlessMode}
                className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:ring-gray-600 font-medium rounded-lg px-5 py-2.5 text-white transition-all duration-200"
              >
                {isPasswordless
                  ? "Use Password Instead"
                  : `${isLogin ? "Sign In" : "Sign Up"} Without Password`}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right panel - Promotional area */}
      <div className="hidden md:flex md:w-1/2 bg-gray-800 h-full">
        <div className="flex flex-col items-center justify-center w-full p-8 lg:p-12">
          <div className="max-w-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Code Anywhere, Anytime</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join our coding platform and take your programming skills to the
              next level
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900 p-5 rounded-lg">
                <h3 className="font-bold mb-2">Multi-language Support</h3>
                <p className="text-gray-400">
                  JavaScript, Python, Java, C++, and more!
                </p>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg">
                <h3 className="font-bold mb-2">Interactive Challenges</h3>
                <p className="text-gray-400">
                  Practice with real-world coding problems
                </p>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg">
                <h3 className="font-bold mb-2">Collaborative Editing</h3>
                <p className="text-gray-400">
                  Code together in real-time with team members
                </p>
              </div>
              <div className="bg-gray-900 p-5 rounded-lg">
                <h3 className="font-bold mb-2">Cloud Saves</h3>
                <p className="text-gray-400">
                  Access your projects from any device
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
