import PropTypes from "prop-types";
import { CheckCircle, Code, TrendingUp, UserCheck } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gray-900 text-white">
        <h1 className="text-4xl font-bold">
          Master Algorithms,{" "}
          <span className="text-green-500">One Challenge at a Time</span>
        </h1>
        <p className="text-lg mt-3 text-gray-300">
          Progressive coding challenges to elevate your programming skills
        </p>
        <button className="mt-5 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
          Start Coding Now
        </button>
      </section>

      {/* How It Works Section */}
      <section className="py-16 text-center bg-gray-900 text-white">
        <h2 className="text-3xl font-bold mb-8 text-green-500">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8 px-10">
          <Step
            icon={<TrendingUp size={40} className="text-green-500" />}
            title="Choose Your Level"
            desc="Select from Easy, Medium, or Hard challenges."
          />
          <Step
            icon={<Code size={40} className="text-green-500" />}
            title="Solve Problems"
            desc="Write, test, and optimize your code in our editor."
          />
          <Step
            icon={<CheckCircle size={40} className="text-green-500" />}
            title="Get Instant Feedback"
            desc="Receive immediate feedback with test cases."
          />
          <Step
            icon={<UserCheck size={40} className="text-green-500" />}
            title="Level Up"
            desc="Unlock more challenges as you progress."
          />
        </div>
      </section>

      {/* Featured Problems */}
      <section className="py-16 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Problems
        </h2>
        <div className="grid md:grid-cols-3 gap-6 px-10">
          {featuredProblems.map((problem, index) => (
            <ProblemCard key={index} problem={problem} />
          ))}
        </div>
      </section>

      {/* Why AlgoArena */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Why AlgoArena?</h2>
        <div className="grid md:grid-cols-2 gap-8 px-10">
          {whyAlgoArena.map((item, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-400 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-gradient-to-r from-purple-700 to-blue-600">
        <h2 className="text-3xl font-bold">
          Ready to sharpen your algorithm skills?
        </h2>
        <button className="mt-5 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
          Start Coding Now
        </button>
      </section>
    </div>
  );
};

// ✅ Step Component with FIXED Prop Validation
const Step = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center">
    <div className="p-4 bg-white rounded-full">{icon}</div>
    <h3 className="text-lg font-semibold mt-3">{title}</h3>
    <p className="text-gray-400 mt-2">{desc}</p>
  </div>
);

Step.propTypes = {
  icon: PropTypes.element.isRequired, // ✅ FIXED: React element validation
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

// ✅ Problem Card Component with Prop Validation
const ProblemCard = ({ problem }) => (
  <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold">{problem.title}</h3>
    <span
      className={`inline-block mt-2 px-3 py-1 text-sm rounded ${
        problem.difficulty === "Easy"
          ? "bg-green-600"
          : problem.difficulty === "Medium"
          ? "bg-yellow-600"
          : "bg-red-600"
      }`}
    >
      {problem.difficulty}
    </span>
    <p className="text-gray-400 mt-2">{problem.description}</p>
    <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
      Try This Problem
    </button>
  </div>
);

ProblemCard.propTypes = {
  problem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

// ✅ Sample Data
const featuredProblems = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Find two numbers that add up to a target value.",
  },
  {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Find the longest substring without repeating characters.",
  },
  {
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    description: "Merge multiple sorted linked lists into one sorted list.",
  },
];

const whyAlgoArena = [
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

export default Home;
