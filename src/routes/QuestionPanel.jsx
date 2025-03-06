import { useState, useEffect, memo } from "react";
import {
  FileText,
  TrendingUp,
  Award,
  AlignLeft,
  Maximize,
  Check,
  Save,
} from "lucide-react";
import PropTypes from "prop-types";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";

// Difficulty levels
const DIFFICULTY_LEVELS = [
  {
    value: "easy",
    label: "Easy",
    icon: AlignLeft,
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700",
    textColor: "text-green-500",
    description:
      "Great for beginners. Fundamental concepts and straightforward solutions.",
  },
  {
    value: "medium",
    label: "Medium",
    icon: TrendingUp,
    color: "bg-yellow-600",
    hoverColor: "hover:bg-yellow-700",
    textColor: "text-yellow-500",
    description:
      "Intermediate challenge. Requires good problem-solving skills.",
  },
  {
    value: "hard",
    label: "Hard",
    icon: Award,
    color: "bg-red-600",
    hoverColor: "hover:bg-red-700",
    textColor: "text-red-500",
    description:
      "Advanced problems. Tests in-depth knowledge and optimization skills.",
  },
];

// Redesigned Difficulty Card
const DifficultyCard = ({ difficulty, isSelected, onSelect }) => {
  const {
    value,
    label,
    icon: Icon,
    color,
    hoverColor,
    textColor,
    description,
  } = difficulty;

  return (
    <div
      className={`cursor-pointer p-2 sm:p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? `border-${textColor.split("-")[1]}-500 shadow-lg`
          : "border-gray-700 hover:border-gray-500"
      } flex flex-col`}
      onClick={() => onSelect(value)}
    >
      <div className="flex items-center mb-2 sm:mb-3">
        <div className={`p-1 sm:p-2 rounded-md ${color} mr-2 sm:mr-3`}>
          <Icon size={14} className="sm:w-4 sm:h-4" />
        </div>
        <h3 className={`text-xs sm:text-sm font-bold ${textColor}`}>{label}</h3>
      </div>

      <p className="text-xs sm:text-sm text-gray-400 flex-grow mb-2 sm:mb-3">
        {description}
      </p>

      <button
        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-white font-medium text-xs sm:text-sm ${color} ${hoverColor} transition-colors w-full`}
      >
        {label}
      </button>
    </div>
  );
};

DifficultyCard.propTypes = {
  difficulty: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// Modify QuestionContent to handle null questions and solved status
const QuestionContent = memo(
  ({ question, difficulty, isSolved, onMarkSolved, isSubmitting }) => {
    // If no question is provided, return null or a placeholder
    if (!question) {
      return (
        <div className="p-2 text-center text-gray-400">
          No question available. Please select a difficulty level.
        </div>
      );
    }

    const { label, textColor } =
      DIFFICULTY_LEVELS.find((d) => d.value === difficulty) || {};

    const { title, description, example } = question;

    return (
      <div className="p-2">
        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-2">
          <div className="flex items-center gap-2">
            {label && (
              <span
                className={`px-1 py-0.5 sm:px-2 sm:py-1 rounded-md ${textColor} bg-opacity-20 text-xs sm:text-sm font-medium`}
              >
                {label}
              </span>
            )}
            <h2 className="text-base sm:text-xl font-bold">{title}</h2>
          </div>

          <button
            onClick={onMarkSolved}
            disabled={isSolved || isSubmitting}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
              isSolved
                ? "bg-green-700 text-white cursor-not-allowed"
                : isSubmitting
                ? "bg-gray-600 text-gray-300 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSolved ? (
              <>
                <Check size={14} className="sm:w-4 sm:h-4" /> Solved
              </>
            ) : (
              <>
                <Save size={14} className="sm:w-4 sm:h-4" /> Mark as Solved
              </>
            )}
          </button>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="mb-3 sm:mb-4 text-sm sm:text-base">{description}</p>

          <div className="mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">
              Example:
            </h3>
            <pre className="bg-gray-900 p-2 sm:p-3 rounded-lg overflow-x-auto whitespace-pre-wrap text-xs sm:text-sm">
              {example}
            </pre>
          </div>
        </div>
      </div>
    );
  }
);

QuestionContent.displayName = "QuestionContent";

QuestionContent.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    example: PropTypes.string,
  }),
  difficulty: PropTypes.string.isRequired,
  isSolved: PropTypes.bool,
  onMarkSolved: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

const QuestionPanel = ({
  onToggleFullScreen,
  onDifficultySelected,
  onNextQuestion,
  onExitChallenge,
  initialDifficulty,
  initialQuestion,
  userId, // Add userId prop for tracking solved questions
}) => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(initialDifficulty);
  const [showSelection, setShowSelection] = useState(!initialDifficulty);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [questions, setQuestions] = useState({
    easy: [],
    medium: [],
    hard: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allSolved, setAllSolved] = useState(false);

  // Fetch all questions from Firestore and user's solved questions on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch questions
        const questionsCollection = collection(db, "Questions");

        const fetchDifficultyQuestions = async (difficulty) => {
          const docRef = doc(questionsCollection, difficulty);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Convert the document data object to an array of questions
            return Object.keys(data).map((key) => ({
              id: key,
              title: data[key].question || data[key].title,
              description: data[key].description,
              example: data[key].example,
            }));
          }
          return [];
        };

        const [easy, medium, hard] = await Promise.all([
          fetchDifficultyQuestions("Easy"),
          fetchDifficultyQuestions("Medium"),
          fetchDifficultyQuestions("Hard"),
        ]);

        setQuestions({
          easy,
          medium,
          hard,
        });

        // Fetch user's solved questions if userId is provided
        if (userId) {
          const userDocRef = doc(db, "users", userId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.solvedQuestions) {
              setSolvedQuestions(userData.solvedQuestions);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Effect to handle initial difficulty and question
  useEffect(() => {
    if (initialDifficulty && questions[initialDifficulty]?.length > 0) {
      setSelectedDifficulty(initialDifficulty);
      setShowSelection(false);
      setLoading(true); // Show loading while checking
      setAllSolved(false);

      const difficultyQuestions = questions[initialDifficulty];

      // Find the first unsolved question in this difficulty
      const firstUnsolvedIndex = difficultyQuestions.findIndex(
        (q) => !solvedQuestions.includes(q.id)
      );

      // If there's an unsolved question, use it
      if (firstUnsolvedIndex !== -1) {
        setCurrentQuestionIndex(firstUnsolvedIndex);
        setCurrentQuestion(difficultyQuestions[firstUnsolvedIndex]);
      } else {
        // All questions are solved
        setAllSolved(true);
        setCurrentQuestionIndex(0);
        setCurrentQuestion(difficultyQuestions[0]);
      }

      // Ensure difficulty is set in parent component
      if (onDifficultySelected) {
        onDifficultySelected(initialDifficulty);
      }

      setLoading(false); // Hide loading after question is found
    }
  }, [initialDifficulty, questions, solvedQuestions, onDifficultySelected]);

  const handleSelectDifficulty = (difficulty) => {
    if (questions[difficulty]?.length > 0) {
      setSelectedDifficulty(difficulty);
      setShowSelection(false);

      // Select first question of the difficulty
      const firstQuestion = questions[difficulty][0];
      setCurrentQuestion(firstQuestion);
      setCurrentQuestionIndex(0);

      // Notify parent component
      if (onDifficultySelected) {
        onDifficultySelected(difficulty);
      }
    } else {
      setError(`No questions available for ${difficulty} difficulty.`);
    }
  };

  const handleReset = () => {
    setSelectedDifficulty(null);
    setShowSelection(true);
    setCurrentQuestionIndex(0);
    setCurrentQuestion(null);

    // Notify parent component
    if (onExitChallenge) {
      onExitChallenge();
    }
  };

  const handleNextQuestion = () => {
    if (selectedDifficulty && questions[selectedDifficulty]?.length > 0) {
      setLoading(true); // Show loading while finding next unsolved question

      const difficultyQuestions = questions[selectedDifficulty];

      // Try to find the next unsolved question
      let nextIndex = (currentQuestionIndex + 1) % difficultyQuestions.length;
      const startIndex = nextIndex; // Save where we started to avoid infinite loop

      // Keep looking for an unsolved question, but don't loop forever
      let foundUnsolved = false;
      while (!foundUnsolved) {
        if (!solvedQuestions.includes(difficultyQuestions[nextIndex].id)) {
          foundUnsolved = true;
          break;
        }

        nextIndex = (nextIndex + 1) % difficultyQuestions.length;

        // If we've checked all questions and they're all solved, break
        if (nextIndex === startIndex) {
          break;
        }
      }

      if (foundUnsolved) {
        setAllSolved(false);
      } else {
        setAllSolved(true);
      }

      const nextQuestion = difficultyQuestions[nextIndex];
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(nextQuestion);

      // Notify parent component
      if (onNextQuestion) {
        onNextQuestion(nextQuestion);
      }

      setLoading(false); // Hide loading after question is found
    }
  };

  // Check if current question is solved
  const isQuestionSolved = () => {
    return currentQuestion && solvedQuestions.includes(currentQuestion.id);
  };

  // Mark current question as solved
  const handleMarkSolved = async () => {
    if (!userId) {
      setError(
        "You need to be logged in to save your progress. Please sign in."
      );
      return;
    }

    if (!currentQuestion || isQuestionSolved() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const userDocRef = doc(db, "users", userId);

      // Check if user document exists
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Update existing document with the new solved question
        await updateDoc(userDocRef, {
          solvedQuestions: arrayUnion(currentQuestion.id),
        });
        console.log("Question marked as solved (updated):", currentQuestion.id);
      } else {
        // Create new user document with solved questions array
        await setDoc(userDocRef, {
          solvedQuestions: [currentQuestion.id],
        });
        console.log(
          "Question marked as solved (new user doc):",
          currentQuestion.id
        );
      }

      // Update local state
      setSolvedQuestions((prev) => [...prev, currentQuestion.id]);
    } catch (err) {
      console.error("Error marking question as solved:", err);
      setError("Failed to save progress. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-1 sm:p-2 md:p-3 flex flex-col h-full">
      <div className="sticky top-0 bg-gray-800 z-10">
        <div className="flex justify-between items-center pb-2 border-b border-gray-700 mb-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <FileText size={16} className="sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Question</span>
            {!showSelection &&
              currentQuestion &&
              solvedQuestions.length > 0 && (
                <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full ml-2">
                  Solved {solvedQuestions.length} questions
                </span>
              )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {!showSelection && (
              <>
                <button
                  onClick={handleReset}
                  className="px-2 py-1 sm:px-4 sm:py-1 bg-gray-700 hover:bg-gray-600 rounded font-medium text-xs sm:text-sm transition-colors"
                >
                  Exit
                </button>
                {!allSolved && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-2 py-1 sm:px-4 sm:py-1 bg-blue-600 hover:bg-blue-700 rounded font-medium text-xs sm:text-sm transition-colors"
                  >
                    Next
                  </button>
                )}
              </>
            )}
            <button
              onClick={onToggleFullScreen}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Toggle question fullscreen"
            >
              <Maximize size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400">Loading questions...</p>
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-400">
            <p>{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              Dismiss
            </button>
          </div>
        ) : showSelection ? (
          <div className="p-1 sm:p-2">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-6 text-center">
              Select Difficulty Level
            </h2>
            <div className="grid grid-cols-1 gap-2 sm:gap-4">
              {DIFFICULTY_LEVELS.map((difficulty) => (
                <DifficultyCard
                  key={difficulty.value}
                  difficulty={difficulty}
                  isSelected={selectedDifficulty === difficulty.value}
                  onSelect={handleSelectDifficulty}
                />
              ))}
            </div>

            <div className="mt-4 sm:mt-8 p-2 sm:p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="text-sm sm:text-lg font-semibold mb-2">
                Coding Challenge Tips
              </h3>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                <li>Read the problem statement carefully before starting</li>
                <li>Consider edge cases in your solution</li>
                <li>Test your code with various inputs</li>
                <li>Optimize your solution if time permits</li>
                <li>Start with a brute force approach, then refine</li>
              </ul>
            </div>
          </div>
        ) : allSolved ? (
          <div className="flex flex-col justify-center items-center h-full p-4 text-center">
            <div className="text-2xl text-green-500 mb-4">
              <Check size={48} />
            </div>
            <h2 className="text-xl font-bold mb-3 text-green-400">
              Great! All available questions are solved.
            </h2>
            <p className="text-gray-400 mb-6">
              You have completed all questions in this difficulty level.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded font-medium text-sm transition-colors"
            >
              Choose Another Difficulty
            </button>
          </div>
        ) : (
          <QuestionContent
            question={currentQuestion}
            difficulty={selectedDifficulty}
            isSolved={isQuestionSolved()}
            onMarkSolved={handleMarkSolved}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

QuestionPanel.propTypes = {
  onToggleFullScreen: PropTypes.func.isRequired,
  onDifficultySelected: PropTypes.func,
  onNextQuestion: PropTypes.func,
  onExitChallenge: PropTypes.func,
  initialDifficulty: PropTypes.string,
  initialQuestion: PropTypes.object,
  userId: PropTypes.string, // Add userId prop
};

QuestionPanel.defaultProps = {
  initialDifficulty: null,
  initialQuestion: null,
  userId: null,
};

export default QuestionPanel;
