import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import About from "./routes/About";
import Contacts from "./routes/Contact";
import Products from "./routes/Products";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; // Import the ScrollToTop component

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <ScrollToTop /> {/* Ensures scroll resets on navigation */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
