import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db } from "../firebase";
import {
  CheckCircle,
  Trash2,
  Upload,
  User,
  AlertCircle,
  X,
  Menu,
  Mail,
  Shield,
  RefreshCw,
  Clock,
} from "lucide-react";

function Profile() {
  const auth = getAuth();
  const storage = getStorage();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    bio: "",
    location: "",
    profession: "",
    githubLink: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [photoLoading, setPhotoLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Email verification states
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationAction, setVerificationAction] = useState(""); // "edit" or "delete"
  const [verificationError, setVerificationError] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);

  // OTP related states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpResendDisabled, setOtpResendDisabled] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPhotoURL(currentUser.photoURL || "");

        // Fetch additional user data from Firestore
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData({
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              bio: data.bio || "",
              location: data.location || "",
              profession: data.profession || "",
              githubLink: data.githubLink || "",
            });
          } else {
            // Create a new user document if it doesn't exist
            await setDoc(docRef, {
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              bio: "",
              location: "",
              profession: "",
              githubLink: "",
            });

            setUserData({
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              bio: "",
              location: "",
              profession: "",
              githubLink: "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          showNotification("Error loading profile data", "error");
        }
      } else {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  // Reload user to check email verification status
  const reloadUser = async () => {
    try {
      await user.reload();
      const refreshedUser = auth.currentUser;
      setUser(refreshedUser);
      return refreshedUser.emailVerified;
    } catch (error) {
      console.error("Error reloading user:", error);
      showNotification("Error checking verification status", "error");
      return false;
    }
  };

  // OTP timer effect
  useEffect(() => {
    if (otpExpiry && otpSent) {
      const updateTimer = () => {
        const now = new Date().getTime();
        const timeLeft = Math.max(0, Math.floor((otpExpiry - now) / 1000));

        setOtpTimer(timeLeft);
        setOtpResendDisabled(timeLeft > 0);

        if (timeLeft <= 0) {
          clearInterval(timerRef.current);
          setOtpResendDisabled(false);
        }
      };

      updateTimer();
      timerRef.current = setInterval(updateTimer, 1000);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [otpExpiry, otpSent]);

  useEffect(() => {
    // Close mobile menu when editing status changes
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [editing, mobileMenuOpen]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      5000
    );
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/auth");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        showNotification("Error signing out", "error");
      });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      showNotification("Only JPEG, PNG, and GIF images are allowed", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      showNotification("Image size should be less than 2MB", "error");
      return;
    }

    setPhotoLoading(true);

    const storageRef = ref(storage, `profile_photos/${user.uid}`);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setPhotoURL(downloadURL);

        return updateProfile(user, {
          photoURL: downloadURL,
        });
      })
      .then(() => {
        showNotification("Profile photo updated successfully", "success");
        setPhotoLoading(false);
      })
      .catch((error) => {
        console.error("Error uploading photo:", error);
        setPhotoLoading(false);
        showNotification("Error uploading photo", "error");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const initiateEditProfile = () => {
    // If already in edit mode, cancel editing
    if (editing) {
      cancelEdit();
      return;
    }

    // Check if email is verified
    if (user.emailVerified) {
      setEditing(true);
    } else {
      // Initiate verification process
      setVerificationAction("edit");
      setShowVerificationModal(true);
      setVerificationError("");
      setVerificationSent(false);
    }
  };

  const cancelEdit = () => {
    // Reset form to current values
    setUserData({
      displayName: user.displayName || "",
      email: user.email || "",
      bio: userData.bio || "",
      location: userData.location || "",
      profession: userData.profession || "",
      githubLink: userData.githubLink || "",
    });
    setEditing(false);
  };

  const initiateDeleteAccount = () => {
    // Check if email is verified first
    if (user.emailVerified) {
      // Show OTP modal instead of delete modal with password
      setShowOtpModal(true);
      setOtpError("");
      setOtpSent(false);
      setOtpCode("");
    } else {
      // Initiate verification process
      setVerificationAction("delete");
      setShowVerificationModal(true);
      setVerificationError("");
      setVerificationSent(false);
    }
  };

  // Function to send OTP to user's email
  const sendDeleteOTP = async () => {
    try {
      setOtpLoading(true);
      setOtpError("");

      // In a real app, you would call your backend to generate and send an OTP
      // Here, we'll simulate it with a simple random code
      const generatedOTP = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      console.log("Generated OTP (for demo):", generatedOTP);

      // Store OTP in Firestore with expiry time (5 minutes from now)
      const expiryTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes
      setOtpExpiry(expiryTime);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        deleteAccountOTP: {
          code: generatedOTP,
          expiresAt: expiryTime,
        },
      });

      // In a real app, you would send this OTP via email or SMS
      // For demo, we're just logging it to console

      setOtpSent(true);
      showNotification("OTP has been sent to your email", "success");

      // Set the resend cooldown (60 seconds)
      setOtpResendDisabled(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setOtpError("Failed to send verification code. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Function to verify OTP
  const verifyDeleteOTP = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setOtpError("Please enter a valid 6-digit code");
      return;
    }

    try {
      setOtpLoading(true);

      // In a real app, you would validate this against your backend
      // Here we'll check against what we stored in Firestore
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        setOtpError("User data not found");
        return;
      }

      const userData = userDoc.data();
      const storedOTP = userData.deleteAccountOTP;

      if (!storedOTP) {
        setOtpError("No OTP found. Please request a new code");
        return;
      }

      const now = new Date().getTime();

      // Check if OTP is expired
      if (storedOTP.expiresAt < now) {
        setOtpError("Verification code has expired. Please request a new code");
        return;
      }

      // Check if OTP matches
      if (storedOTP.code !== otpCode) {
        setOtpError("Invalid verification code");
        return;
      }

      // OTP is valid, proceed with account deletion
      await deleteUserAccount();
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Failed to verify code. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // Function to format timer display (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to send email verification
  const sendVerificationEmail = async () => {
    try {
      setVerificationLoading(true);

      // Send verification email with a redirect URL
      await sendEmailVerification(user, {
        url: window.location.origin + "/profile",
        handleCodeInApp: false,
      });

      setVerificationSent(true);
      showNotification(`Verification email sent to ${user.email}`, "success");
    } catch (error) {
      console.error("Error sending verification email:", error);

      // Show specific error messages based on error code
      if (error.code === "auth/too-many-requests") {
        setVerificationError("Too many requests. Please try again later.");
      } else {
        setVerificationError(
          "Failed to send verification email. Please try again."
        );
      }
    } finally {
      setVerificationLoading(false);
    }
  };

  // Function to check if email is verified
  const checkEmailVerified = async () => {
    try {
      setVerificationLoading(true);

      // Reload user to get fresh email verification status
      const isVerified = await reloadUser();

      if (isVerified) {
        setShowVerificationModal(false);
        showNotification("Email verification successful", "success");

        // Continue with the action that required verification
        if (verificationAction === "edit") {
          setEditing(true);
        } else if (verificationAction === "delete") {
          setShowOtpModal(true);
        }
      } else {
        setVerificationError(
          "Email not yet verified. Please check your inbox and click the verification link."
        );
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
      setVerificationError("Failed to verify email status. Please try again.");
    } finally {
      setVerificationLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

      // Update Auth profile name
      await updateProfile(user, {
        displayName: userData.displayName,
      });

      // Update Firestore user document
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName: userData.displayName,
        bio: userData.bio,
        location: userData.location,
        profession: userData.profession,
        githubLink: userData.githubLink,
      });

      setUser({
        ...user,
        displayName: userData.displayName,
      });

      setEditing(false);
      showNotification("Profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification("Error updating profile", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteUserAccount = async () => {
    try {
      setLoading(true);

      // Delete profile photo from storage if exists
      if (user.photoURL && user.photoURL.includes("firebase")) {
        try {
          const photoRef = ref(storage, `profile_photos/${user.uid}`);
          await deleteObject(photoRef);
        } catch (storageError) {
          console.error("Error deleting profile photo:", storageError);
        }
      }

      // Delete user document from Firestore
      await deleteDoc(doc(db, "users", user.uid));

      // Delete all other user-related documents (e.g., posts, comments, etc.)
      // Add more collections as needed
      try {
        // Example: Delete user posts
        const postsRef = doc(db, "posts", user.uid);
        await deleteDoc(postsRef);

        // Example: Delete user comments
        const commentsRef = doc(db, "comments", user.uid);
        await deleteDoc(commentsRef);
      } catch (firestoreError) {
        console.error("Error deleting user-related data:", firestoreError);
      }

      // Delete user account from Firebase Authentication
      await deleteUser(user);

      showNotification("Account deleted successfully", "success");
      navigate("/auth");
    } catch (error) {
      console.error("Error deleting account:", error);
      setOtpError("Error deleting account: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 px-4 pb-10">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg z-50 flex items-center justify-between max-w-xs sm:max-w-sm ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <CheckCircle className="mr-2 flex-shrink-0" size={20} />
            ) : (
              <AlertCircle className="mr-2 flex-shrink-0" size={20} />
            )}
            <p className="text-sm">{notification.message}</p>
          </div>
          <button
            onClick={() =>
              setNotification({ show: false, message: "", type: "" })
            }
            className="ml-3 text-white flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header with profile photo */}
        <div className="relative bg-gradient-to-r from-green-600 to-green-400 h-28 sm:h-40 flex items-center justify-center">
          <div className="absolute -bottom-12 sm:-bottom-16 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-gray-800 overflow-hidden bg-gray-700">
            {photoLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : photoURL ? (
              <img
                src={photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-600">
                <User size={32} className="text-gray-300" />
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              className="hidden"
              accept="image/jpeg,image/png,image/gif"
            />

            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 p-1 rounded-full transition"
              title="Upload profile photo"
            >
              <Upload size={14} />
            </button>
          </div>
        </div>

        {/* Profile content */}
        <div className="pt-16 sm:pt-20 px-4 sm:px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">
              Profile
            </h1>

            {/* Email verification status */}
            <div className="mb-4 sm:mb-0 sm:mr-4 flex items-center">
              {user.emailVerified ? (
                <div className="flex items-center text-green-400 text-sm">
                  <Shield className="mr-1" size={16} />
                  <span>Email verified</span>
                </div>
              ) : (
                <div
                  className="flex items-center text-yellow-400 text-sm cursor-pointer"
                  onClick={() => {
                    setVerificationAction("verify");
                    setShowVerificationModal(true);
                    setVerificationError("");
                    setVerificationSent(false);
                  }}
                >
                  <AlertCircle className="mr-1" size={16} />
                  <span>Email not verified - Click to verify</span>
                </div>
              )}
            </div>

            {/* Desktop buttons */}
            <div className="hidden sm:flex sm:space-x-2">
              <button
                onClick={initiateEditProfile}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                  editing
                    ? "bg-gray-600 hover:bg-gray-700"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {editing ? "Cancel" : "Edit Profile"}
              </button>

              {editing && (
                <button
                  onClick={saveProfile}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-500 hover:bg-green-600 transition"
                >
                  Save
                </button>
              )}

              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-gray-700 hover:bg-gray-600 transition"
              >
                Sign Out
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                <Menu size={20} />
              </button>

              {/* Mobile menu dropdown */}
              {mobileMenuOpen && (
                <div className="absolute right-4 mt-2 w-48 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={initiateEditProfile}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        editing
                          ? "text-gray-300 hover:bg-gray-600"
                          : "text-white hover:bg-green-600 bg-green-500"
                      }`}
                    >
                      {editing ? "Cancel" : "Edit Profile"}
                    </button>

                    {editing && (
                      <button
                        onClick={saveProfile}
                        className="block w-full text-left px-4 py-2 text-sm text-white bg-green-500 hover:bg-green-600"
                      >
                        Save
                      </button>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={userData.displayName}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                ) : (
                  <p className="text-white">
                    {userData.displayName || "Not set"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <p className="text-white break-words">{userData.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Email cannot be changed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Location
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="City, Country"
                  />
                ) : (
                  <p className="text-white">{userData.location || "Not set"}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Profession
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="profession"
                    value={userData.profession}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Software Engineer, Student, etc."
                  />
                ) : (
                  <p className="text-white">
                    {userData.profession || "Not set"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  GitHub Profile
                </label>
                {editing ? (
                  <input
                    type="text"
                    name="githubLink"
                    value={userData.githubLink}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://github.com/username"
                  />
                ) : (
                  <p className="text-white break-words">
                    {userData.githubLink ? (
                      <a
                        href={userData.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300"
                      >
                        {userData.githubLink}
                      </a>
                    ) : (
                      "Not set"
                    )}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Bio
                </label>
                {editing ? (
                  <textarea
                    name="bio"
                    value={userData.bio}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-24"
                    placeholder="Tell us a bit about yourself..."
                  />
                ) : (
                  <p className="text-white">{userData.bio || "Not set"}</p>
                )}
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-10 border border-red-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-red-500 mb-2">
              Danger Zone
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
            <button
              onClick={initiateDeleteAccount}
              className="flex items-center px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg transition"
            >
              <Trash2 size={16} className="mr-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Email Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Email Verification Required
            </h3>
            <p className="text-gray-300 mb-4">
              {verificationAction === "edit"
                ? "To edit your profile, you need to verify your email address."
                : verificationAction === "delete"
                ? "To delete your account, you need to verify your email address."
                : "Please verify your email address to access all features."}
            </p>

            <div className="mb-6">
              <p className="text-gray-400 mb-4">
                {!verificationSent
                  ? `Click the button below to send a verification email to: ${userData.email}`
                  : "A verification email has been sent. Please check your inbox and click the verification link. If you don't see it, check your spam folder."}
              </p>

              {verificationError && (
                <div className="bg-red-900 bg-opacity-50 border border-red-800 rounded-lg p-3 mb-4">
                  <p className="text-red-300 text-sm">{verificationError}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowVerificationModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
              >
                Close
              </button>

              <div className="flex space-x-2">
                {!verificationSent ? (
                  <button
                    onClick={sendVerificationEmail}
                    disabled={verificationLoading}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {verificationLoading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail size={16} className="mr-2" />
                        Send Verification
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={checkEmailVerified}
                      disabled={verificationLoading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {verificationLoading ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Checking...
                        </>
                      ) : (
                        <>
                          <RefreshCw size={16} className="mr-2" />I have
                          Verified
                        </>
                      )}
                    </button>
                    <button
                      onClick={sendVerificationEmail}
                      disabled={verificationLoading}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Resend
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Verify Account Deletion
            </h3>
            <p className="text-gray-300 mb-4">
              For security purposes, we need to verify its you before deleting
              your account.
            </p>

            {!otpSent ? (
              <div>
                <p className="text-gray-400 mb-4">
                  Click the button below to send a verification code to your
                  email: {userData.email}
                </p>

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setShowOtpModal(false)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendDeleteOTP}
                    disabled={otpLoading}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {otpLoading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail size={16} className="mr-2" />
                        Send Verification Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-gray-400 mb-4">
                  Enter the 6-digit verification code sent to your email:
                </p>

                {otpTimer > 0 && (
                  <div className="flex items-center mb-4 text-gray-400">
                    <Clock size={16} className="mr-2" />
                    <span>Code expires in: {formatTime(otpTimer)}</span>
                  </div>
                )}

                <input
                  type="text"
                  maxLength="6"
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 text-center tracking-widest text-xl"
                  placeholder="000000"
                />

                {otpError && (
                  <div className="bg-red-900 bg-opacity-50 border border-red-800 rounded-lg p-3 mb-4">
                    <p className="text-red-300 text-sm">{otpError}</p>
                  </div>
                )}

                <div className="flex justify-between">
                  <div>
                    <button
                      onClick={() => setShowOtpModal(false)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={sendDeleteOTP}
                      disabled={otpLoading || otpResendDisabled}
                      className="px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Resend Code
                    </button>
                    <button
                      onClick={verifyDeleteOTP}
                      disabled={otpLoading || otpCode.length !== 6}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {otpLoading ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Verifying...
                        </>
                      ) : (
                        "Delete Account"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
