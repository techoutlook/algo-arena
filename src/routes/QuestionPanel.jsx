import { useState, memo } from "react";
import {
  FileText,
  TrendingUp,
  Award,
  AlignLeft,
  ChevronDown,
  ChevronUp,
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
  easy: {
    title: "Two Sum",
    description:
      "Given an array of integers and a target, return indices of two numbers that add up to the target.",
    example: `Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    expectedTime: "O(n)",
    expectedSpace: "O(n)",
  },
  medium: {
    title: "Add Two Numbers",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list.",
    example: `Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.`,
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100]",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    expectedTime: "O(max(n,m))",
    expectedSpace: "O(max(n,m))",
  },
  hard: {
    title: "Median of Two Sorted Arrays",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
    example: `Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: Merged array = [1,2,3] and median is 2.`,
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
    ],
    expectedTime: "O(log(m+n))",
    expectedSpace: "O(1)",
  },
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
      className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? `border-${textColor.split("-")[1]}-500 shadow-lg`
          : "border-gray-700 hover:border-gray-500"
      } flex flex-col`}
      onClick={() => onSelect(value)}
    >
      <div className="flex items-center mb-3">
        <div className={`p-2 rounded-md ${color} mr-3`}>
          <Icon size={16} />
        </div>
        <h3 className={`text-sm font-bold ${textColor}`}>{label}</h3>
      </div>

      <p className="text-sm text-gray-400 flex-grow mb-3">{description}</p>

      <button
        className={`px-4 py-2 rounded-md text-white font-medium ${color} ${hoverColor} transition-colors w-full`}
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

// Enhanced Question content
const QuestionContent = memo(({ question, difficulty }) => {
  const [showConstraints, setShowConstraints] = useState(false);

  const { label, textColor } = DIFFICULTY_LEVELS.find(
    (d) => d.value === difficulty
  );
  const {
    title,
    description,
    example,
    constraints,
    expectedTime,
    expectedSpace,
  } = question;

  return (
    <div className="p-2">
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`px-2 py-1 rounded-md ${textColor} bg-opacity-20 text-sm font-medium`}
        >
          {label}
        </span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="mb-4">{description}</p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Example:</h3>
          <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
            {example}
          </pre>
        </div>

        <div className="mb-2">
          <button
            onClick={() => setShowConstraints(!showConstraints)}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
          >
            <span>Constraints & Requirements</span>
            {showConstraints ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>

          {showConstraints && (
            <div className="mt-2 ml-2 text-gray-400 text-sm">
              <ul className="list-disc pl-5 space-y-1">
                {constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
              <div className="mt-2">
                <p>
                  Expected Time Complexity:{" "}
                  <span className="font-mono">{expectedTime}</span>
                </p>
                <p>
                  Expected Space Complexity:{" "}
                  <span className="font-mono">{expectedSpace}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

QuestionContent.displayName = "QuestionContent";

QuestionContent.propTypes = {
  question: PropTypes.object.isRequired,
  difficulty: PropTypes.string.isRequired,
};

// Enhanced Question panel
const QuestionPanel = ({ onToggleFullScreen, onDifficultySelected }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [showSelection, setShowSelection] = useState(true);

  const handleSelectDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setShowSelection(false);

    // Notify parent component that difficulty is selected
    if (onDifficultySelected) {
      onDifficultySelected(difficulty);
    }
  };

  const handleReset = () => {
    setSelectedDifficulty(null);
    setShowSelection(true);
  };

  return (
    <div className="p-2 md:p-3 flex flex-col h-full">
      <div className="sticky top-0 bg-gray-800 z-10">
        <div className="flex justify-between items-center pb-2 border-b border-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <FileText size={18} />
            <span className="font-medium">Question</span>
          </div>
          <div className="flex items-center gap-2">
            {!showSelection && (
              <button
                onClick={handleReset}
                className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded font-medium text-sm transition-colors"
              >
                Change Difficulty
              </button>
            )}
            <button
              onClick={() => onToggleFullScreen("question")}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              aria-label="Toggle question fullscreen"
            >
              {onToggleFullScreen.activePanel === "question" ? (
                <Minimize size={18} />
              ) : (
                <Maximize size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-auto">
        {showSelection ? (
          <div className="p-2">
            <h2 className="text-xl font-bold mb-6 text-center">
              Select Difficulty Level
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {DIFFICULTY_LEVELS.map((difficulty) => (
                <DifficultyCard
                  key={difficulty.value}
                  difficulty={difficulty}
                  isSelected={selectedDifficulty === difficulty.value}
                  onSelect={handleSelectDifficulty}
                />
              ))}
            </div>

            <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-2">
                Coding Challenge Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
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
            question={SAMPLE_QUESTIONS[selectedDifficulty]}
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
};

export default QuestionPanel;
