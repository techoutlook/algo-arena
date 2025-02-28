import { useState } from "react";
import Editor from "@monaco-editor/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const CodePlayground = () => {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    try {
      // Mock execution (Replace with API or Firebase function call)
      setOutput(
        `Executed in ${language}:
` + code
      );
    } catch (error) {
      setOutput("Error executing code");
    }
  };

  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, "codeSnippets"), {
        code,
        language,
        createdAt: new Date(),
      });
      alert("Snippet saved! ID: " + docRef.id);
    } catch (error) {
      alert("Error saving snippet");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Code Playground</h1>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-2 p-2 border"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </select>
      <Editor
        height="300px"
        language={language}
        value={code}
        onChange={(value) => setCode(value || "")}
      />
      <button onClick={handleRun} className="mt-2 p-2 bg-blue-500 text-white">
        Run Code
      </button>
      <button onClick={handleSave} className="ml-2 p-2 bg-green-500 text-white">
        Save Snippet
      </button>
      <pre className="mt-4 p-2 bg-gray-200">{output}</pre>
    </div>
  );
};

export default CodePlayground;
