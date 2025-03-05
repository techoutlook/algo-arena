import { useState, useEffect, memo } from "react";
import {
  FileText,
  TrendingUp,
  Award,
  AlignLeft,
  Maximize,
  Minimize,
} from "lucide-react";
import PropTypes from "prop-types";

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

// Sample questions for each difficulty level
const SAMPLE_QUESTIONS = {
  easy: [
    {
      title: "Two Sum",
      description:
        "Given an array of integers and a target, return indices of two numbers that add up to the target.",
      example: `Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    },
    {
      title: "Reverse String",
      description:
        "Write a function that reverses a string. The input string is given as an array of characters.",
      example: `Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]`,
    },
  ],
  medium: [
    {
      title: "Add Two Numbers",
      description:
        "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list.",
      example: `Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.`,
    },
    {
      title: "Longest Substring Without Repeating Characters",
      description:
        "Given a string, find the length of the longest substring without repeating characters.",
      example: `Input: "abcabcbb"
Output: 3
Explanation: The longest substring is "abc", with length 3.`,
    },
  ],
  hard: [
    {
      title: "Median of Two Sorted Arrays",
      description:
        "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
      example: `Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: Merged array = [1,2,3] and median is 2.`,
    },
    {
      title: "Merge k Sorted Lists",
      description:
        "Merge k sorted linked lists and return it as a sorted list.",
      example: `Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]`,
    },
  ],
};

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

// Modify QuestionContent to handle null questions
const QuestionContent = memo(({ question, difficulty }) => {
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
      <div className="flex items-center gap-1 sm:gap-2 mb-2">
        {label && (
          <span
            className={`px-1 py-0.5 sm:px-2 sm:py-1 rounded-md ${textColor} bg-opacity-20 text-xs sm:text-sm font-medium`}
          >
            {label}
          </span>
        )}
        <h2 className="text-base sm:text-xl font-bold">{title}</h2>
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
});

QuestionContent.displayName = "QuestionContent";

QuestionContent.propTypes = {
  question: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    example: PropTypes.string,
  }),
  difficulty: PropTypes.string.isRequired,
};

const QuestionPanel = ({
  onToggleFullScreen,
  onDifficultySelected,
  onNextQuestion,
  onExitChallenge,
  initialDifficulty,
  initialQuestion,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState(initialDifficulty);
  const [showSelection, setShowSelection] = useState(!initialDifficulty);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);

  // Effect to handle initial difficulty and question
  useEffect(() => {
    if (initialDifficulty) {
      setSelectedDifficulty(initialDifficulty);
      setShowSelection(false);

      // If no initial question, select first question of the difficulty
      if (!initialQuestion) {
        const firstQuestion = SAMPLE_QUESTIONS[initialDifficulty][0];
        setCurrentQuestion(firstQuestion);
        setCurrentQuestionIndex(0);
      } else {
        // Find index of initial question
        const questions = SAMPLE_QUESTIONS[initialDifficulty];
        const index = questions.findIndex(
          (q) => q.title === initialQuestion.title
        );
        setCurrentQuestionIndex(index !== -1 ? index : 0);
      }

      // Ensure difficulty is set in parent component
      if (onDifficultySelected) {
        onDifficultySelected(initialDifficulty);
      }
    }
  }, [initialDifficulty, initialQuestion, onDifficultySelected]);

  const handleSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowSelection(false);

    // Select first question of the difficulty
    const firstQuestion = SAMPLE_QUESTIONS[difficulty][0];
    setCurrentQuestion(firstQuestion);
    setCurrentQuestionIndex(0);

    // Notify parent component
    if (onDifficultySelected) {
      onDifficultySelected(difficulty);
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
    const questions = SAMPLE_QUESTIONS[selectedDifficulty];
    const nextIndex = (currentQuestionIndex + 1) % questions.length;
    const nextQuestion = questions[nextIndex];

    setCurrentQuestionIndex(nextIndex);
    setCurrentQuestion(nextQuestion);

    // Notify parent component
    if (onNextQuestion) {
      onNextQuestion(nextQuestion);
    }
  };

  return (
    <div className="p-1 sm:p-2 md:p-3 flex flex-col h-full">
      <div className="sticky top-0 bg-gray-800 z-10">
        <div className="flex justify-between items-center pb-2 border-b border-gray-700 mb-2">
          <div className="flex items-center gap-1 sm:gap-2">
            <FileText size={16} className="sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Question</span>
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
                <button
                  onClick={handleNextQuestion}
                  className="px-2 py-1 sm:px-4 sm:py-1 bg-blue-600 hover:bg-blue-700 rounded font-medium text-xs sm:text-sm transition-colors"
                >
                  Next
                </button>
              </>
            )}
            <button
              onClick={() => onToggleFullScreen("question")}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Toggle question fullscreen"
            >
              {onToggleFullScreen.activePanel === "question" ? (
                <Minimize size={16} className="sm:w-5 sm:h-5" />
              ) : (
                <Maximize size={16} className="sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        {showSelection ? (
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
        ) : (
          <QuestionContent
            question={currentQuestion}
            difficulty={selectedDifficulty}
          />
        )}
      </div>
    </div>
  );
};

QuestionPanel.propTypes = {
  onToggleFullScreen: PropTypes.object.isRequired,
  onDifficultySelected: PropTypes.func,
  onNextQuestion: PropTypes.func,
  onExitChallenge: PropTypes.func,
  initialDifficulty: PropTypes.string,
  initialQuestion: PropTypes.object,
};

QuestionPanel.defaultProps = {
  initialDifficulty: null,
  initialQuestion: null,
};

export default QuestionPanel;
