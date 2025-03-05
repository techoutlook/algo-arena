import { useState, useEffect } from "react";
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
import { getStorage, ref, deleteObject } from "firebase/storage";
import { db } from "../firebase";
import {
  CheckCircle,
  Trash2,
  AlertCircle,
  X,
  ShieldAlert,
  Loader2,
  AlertTriangle,
} from "lucide-react";

function Profile() {
  const auth = getAuth();
  const storage = getStorage();
  const navigate = useNavigate();

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
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  // New state for specific loading states
  const [isVerificationSending, setIsVerificationSending] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Authentication and user data loading
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);

          const data = docSnap.exists() ? docSnap.data() : {};
          setUserData({
            displayName: currentUser.displayName || "",
            email: currentUser.email || "",
            bio: data.bio || "",
            location: data.location || "",
            profession: data.profession || "",
            githubLink: data.githubLink || "",
          });

          if (!docSnap.exists()) {
            await setDoc(docRef, {
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
          showNotification("Error loading profile", "error");
        }
      } else {
        navigate("/auth");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      5000
    );
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/auth"))
      .catch((error) => {
        console.error("Error signing out:", error);
        showNotification("Error signing out", "error");
      });
  };

  const sendVerificationEmail = async () => {
    if (!user) return;

    try {
      setIsVerificationSending(true);
      await sendEmailVerification(user);

      // Simulate a loading effect
      await new Promise((resolve) => setTimeout(resolve, 1500));

      showNotification("Verification email sent", "success");
      setVerificationModalOpen(false);
    } catch (error) {
      console.error("Error sending verification email:", error);
      showNotification("Failed to send verification email", "error");
    } finally {
      setIsVerificationSending(false);
    }
  };

  const handleEditAttempt = () => {
    if (!user.emailVerified) {
      setVerificationModalOpen(true);
      return;
    }
    setEditing(true);
  };

  const handleDeleteAttempt = () => {
    if (!user.emailVerified) {
      // Show verification warning instead of delete modal
      showNotification(
        "Please verify your email before deleting account",
        "error"
      );
      setVerificationModalOpen(true);
      return;
    }
    // Open delete confirmation modal
    setDeleteConfirmModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    try {
      setIsSavingProfile(true);
      await updateProfile(user, { displayName: userData.displayName });

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        displayName: userData.displayName,
        bio: userData.bio,
        location: userData.location,
        profession: userData.profession,
        githubLink: userData.githubLink,
      });

      // Simulate a loading effect
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setEditing(false);
      showNotification("Profile updated", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification("Error updating profile", "error");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const confirmDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);

      // Simulate a more dramatic loading effect
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Delete profile photo
      if (user.photoURL && user.photoURL.includes("firebase")) {
        const photoRef = ref(storage, `profile_photos/${user.uid}`);
        await deleteObject(photoRef);
      }

      // Delete user documents
      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);

      showNotification("Account deleted", "success");
      navigate("/auth");
    } catch (error) {
      console.error("Error deleting account:", error);
      showNotification("Error deleting account", "error");
    } finally {
      setIsDeletingAccount(false);
      setDeleteConfirmModalOpen(false);
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
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-lg z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="flex items-center justify-between space-x-4">
            {notification.type === "success" ? (
              <CheckCircle />
            ) : (
              <AlertCircle />
            )}
            <p>{notification.message}</p>
            <button
              onClick={() =>
                setNotification({ show: false, message: "", type: "" })
              }
            >
              <X />
            </button>
          </div>
        </div>
      )}

      {/* Email Verification Modal */}
      {verificationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <ShieldAlert className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-yellow-500">
                Email Verification Required
              </h2>
            </div>
            <p className="text-gray-300 text-center mb-4">
              Please verify your email address to edit your profile or delete
              your account.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setVerificationModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                disabled={isVerificationSending}
              >
                Close
              </button>
              <button
                onClick={sendVerificationEmail}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
                disabled={isVerificationSending}
              >
                {isVerificationSending ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Verification Email"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="text-red-500 mr-2" size={24} />
              <h2 className="text-xl font-bold text-red-500">
                Confirm Account Deletion
              </h2>
            </div>
            <p className="text-gray-300 text-center mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone and will permanently remove all your data.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeleteConfirmModalOpen(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                disabled={isDeletingAccount}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteAccount}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                disabled={isDeletingAccount}
              >
                {isDeletingAccount ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="inline mr-2" /> Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>

          {/* Email Verification Badge */}
          {!user.emailVerified && (
            <div className="flex items-center text-yellow-500">
              <ShieldAlert className="mr-2" />
              <span className="text-sm">Email Not Verified</span>
            </div>
          )}

          <div className="flex space-x-2">
            {!editing && (
              <button
                onClick={handleEditAttempt}
                className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg"
                disabled={false}
              >
                Edit
              </button>
            )}
            {editing && (
              <button
                onClick={saveProfile}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded-lg flex items-center"
                disabled={isSavingProfile}
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="bg-gray-600 hover:bg-gray-700 px-3 py-1.5 rounded-lg"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Profile fields */}
          {Object.entries({
            displayName: "Name",
            email: "Email",
            location: "Location",
            profession: "Profession",
            githubLink: "GitHub",
            bio: "Bio",
          }).map(([key, label]) => (
            <div key={key}>
              <label className="block text-sm text-gray-400 mb-1">
                {label}
              </label>
              {editing ? (
                key === "bio" ? (
                  <textarea
                    name={key}
                    value={userData[key]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg p-2"
                  />
                ) : key === "email" ? (
                  <p>{userData[key]}</p>
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={userData[key]}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg p-2"
                  />
                )
              ) : (
                <p>{userData[key] || "Not set"}</p>
              )}
            </div>
          ))}
        </div>

        {/* Delete Account Section */}
        <div className="mt-8 border border-red-600 p-4 rounded-lg">
          <h3 className="text-red-500 mb-2">Delete Account</h3>
          <button
            onClick={handleDeleteAttempt}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg flex items-center"
          >
            <Trash2 className="inline mr-2" /> Delete Permanently
          </button>
          {!user.emailVerified && (
            <div className="mt-2 text-yellow-500 flex items-center">
              <ShieldAlert className="mr-2" />
              <span className="text-sm">
                Email verification required to delete account
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
