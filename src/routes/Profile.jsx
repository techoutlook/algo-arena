import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/auth");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 w-full flex items-center justify-center">
      <div className="flex flex-col items-center max-w-3xl gap-5 bg-white p-8 shadow-md rounded-xl">
        <h1 className="text-4xl font-bold text-black">Profile</h1>

        {user ? (
          <>
            <p className="text-lg text-gray-700">
              Welcome,{" "}
              <span className="font-semibold">
                {user.displayName || user.email}
              </span>
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Sign Out
            </button>
          </>
        ) : (
          <p className="text-lg text-gray-500">No user logged in</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
