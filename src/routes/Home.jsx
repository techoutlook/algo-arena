import { useEffect, useState, memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Code, TrendingUp, UserCheck } from "lucide-react";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

// Extracted to constants
const DIFFICULTY_STYLES = {
  Easy: {
    badge: "bg-green-600 text-white",
    button: "bg-green-500 text-white hover:bg-green-600",
    buttonText: "It could be easy for you.",
  },
  Medium: {
    badge: "bg-yellow-500 text-gray-900",
    button: "bg-yellow-500 text-gray-900 hover:bg-yellow-600",
    buttonText: "Needs your focus to crack it.",
  },
  Hard: {
    badge: "bg-red-600 text-white",
    button: "bg-red-600 text-white hover:bg-red-700",
    buttonText: "Push your limits to solve this one!",
  },
};

// Static data defined outside component to prevent recreation
const WHY_ALGO_ARENA = [
  {
    title: "Practice That Matters",
    desc: "Carefully crafted problems that mirror real-world coding interviews.",
  },
  {
    title: "Learn By Doing",
    desc: "No lengthy tutorials—improve through hands-on problem solving.",
  },
  {
    title: "Track Your Progress",
    desc: "Watch your skills grow as you advance through difficulty levels.",
  },
  {
    title: "Built For Everyone",
    desc: "Whether you're a student, job seeker, or experienced developer.",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    icon: <TrendingUp size={24} className="text-green-500" />,
    title: "Choose Your Level",
    desc: "Select from Easy, Medium, or Hard challenges.",
  },
  {
    icon: <Code size={24} className="text-green-500" />,
    title: "Solve Problems",
    desc: "Write, test, and optimize your code in our editor.",
  },
  {
    icon: <CheckCircle size={24} className="text-green-500" />,
    title: "Get Instant Feedback",
    desc: "Receive immediate feedback with test cases.",
  },
  {
    icon: <UserCheck size={24} className="text-green-500" />,
    title: "Level Up",
    desc: "Unlock more challenges as you progress.",
  },
];

// Simplified TypingDots component with improved animation
const TypingDots = memo(() => (
  <span className="inline-flex gap-1" aria-label="Loading content">
    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
  </span>
));
TypingDots.displayName = "TypingDots";

// Simplified Step component with reduced props
const Step = memo(({ icon, title, desc }) => (
  <div className="flex flex-col items-center px-2">
    <div className="p-3 bg-white rounded-full" aria-hidden="true">
      {icon}
    </div>
    <h3 className="text-base font-semibold mt-2 text-center">{title}</h3>
    <p className="text-gray-400 mt-1 text-sm text-center">{desc}</p>
  </div>
));
Step.displayName = "Step";
Step.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

// ProblemCard with optimized rendering
const ProblemCard = memo(({ problem, onClick }) => {
  const styles =
    DIFFICULTY_STYLES[problem.difficulty] || DIFFICULTY_STYLES.Medium;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center space-y-3 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{problem.title}</h3>
        <span
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 ${styles.badge}`}
          aria-label={`Difficulty: ${problem.difficulty}`}
        >
          {problem.difficulty}
        </span>
        <p className="text-gray-300 text-sm mt-2">{problem.description}</p>
      </div>
      <button
        onClick={onClick}
        className={`mt-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${styles.button}`}
        aria-label={`Try ${problem.title}`}
      >
        {styles.buttonText}
      </button>
    </div>
  );
});
ProblemCard.displayName = "ProblemCard";
ProblemCard.propTypes = {
  problem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

// Simplified FeatureBox component
const FeatureBox = memo(({ title, desc }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-green-500 h-full">
    <h3 className="text-lg font-semibold text-white">{title}</h3>
    <p className="text-gray-400 mt-2 text-sm">{desc}</p>
  </div>
));
FeatureBox.displayName = "FeatureBox";
FeatureBox.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

// Custom hook for data fetching with error handling and performance optimizations
const useHomeData = () => {
  const [homeData, setHomeData] = useState({
    heroQuote: null,
    heroMessage: null,
    featuredProblems: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Use a state variable to track mounted status
    let isMounted = true;

    const heroDocRef = doc(db, "HomePage", "HeroSection");
    const problemsDocRef = doc(db, "HomePage", "Featured Problems");

    const unsubscribeHero = onSnapshot(
      heroDocRef,
      (docSnap) => {
        if (docSnap.exists() && isMounted) {
          const data = docSnap.data();
          setHomeData((prev) => ({
            ...prev,
            heroQuote: data?.HeroSectionQuotes?.[data?.WhichQoute],
            heroMessage: data?.HeroSectionMessage?.[data?.WhichMessage],
            isLoading: !prev.featuredProblems,
          }));
        }
      },
      (error) => {
        console.error("Error fetching hero data:", error);
        if (isMounted) {
          setHomeData((prev) => ({
            ...prev,
            error: "Failed to load content. Please try again later.",
          }));
        }
      }
    );

    const unsubscribeProblems = onSnapshot(
      problemsDocRef,
      (docSnap) => {
        if (docSnap.exists() && isMounted) {
          setHomeData((prev) => ({
            ...prev,
            featuredProblems: docSnap.data()?.FeaturedProblemsArray,
            isLoading: !prev.heroQuote && !prev.heroMessage,
          }));
        }
      },
      (error) => {
        console.error("Error fetching problems:", error);
        if (isMounted) {
          setHomeData((prev) => ({
            ...prev,
            error: "Failed to load content. Please try again later.",
          }));
        }
      }
    );

    return () => {
      isMounted = false;
      unsubscribeHero();
      unsubscribeProblems();
    };
  }, []);

  return homeData;
};

// Simplified ActionButton with navigation
const ActionButton = memo(({ text = "Start Coding Now", onClick }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      navigate("/codeplayground");
    }
  }, [navigate, onClick]);

  return (
    <button
      onClick={handleClick}
      className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-semibold hover:bg-green-600 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
    >
      {text}
    </button>
  );
});
ActionButton.displayName = "ActionButton";
ActionButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

// Optimized useDocumentMeta hook
const useDocumentMeta = (title, description) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;

    // Add preconnect for performance
    const addPreconnect = (url) => {
      if (!document.querySelector(`link[href="${url}"]`)) {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = url;
        document.head.appendChild(link);
      }
    };

    // Add preconnect for Firebase
    addPreconnect("https://firestore.googleapis.com");

    // Add preload for critical fonts
    ["https://fonts.googleapis.com", "https://fonts.gstatic.com"].forEach(
      addPreconnect
    );
  }, [title, description]);
};

// Main component with performance optimizations
const Home = () => {
  const { heroQuote, heroMessage, featuredProblems, isLoading, error } =
    useHomeData();
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navigate = useNavigate();

  // Set SEO meta tags
  useDocumentMeta(
    "AlgoArena - Master Algorithms & Ace Coding Interviews",
    "Practice coding problems, improve your algorithm skills, and prepare for technical interviews with AlgoArena's interactive coding platform."
  );

  // Navigation callbacks
  const goToCodePlayground = useCallback(() => {
    navigate("/codeplayground");
  }, [navigate]);

  const handleProblemClick = useCallback(
    (problemId) => {
      navigate(`/problem/${problemId}`);
    },
    [navigate]
  );

  // Get navbar height with a more efficient approach
  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(updateNavbarHeight);

    // Update on resize with debounce for better performance
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateNavbarHeight, 100);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Optimized skeleton loaders
  const problemSkeletons = useMemo(
    () =>
      Array.from({ length: 3 }, (_, index) => (
        <div
          key={index}
          className="h-32 bg-gray-700 animate-pulse rounded-lg"
          aria-hidden="true"
        />
      )),
    []
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold text-red-500 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-300 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <main
      className="bg-gray-900 text-white"
      style={{ paddingTop: navbarHeight ? `${navbarHeight}px` : "3.5rem" }}
    >
      {/* Hero Section - Optimized */}
      <section className="text-center py-10 px-4 bg-gray-900 text-white">
        <h1 className="text-2xl font-bold">
          Master Algorithms,{" "}
          <span className="text-green-500">{heroQuote || <TypingDots />}</span>
        </h1>
        <p className="text-base mt-3 text-gray-300 max-w-2xl mx-auto">
          {heroMessage || <TypingDots />}
        </p>
        <ActionButton />
      </section>

      {/* How It Works Section - Optimized */}
      <section
        className="py-10 text-center bg-gray-900 text-white px-4"
        aria-labelledby="how-it-works-heading"
      >
        <h2
          id="how-it-works-heading"
          className="text-xl font-bold mb-6 text-green-500"
        >
          How It Works
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <Step
              key={index}
              icon={step.icon}
              title={step.title}
              desc={step.desc}
            />
          ))}
        </div>
      </section>

      {/* Featured Problems - Optimized */}
      <section
        className="py-10 bg-gray-900 text-white text-center px-4"
        aria-labelledby="featured-problems-heading"
      >
        <h2
          id="featured-problems-heading"
          className="text-xl font-bold mb-6 text-green-500"
        >
          Featured Problems
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
          {isLoading || !featuredProblems
            ? problemSkeletons
            : featuredProblems.map((problem, index) => (
                <ProblemCard
                  key={problem.id || index}
                  problem={problem}
                  onClick={() => handleProblemClick(problem.id || index)}
                />
              ))}
        </div>
      </section>

      {/* Why AlgoArena - Optimized */}
      <section
        className="py-10 text-center bg-gray-900 text-white px-4"
        aria-labelledby="why-algoarena-heading"
      >
        <h2
          id="why-algoarena-heading"
          className="text-xl font-bold mb-6 text-green-500"
        >
          Why <span className="text-green-500">AlgoArena?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
          {WHY_ALGO_ARENA.map((item, index) => (
            <FeatureBox key={index} title={item.title} desc={item.desc} />
          ))}
        </div>
      </section>

      {/* Call to Action - Optimized */}
      <section className="text-center py-10 bg-gray-900 text-white px-4">
        <h2 className="text-xl font-bold">
          Ready to <span className="text-green-500">sharpen</span> your
          algorithm skills?
        </h2>
        <ActionButton onClick={goToCodePlayground} />
      </section>
    </main>
  );
};

Home.displayName = "Home";

export default memo(Home);
