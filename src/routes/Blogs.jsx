import { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { BookText, TrendingUp, Star, Clock } from "lucide-react";

// Blog category components
import WisdomWall from "./blog/WisdomWall";
import Trending from "./blog/Trending";
import Popular from "./blog/Popular";
import RecentPosts from "./blog/RecentPosts";
import ScribbledTank from "./blog/ScribbledTank";

function Blogs() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/blogs");

  useEffect(() => {
    // Set active tab based on current location
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Define sub-navbar links
  const subNavLinks = [
    { path: "/blogs", label: "Wisdom Wall", icon: <BookText size={18} /> },
    {
      path: "/blogs/scribbled",
      label: "Scribbled Tank",
      icon: <BookText size={18} />,
    },
    {
      path: "/blogs/trending",
      label: "Trending",
      icon: <TrendingUp size={18} />,
    },
    { path: "/blogs/popular", label: "Popular", icon: <Star size={18} /> },
    { path: "/blogs/recent", label: "Recent Posts", icon: <Clock size={18} /> },
  ];

  // Category cards data
  const categoryCards = [
    {
      id: "scribbled",
      path: "/blogs/scribbled",
      title: "Scribbled Tank",
      icon: <BookText size={32} />,
      description:
        "A space for raw ideas, experimental content, and brainstorming.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverColor: "hover:bg-purple-200",
    },
    {
      id: "trending",
      path: "/blogs/trending",
      title: "Trending",
      icon: <TrendingUp size={32} />,
      description: "The hottest and most discussed blog posts.",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
      hoverColor: "hover:bg-red-200",
    },
    {
      id: "popular",
      path: "/blogs/popular",
      title: "Popular",
      icon: <Star size={32} />,
      description: "The most-read and highly-rated articles.",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
      hoverColor: "hover:bg-yellow-200",
    },
    {
      id: "recent",
      path: "/blogs/recent",
      title: "Recent Posts",
      icon: <Clock size={32} />,
      description: "Freshly published blogs and latest insights.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      hoverColor: "hover:bg-green-200",
    },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      {/* Main content wrapper with proper stacking context */}
      <div className="relative">
        {/* Sub Navbar with fixed width and proper handling of space */}
        <div className="sticky top-16 z-50 bg-green-50 shadow-sm border-b border-gray-200 w-full">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-14">
              {/* Add min-width to prevent compression and use flex-shrink-0 on items */}
              <div className="flex items-center justify-center space-x-1 sm:space-x-4 overflow-x-auto scrollbar-hide min-w-0 flex-grow">
                {subNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors duration-200 flex-shrink-0 ${
                      activeTab === link.path
                        ? "bg-gray-100 text-green-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-500"
                    }`}
                  >
                    <span className="mr-1.5 flex-shrink-0">{link.icon}</span>
                    <span className="flex-shrink-0">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area with proper spacing */}
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Hero Section */}
                  <div className="text-center mb-10 mt-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
                      🏛️ Wisdom Wall
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      ✨ A space where knowledge meets experience—read, learn,
                      and grow!
                    </p>
                  </div>

                  {/* Category Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {categoryCards.map((card) => (
                      <Link
                        key={card.id}
                        to={card.path}
                        className={`flex flex-col p-6 rounded-xl shadow-sm ${card.bgColor} ${card.hoverColor} transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md`}
                      >
                        <div className={`mb-4 ${card.iconColor}`}>
                          {card.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">
                          {card.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {card.description}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Recent Featured Posts Section */}
                  <WisdomWall />
                </>
              }
            />
            <Route path="/trending" element={<Trending />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/recent" element={<RecentPosts />} />
            <Route path="/scribbled" element={<ScribbledTank />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
