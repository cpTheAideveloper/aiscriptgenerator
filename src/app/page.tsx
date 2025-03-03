// File: src/app/page.tsx

"use client";

import { useState } from "react";
import ScriptForm from "@/components/ScriptForm";
import ScriptDisplay from "@/components/ScriptDisplay";
import { ScriptLine } from "@/types";

export default function HomePage() {
  const [idea, setIdea] = useState("");
  const [niche, setNiche] = useState("Humor");
  const [duration, setDuration] = useState(30);
  const [lines, setLines] = useState<ScriptLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  // Function to handle script generation
  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setHasGenerated(false);
      setLines([]);
      const response = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, niche, duration }),
      });
      if (!response.ok) throw new Error("Error generating script");
      const data = await response.json();
      setLines(data.lines);
      setHasGenerated(true);
    } catch (error) {
      console.error(error);
      alert("There was a problem generating the script.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to regenerate the script
  const handleRegenerate = () => {
    handleGenerate();
  };

  // Function to start with a new idea
  const handleNewIdea = () => {
    setIdea("");
    setNiche("Humor");
    setDuration(30);
    setLines([]);
    setHasGenerated(false);
  };

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Short Script Generator</h1>
      {!hasGenerated && (
        <ScriptForm
          idea={idea}
          onIdeaChange={setIdea}
          onSubmit={handleGenerate}
          isLoading={isLoading}
          niche={niche}
          onNicheChange={setNiche}
          duration={duration}
          onDurationChange={setDuration}
        />
      )}
      {hasGenerated && (
        <ScriptDisplay
          lines={lines}
          onRegenerate={handleRegenerate}
          onNewIdea={handleNewIdea}
        />
      )}
    </main>
  );
}