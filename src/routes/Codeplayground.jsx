import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Maximize, Minimize, Code, FileText, Terminal } from "lucide-react";
import PropTypes from "prop-types";

// Panel header component with prop validation
const PanelHeader = ({
  icon: Icon,
  title,
  panel,
  onToggleFullScreen,
  runAction,
  languageSelector,
}) => (
  <div className="flex justify-between items-center pb-2 border-b border-gray-700 mb-2">
    <div className="flex items-center gap-2">
      <Icon size={18} />
      <span className="font-medium">{title}</span>
    </div>
    <div className="flex items-center gap-2">
      {languageSelector}
      {runAction && (
        <button
          onClick={runAction}
          className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded font-medium transition-colors"
        >
          Run
        </button>
      )}
      <button
        onClick={() => onToggleFullScreen(panel)}
        className="p-1 hover:bg-gray-700 rounded transition-colors"
        aria-label={`Toggle ${panel} fullscreen`}
      >
        {panel === onToggleFullScreen.activePanel ? (
          <Minimize size={18} />
        ) : (
          <Maximize size={18} />
        )}
      </button>
    </div>
  </div>
);

// Add prop type validation
PanelHeader.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  panel: PropTypes.string.isRequired,
  onToggleFullScreen: PropTypes.func.isRequired,
  runAction: PropTypes.func,
  languageSelector: PropTypes.node,
};

const CodePlayground = () => {
  const [code, setCode] = useState("// Start coding...");
  const [output, setOutput] = useState("Output will appear here...");
  const [fullScreenPanel, setFullScreenPanel] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const editorRef = useRef(null);

  // List of supported languages
  const supportedLanguages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
  ];

  // Handle editor mounting
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
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
  }, [fullScreenPanel]);

  // Language change handler
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);

    // Update default code template based on language
    switch (newLanguage) {
      case "python":
        setCode("# Start coding in Python...");
        break;
      case "java":
        setCode(
          "public class Main {\n  public static void main(String[] args) {\n    // Start coding in Java...\n  }\n}"
        );
        break;
      case "typescript":
        setCode(
          "// Start coding in TypeScript...\nfunction example(): void {\n  \n}"
        );
        break;
      case "csharp":
        setCode(
          "using System;\n\nclass Program {\n  static void Main() {\n    // Start coding in C#...\n  }\n}"
        );
        break;
      case "cpp":
        setCode(
          "#include <iostream>\n\nint main() {\n  // Start coding in C++...\n  return 0;\n}"
        );
        break;
      default:
        setCode("// Start coding in JavaScript...");
        break;
    }
  };

  // Language selector component
  const LanguageSelector = () => (
    <select
      value={language}
      onChange={handleLanguageChange}
      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm"
      aria-label="Select programming language"
    >
      {supportedLanguages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );

  const runCode = () => {
    try {
      // For demonstration purposes - in real app you'd handle different languages
      if (language === "javascript") {
        const result = new Function(code)();
        setOutput(
          result !== undefined ? String(result) : "Code executed successfully"
        );
      } else {
        // For other languages, you would send to backend
        setOutput(
          `[${language.toUpperCase()}] Code execution simulated. In a real app, this would be sent to a backend service.`
        );
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

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white overflow-hidden p-2 md:p-4 gap-2 md:gap-4">
      {/* Main content area (Editor + Output) */}
      {!isQuestionFullScreen && (
        <div
          className={`flex flex-col ${
            isQuestionFullScreen
              ? "hidden"
              : isEditorFullScreen || isOutputFullScreen
              ? "w-full"
              : "w-full md:w-2/3"
          } h-full gap-2 md:gap-4 overflow-hidden`}
        >
          {/* Code Editor */}
          {!isOutputFullScreen && (
            <div
              className={`bg-gray-800 rounded-lg overflow-hidden ${
                isEditorFullScreen ? "h-full" : "h-1/2 md:h-3/5"
              } flex flex-col`}
            >
              <div className="p-2 md:p-3 flex flex-col h-full">
                <PanelHeader
                  icon={Code}
                  title="Editor"
                  panel="editor"
                  onToggleFullScreen={toggleFullScreen}
                  runAction={runCode}
                  languageSelector={<LanguageSelector />}
                />
                <div className="flex-grow overflow-hidden">
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
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Output Panel */}
          {!isEditorFullScreen && (
            <div
              className={`bg-gray-800 rounded-lg ${
                isOutputFullScreen ? "h-full" : "h-1/2 md:h-2/5"
              } flex flex-col overflow-hidden`}
            >
              <div className="p-2 md:p-3 flex flex-col h-full">
                <PanelHeader
                  icon={Terminal}
                  title="Output"
                  panel="output"
                  onToggleFullScreen={toggleFullScreen}
                />
                <pre className="flex-grow overflow-auto bg-gray-900 p-2 md:p-3 rounded-lg text-sm">
                  {output}
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
            isQuestionFullScreen ? "w-full h-full" : "w-full md:w-1/3 h-full"
          } overflow-auto`}
        >
          <div className="p-2 md:p-3 flex flex-col h-full">
            <div className="sticky top-0 bg-gray-800 z-10">
              <PanelHeader
                icon={FileText}
                title="Question"
                panel="question"
                onToggleFullScreen={toggleFullScreen}
              />
            </div>
            <div className="flex-grow overflow-auto">
              <div className="p-2">
                <h2 className="text-xl font-bold mb-4">Two Sum Problem</h2>
                <div className="prose prose-invert">
                  <p className="mb-3">
                    Given an array of integers <code>nums</code> and an integer{" "}
                    <code>target</code>, return indices of the two numbers such
                    that they add up to <code>target</code>.
                  </p>
                  <p className="mb-3">
                    You may assume that each input would have exactly one
                    solution, and you may not use the same element twice.
                  </p>
                  <h3 className="text-lg font-semibold mt-4 mb-2">Example:</h3>
                  <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                    {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePlayground;
