import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Maximize, Minimize, Code, FileText, Terminal } from "lucide-react";
import PropTypes from "prop-types";

// Panel header component with prop validation
const PanelHeader = ({ icon: Icon, title, panel, onToggleFullScreen }) => (
  <div className="flex justify-between items-center pb-2 border-b border-gray-700 mb-2">
    <div className="flex items-center gap-2">
      <Icon size={18} />
      <span className="font-medium">{title}</span>
    </div>
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
);

// Add prop type validation
PanelHeader.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  panel: PropTypes.string.isRequired,
  onToggleFullScreen: PropTypes.func.isRequired,
};

const CodePlayground = () => {
  const [code, setCode] = useState("// Start coding...");
  const [output, setOutput] = useState("Output will appear here...");
  const [fullScreenPanel, setFullScreenPanel] = useState(null);

  const runCode = () => {
    try {
      // For demonstration purposes - in real app you'd send to backend
      const result = new Function(code)();
      setOutput(
        result !== undefined ? String(result) : "Code executed successfully"
      );
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
  const isAnyFullScreen = Boolean(fullScreenPanel);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Main content area (Editor + Output) */}
      {!isQuestionFullScreen && (
        <div
          className={`flex flex-col ${
            isAnyFullScreen ? "w-full" : "w-2/3"
          } p-4 space-y-4`}
        >
          {/* Code Editor */}
          {!isOutputFullScreen && (
            <div
              className={`bg-gray-800 rounded-lg overflow-hidden ${
                isEditorFullScreen ? "h-full" : "h-3/5"
              }`}
            >
              <div className="p-3">
                <PanelHeader
                  icon={Code}
                  title="Editor"
                  panel="editor"
                  onToggleFullScreen={toggleFullScreen}
                />
                <div className="h-full">
                  <Editor
                    height={
                      isEditorFullScreen
                        ? "calc(100vh - 120px)"
                        : "calc(100% - 20px)"
                    }
                    language="javascript"
                    value={code}
                    onChange={setCode}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 14,
                    }}
                  />
                </div>
                <button
                  onClick={runCode}
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 p-2 rounded font-medium transition-colors"
                >
                  Run Code
                </button>
              </div>
            </div>
          )}

          {/* Output Panel */}
          {!isEditorFullScreen && (
            <div
              className={`bg-gray-800 rounded-lg overflow-hidden ${
                isOutputFullScreen ? "h-full" : "h-2/5"
              }`}
            >
              <div className="p-3">
                <PanelHeader
                  icon={Terminal}
                  title="Output"
                  panel="output"
                  onToggleFullScreen={toggleFullScreen}
                />
                <pre className="h-full overflow-auto bg-gray-900 p-3 rounded-lg text-sm">
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
          className={`bg-gray-800 ${
            isQuestionFullScreen ? "w-full" : "w-1/3"
          } p-4 ${!isQuestionFullScreen && "border-l border-gray-700"}`}
        >
          <PanelHeader
            icon={FileText}
            title="Question"
            panel="question"
            onToggleFullScreen={toggleFullScreen}
          />
          <div className="p-2">
            <h2 className="text-xl font-bold mb-4">Two Sum Problem</h2>
            <div className="prose prose-invert">
              <p className="mb-3">
                Given an array of integers <code>nums</code> and an integer{" "}
                <code>target</code>, return indices of the two numbers such that
                they add up to <code>target</code>.
              </p>
              <p className="mb-3">
                You may assume that each input would have exactly one solution,
                and you may not use the same element twice.
              </p>
              <h3 className="text-lg font-semibold mt-4 mb-2">Example:</h3>
              <pre className="bg-gray-900 p-3 rounded-lg">
                {`Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePlayground;
