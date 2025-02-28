import { useEffect, useState, memo } from "react";
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

// Memoized components to prevent unnecessary re-renders
const TypingDots = memo(() => (
  <span className="inline-flex gap-1">
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-200"></span>
    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce animation-delay-400"></span>
  </span>
));
TypingDots.displayName = "TypingDots";

const Step = memo(({ icon, title, desc }) => (
  <div className="flex flex-col items-center">
    <div className="p-4 bg-white rounded-full">{icon}</div>
    <h3 className="text-lg font-semibold mt-3">{title}</h3>
    <p className="text-gray-400 mt-2">{desc}</p>
  </div>
));
Step.displayName = "Step";
Step.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

const ProblemCard = memo(({ problem }) => {
  const styles =
    DIFFICULTY_STYLES[problem.difficulty] || DIFFICULTY_STYLES.Medium;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center space-y-4">
      <h3 className="text-xl font-semibold text-white">{problem.title}</h3>
      <span
        className={`inline-block px-4 py-1 text-sm font-semibold rounded-full ${styles.badge}`}
      >
        {problem.difficulty}
      </span>
      <p className="text-gray-300">{problem.description}</p>
      <button
        className={`mt-3 px-4 py-2 rounded-lg font-semibold transition ${styles.button}`}
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
};

// Extracted to a separate component for better organization
const FeatureBox = memo(({ title, desc }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-green-500">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="text-gray-400 mt-2">{desc}</p>
  </div>
));
FeatureBox.displayName = "FeatureBox";
FeatureBox.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

// Static data moved outside the component
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
    icon: <TrendingUp size={40} className="text-green-500" />,
    title: "Choose Your Level",
    desc: "Select from Easy, Medium, or Hard challenges.",
  },
  {
    icon: <Code size={40} className="text-green-500" />,
    title: "Solve Problems",
    desc: "Write, test, and optimize your code in our editor.",
  },
  {
    icon: <CheckCircle size={40} className="text-green-500" />,
    title: "Get Instant Feedback",
    desc: "Receive immediate feedback with test cases.",
  },
  {
    icon: <UserCheck size={40} className="text-green-500" />,
    title: "Level Up",
    desc: "Unlock more challenges as you progress.",
  },
];

// Main component using custom hook for data fetching
const useHomeData = () => {
  const [heroQuote, setHeroQuote] = useState(null);
  const [heroMessage, setHeroMessage] = useState(null);
  const [featuredProblems, setFeaturedProblems] = useState(null);

  useEffect(() => {
    const heroDocRef = doc(db, "HomePage", "HeroSection");
    const problemsDocRef = doc(db, "HomePage", "Featured Problems");

    const unsubscribeHero = onSnapshot(heroDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHeroQuote(data?.HeroSectionQuotes?.[data?.WhichQoute]);
        setHeroMessage(data?.HeroSectionMessage?.[data?.WhichMessage]);
      }
    });

    const unsubscribeProblems = onSnapshot(problemsDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setFeaturedProblems(docSnap.data()?.FeaturedProblemsArray);
      }
    });

    return () => {
      unsubscribeHero();
      unsubscribeProblems();
    };
  }, []);

  return { heroQuote, heroMessage, featuredProblems };
};

// Updated Action Button with navigation
const ActionButton = memo(() => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Codeplayground");
  };

  return (
    <button
      onClick={handleClick}
      className="mt-5 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition cursor-pointer"
    >
      Start Coding Now
    </button>
  );
});
ActionButton.displayName = "ActionButton";

const Home = () => {
  const { heroQuote, heroMessage, featuredProblems } = useHomeData();

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold">
          Master Algorithms,{" "}
          <span className="text-green-500">{heroQuote || <TypingDots />}</span>
        </h1>
        <p className="text-lg mt-3 text-gray-300">
          {heroMessage || <TypingDots />}
        </p>
        <ActionButton />
      </section>

      {/* How It Works Section */}
      <section className="py-16 text-center bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-8 text-green-500">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 px-10">
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

      {/* Featured Problems */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-8 text-green-500">
          Featured Problems
        </h2>

        <div className="grid md:grid-cols-3 gap-6 px-10">
          {featuredProblems === null
            ? Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className="h-40 bg-gray-700 animate-pulse rounded-lg"
                />
              ))
            : featuredProblems.map((problem, index) => (
                <ProblemCard key={index} problem={problem} />
              ))}
        </div>
      </section>

      {/* Why AlgoArena */}
      <section className="py-16 text-center bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-8 text-green-500">
          Why <span className="text-green-500">AlgoArena?</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 px-10">
          {WHY_ALGO_ARENA.map((item, index) => (
            <FeatureBox key={index} title={item.title} desc={item.desc} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gray-900 text-white">
        <h2 className="text-3xl font-bold">
          Ready to <span className="text-green-500">sharpen</span> your
          algorithm skills?
        </h2>
        <ActionButton />
      </section>
    </div>
  );
};

// Add display name to the main component
Home.displayName = "Home";

export default Home;
