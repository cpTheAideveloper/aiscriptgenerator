// File: src/components/ScriptDisplay.tsx

import { useEffect, useState } from "react";
import { ScriptLine } from "@/types";

interface ScriptDisplayProps {
  lines: ScriptLine[];
  onRegenerate: () => void;
  onNewIdea: () => void;
}

export default function ScriptDisplay({ lines, onRegenerate, onNewIdea }: ScriptDisplayProps) {
  const [displayedLines, setDisplayedLines] = useState<ScriptLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedLines([]);
    setCurrentIndex(0);
  }, [lines]);

  useEffect(() => {
    if (currentIndex < lines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, lines[currentIndex]]);
        setCurrentIndex(currentIndex + 1);
      }, lines[currentIndex].pause * 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, lines]);

  const handleCopy = () => {
    const fullScript = lines
      .map((line) => `${line.text} [pause ${line.pause} seconds]`)
      .join("\n");
    navigator.clipboard.writeText(fullScript);
    alert("Script copied to clipboard");
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8 w-full max-w-lg mx-auto">
      <div className="border p-4 w-full">
        {displayedLines.map((line, idx) => (
          <div key={idx} className="mb-2">
            <p>{line.text}</p>
            {idx < displayedLines.length - 1 && (
              <p className="text-sm text-gray-500">Pause ({line.pause} sec)</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={handleCopy} className="bg-green-500 text-white px-4 py-2 rounded">
          Copy Script
        </button>
        <button onClick={onRegenerate} className="bg-yellow-500 text-white px-4 py-2 rounded">
          Regenerate
        </button>
        <button onClick={onNewIdea} className="bg-red-500 text-white px-4 py-2 rounded">
          New Idea
        </button>
      </div>
    </div>
  );
}