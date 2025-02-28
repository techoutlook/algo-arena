import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Blogs from "./routes/Blogs";
import Contactus from "./routes/Contactus";
import Codeplayground from "./routes/Codeplayground";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import { analytics } from "./firebase";
import { logEvent, setUserProperties } from "firebase/analytics";

function App() {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, "user_visit", { timestamp: Date.now() });
  }, []);

  // Set user properties for segmentation
  setUserProperties(analytics, {
    user_type: "new",
    device_type: window.innerWidth < 768 ? "mobile" : "desktop",
    country: "India",
  });

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <ScrollToTop />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/codeplayground" element={<Codeplayground />} />
          </Routes>
        </div>
        {location.pathname !== "/codeplayground" && <Footer />}
      </div>
    </>
  );
}

export default App;
