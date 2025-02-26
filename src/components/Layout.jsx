import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Ensures content takes available space */}
        <Outlet /> {/* Renders the current page content */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
