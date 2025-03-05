import { useState, useEffect, useRef, memo } from "react";
import Editor from "@monaco-editor/react";
import {
  Maximize,
  Minimize,
  Code,
  Terminal,
  AlertTriangle,
  X,
} from "lucide-react";
import PropTypes from "prop-types";
import QuestionPanel from "./QuestionPanel";

// Language configuration
const SUPPORTED_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
];

const LANGUAGE_TEMPLATES = {
  javascript: "// Start coding in JavaScript...",
  python: "# Start coding in Python...",
};

// Warning Popup Component
const WarningPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 max-w-md w-full border border-yellow-600 animate-fadeIn">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-600 mr-2 sm:mr-3">
              <AlertTriangle size={20} className="sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Select Difficulty First
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close warning"
          >
            <X size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        <p className="text-sm sm:text-base text-gray-300 mb-4">
          Please select a difficulty level before coding. This will ensure you
          are working on an appropriate challenge.
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-white text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

WarningPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

// Memoized Panel header component with prop validation
const PanelHeader = memo(
  ({
    icon: Icon,
    title,
    panel,
    onToggleFullScreen,
    runAction,
    languageSelector,
  }) => {
    const isActive = onToggleFullScreen.activePanel === panel;

    return (
      <div className="flex justify-between items-center pb-2 border-b border-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Icon size={16} className="sm:w-5 sm:h-5" />
          <span className="font-medium text-sm sm:text-base">{title}</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {languageSelector}
          {runAction && (
            <button
              onClick={runAction}
              className="px-2 py-1 sm:px-4 sm:py-1 text-xs sm:text-sm bg-green-600 hover:bg-green-700 rounded font-medium transition-colors"
            >
              Run
            </button>
          )}
          <button
            onClick={() => onToggleFullScreen(panel)}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            aria-label={`Toggle ${panel} fullscreen`}
          >
            {isActive ? (
              <Minimize size={16} className="sm:w-5 sm:h-5" />
            ) : (
              <Maximize size={16} className="sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    );
  }
);

PanelHeader.displayName = "PanelHeader";

PanelHeader.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  panel: PropTypes.string.isRequired,
  onToggleFullScreen: PropTypes.func.isRequired,
  runAction: PropTypes.func,
  languageSelector: PropTypes.node,
};

// Memoized language selector
const LanguageSelector = memo(({ language, onChange }) => (
  <select
    value={language}
    onChange={onChange}
    className="px-1 py-1 sm:px-2 sm:py-1 text-xs sm:text-sm bg-gray-700 border border-gray-600 rounded"
    aria-label="Select programming language"
  >
    {SUPPORTED_LANGUAGES.map((lang) => (
      <option key={lang.value} value={lang.value}>
        {lang.label}
      </option>
    ))}
  </select>
));

LanguageSelector.displayName = "LanguageSelector";

LanguageSelector.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CodePlayground = () => {
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.javascript);
  const [output, setOutput] = useState("Output will appear here...");
  const [fullScreenPanel, setFullScreenPanel] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [showWarning, setShowWarning] = useState(false);
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [editorReadOnly, setEditorReadOnly] = useState(false);
  const [orientation, setOrientation] = useState("vertical");
  const editorRef = useRef(null);
  const [pyodide, setPyodide] = useState(null);

  // Detect screen size and set orientation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setOrientation("horizontal");
      } else {
        setOrientation("vertical");
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Load Pyodide when the component mounts
  useEffect(() => {
    const loadPyodideAndPackages = async () => {
      const py = await window.loadPyodide();
      setPyodide(py);
    };

    loadPyodideAndPackages();
  }, []);

  // Set editor to read-only if no difficulty is selected
  useEffect(() => {
    setEditorReadOnly(!difficultySelected);
  }, [difficultySelected]);

  // Handle editor mounting
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Add event listener for keypresses
    editor.onKeyDown(() => {
      // If no difficulty is selected and user is trying to type
      if (!difficultySelected && !showWarning) {
        setShowWarning(true);
      }
    });
  };

  // Handle difficulty selection from question panel
  const handleDifficultySelected = () => {
    setDifficultySelected(true);
    setEditorReadOnly(false);
  };

  // Adjust editor layout when container size changes
  useEffect(() => {
    const resizeEditor = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    // Resize immediately and on window resize
    resizeEditor();
    window.addEventListener("resize", resizeEditor);

    // Resize after fullscreen toggle with a small delay
    const timeoutId = setTimeout(resizeEditor, 100);

    return () => {
      window.removeEventListener("resize", resizeEditor);
      clearTimeout(timeoutId);
    };
  }, [fullScreenPanel, orientation]);

  // Language change handler
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(LANGUAGE_TEMPLATES[newLanguage] || LANGUAGE_TEMPLATES.javascript);
  };

  const runCode = async () => {
    // If no difficulty selected, show warning
    if (!difficultySelected) {
      setShowWarning(true);
      return;
    }

    try {
      if (language === "javascript") {
        let logs = [];
        const originalConsoleLog = console.log;

        console.log = (...args) => {
          logs.push(args.join(" "));
          originalConsoleLog(...args);
        };

        try {
          const result = new Function(code)();
          if (result !== undefined) logs.push(String(result));
        } catch (error) {
          logs.push(`Error: ${error.message}`);
        }

        console.log = originalConsoleLog;
        setOutput(logs.join("\n"));
      } else if (language === "python") {
        if (!pyodide) {
          setOutput("Loading Python environment...");
          return;
        }
        pyodide.runPython(`
          import sys
          from io import StringIO
          sys.stdout = StringIO()
        `);
        await pyodide.runPythonAsync(code);
        const output = pyodide.runPython("sys.stdout.getvalue()");
        setOutput(output);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const toggleFullScreen = (panel) => {
    setFullScreenPanel(fullScreenPanel === panel ? null : panel);
  };

  // Add the active panel to the function for comparison in the PanelHeader
  toggleFullScreen.activePanel = fullScreenPanel;

  // Determine layout based on fullscreen state
  const isEditorFullScreen = fullScreenPanel === "editor";
  const isOutputFullScreen = fullScreenPanel === "output";
  const isQuestionFullScreen = fullScreenPanel === "question";

  // Prepare memoized language selector
  const languageSelectorElement = (
    <LanguageSelector language={language} onChange={handleLanguageChange} />
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden p-1 sm:p-2 md:p-4 gap-1 sm:gap-2 md:gap-4">
      {/* Warning Popup */}
      {showWarning && !difficultySelected && (
        <WarningPopup onClose={() => setShowWarning(false)} />
      )}

      {/* Main layout */}
      <div
        className={`flex ${
          orientation === "vertical" ? "flex-row" : "flex-col"
        } h-full w-full gap-1 sm:gap-2 md:gap-4`}
      >
        {/* Main content area (Editor + Output) */}
        {!isQuestionFullScreen && (
          <div
            className={`flex flex-col ${
              isQuestionFullScreen
                ? "hidden"
                : isEditorFullScreen || isOutputFullScreen
                ? "w-full"
                : orientation === "vertical"
                ? "w-full md:w-2/3"
                : "w-full h-3/5"
            } h-full gap-1 sm:gap-2 md:gap-4 overflow-hidden`}
          >
            {/* Code Editor */}
            {!isOutputFullScreen && (
              <div
                className={`bg-gray-800 rounded-lg overflow-hidden ${
                  isEditorFullScreen
                    ? "h-full"
                    : orientation === "vertical"
                    ? "h-1/2 md:h-3/5"
                    : "h-full"
                } flex flex-col`}
              >
                <div className="p-1 sm:p-2 md:p-3 flex flex-col h-full">
                  <PanelHeader
                    icon={Code}
                    title="Editor"
                    panel="editor"
                    onToggleFullScreen={toggleFullScreen}
                    runAction={runCode}
                    languageSelector={languageSelectorElement}
                  />
                  <div className="flex-grow overflow-hidden relative">
                    <Editor
                      height="100%"
                      language={language}
                      value={code}
                      onChange={setCode}
                      theme="vs-dark"
                      onMount={handleEditorDidMount}
                      options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        automaticLayout: true,
                        readOnly: editorReadOnly,
                      }}
                    />

                    {/* Editor overlay when no difficulty selected */}
                    {!difficultySelected && !isQuestionFullScreen && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center">
                        <div className="text-center p-2 sm:p-4 rounded-lg">
                          <AlertTriangle
                            size={30}
                            className="mx-auto mb-2 text-yellow-500 sm:w-10 sm:h-10"
                          />
                          <p className="text-sm sm:text-lg font-semibold px-2">
                            Please select a difficulty level in the question
                            panel to start coding
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Output Panel */}
            {!isEditorFullScreen && (
              <div
                className={`bg-gray-800 rounded-lg ${
                  isOutputFullScreen
                    ? "h-full"
                    : orientation === "vertical"
                    ? "h-1/2 md:h-2/5"
                    : "h-full"
                } flex flex-col overflow-hidden`}
              >
                <div className="p-1 sm:p-2 md:p-3 flex flex-col h-full">
                  <PanelHeader
                    icon={Terminal}
                    title="Output"
                    panel="output"
                    onToggleFullScreen={toggleFullScreen}
                  />
                  <pre className="flex-grow overflow-auto bg-gray-900 p-1 sm:p-2 md:p-3 rounded-lg text-xs sm:text-sm">
                    {!difficultySelected
                      ? "Select a difficulty level before running code."
                      : output}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Question Panel */}
        {!isEditorFullScreen && !isOutputFullScreen && (
          <div
            className={`bg-gray-800 rounded-lg ${
              isQuestionFullScreen
                ? "w-full h-full"
                : orientation === "vertical"
                ? "w-full md:w-1/3 h-full"
                : "w-full h-2/5"
            } overflow-auto`}
          >
            {/* Use the enhanced QuestionPanel component with difficulty selection callback */}
            <QuestionPanel
              onToggleFullScreen={toggleFullScreen}
              onDifficultySelected={handleDifficultySelected}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePlayground;
