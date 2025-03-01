import { useState } from "react";
import Editor from "@monaco-editor/react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const CodePlayground = () => {
  const [code, setCode] = useState("// Start coding...");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState("editor");

  const questionFullScreen = useFullScreenHandle();
  const editorFullScreen = useFullScreenHandle();
  const outputFullScreen = useFullScreenHandle();

  const runCode = async () => {
    // Call backend API to execute code and return output
    setOutput("Running code... (backend needed)");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header with Tabs */}
      <div className="flex justify-around bg-gray-800 p-2">
        <button onClick={() => setActiveTab("question")}>Question</button>
        <button onClick={() => setActiveTab("editor")}>Editor</button>
        <button onClick={() => setActiveTab("output")}>Output</button>
      </div>

      {/* Question Tab */}
      {activeTab === "question" && (
        <FullScreen handle={questionFullScreen}>
          <div className="p-4">
            <button onClick={questionFullScreen.enter}>Full Screen</button>
            <h2 className="text-xl font-bold">Two Sum Problem</h2>
            <p>Find two numbers that add up to the target...</p>
          </div>
        </FullScreen>
      )}

      {/* Code Editor */}
      {activeTab === "editor" && (
        <FullScreen handle={editorFullScreen}>
          <div className="p-4">
            <button onClick={editorFullScreen.enter}>Full Screen</button>
            <Editor
              height="400px"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value)}
            />
            <button onClick={runCode} className="mt-2 bg-green-600 p-2">
              Run
            </button>
          </div>
        </FullScreen>
      )}

      {/* Output Tab */}
      {activeTab === "output" && (
        <FullScreen handle={outputFullScreen}>
          <div className="p-4">
            <button onClick={outputFullScreen.enter}>Full Screen</button>
            <h3 className="text-lg font-bold">Output:</h3>
            <pre>{output}</pre>
          </div>
        </FullScreen>
      )}
    </div>
  );
};

export default CodePlayground;
