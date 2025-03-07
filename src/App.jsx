import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { analytics } from "./firebase";
import { logEvent, setUserProperties } from "firebase/analytics";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./routes/Home";
import Blogs from "./routes/Blogs";
import Contactus from "./routes/Contactus";
import Codeplayground from "./routes/Codeplayground";
import AuthPage from "./components/AuthPage";
import Profile from "./routes/Profile";

function App() {
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Log user visit only once
  useEffect(() => {
    logEvent(analytics, "user_visit", { timestamp: Date.now() });

    setUserProperties(analytics, {
      user_type: "new",
      device_type: window.innerWidth < 768 ? "mobile" : "desktop",
      country: "India",
    });
  }, []);

  // Memoized function to calculate navbar height
  const updateNavbarHeight = useMemo(() => {
    return () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        const newHeight = navbar.offsetHeight;
        if (newHeight !== navbarHeight) {
          setNavbarHeight(newHeight);
        }
      }
    };
  }, [navbarHeight]);

  // Effect to handle navbar height changes
  useEffect(() => {
    updateNavbarHeight(); // Initial measurement

    window.addEventListener("resize", updateNavbarHeight);

    // Observe navbar changes
    const observer = new MutationObserver(updateNavbarHeight);
    const navbar = document.querySelector("nav");
    if (navbar) {
      observer.observe(navbar, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
      observer.disconnect();
    };
  }, [updateNavbarHeight]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <ScrollToTop />
      <div style={{ paddingTop: navbarHeight ? `${navbarHeight}px` : "5rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/*" element={<Blogs />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/codeplayground" element={<Codeplayground />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {location.pathname !== "/codeplayground" &&
        location.pathname !== "/auth" && <Footer />}
    </div>
  );
}

export default App;
