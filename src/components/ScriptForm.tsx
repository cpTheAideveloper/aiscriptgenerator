// File: src/components/ScriptForm.tsx

import DurationSlider from "./DurationSlider";
import NicheSelector from "./NicheSelector";

interface ScriptFormProps {
    idea: string;
    onIdeaChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    niche: string;
    onNicheChange: (value: string) => void;
    duration: number;
    onDurationChange: (value: number) => void;
  }
  
  export default function ScriptForm({
    idea,
    onIdeaChange,
    onSubmit,
    isLoading,
    niche,
    onNicheChange,
    duration,
    onDurationChange,
  }: ScriptFormProps) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Enter your base idea..."
          value={idea}
          onChange={(e) => onIdeaChange(e.target.value)}
          className="border p-2 w-full"
        />
        <NicheSelector niche={niche} onChange={onNicheChange} />
        <DurationSlider duration={duration} onChange={onDurationChange} />
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Generate Script"}
        </button>
      </div>
    );
  }