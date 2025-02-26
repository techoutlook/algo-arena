import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import About from "./routes/About";
import Contacts from "./routes/Contact";
import Products from "./routes/Products";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-16">
        {" "}
        {/* Ensures content takes up available space */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
      <Footer /> {/* Always at the bottom */}
    </div>
  );
}

export default App;
