import { Routes, Route } from "react-router";
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
  useEffect(() => {
    logEvent(analytics, "user_visit", { timestamp: Date.now() });
  }, []);

  // Set user properties for segmentation
  setUserProperties(analytics, {
    user_type: "new", // Change to "returning" if needed
    device_type: window.innerWidth < 768 ? "mobile" : "desktop",
    country: "India", // You can fetch this dynamically using an API
  });

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <ScrollToTop /> {/* Ensures scroll resets on navigation */}
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/Codeplayground" element={<Codeplayground />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
