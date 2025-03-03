// File: src/components/NicheSelector.tsx

interface NicheSelectorProps {
    niche: string;
    onChange: (value: string) => void;
  }
  
  export default function NicheSelector({ niche, onChange }: NicheSelectorProps) {
    const niches = ["Humor", "Education", "Motivation", "Trends"];
    return (
      <div className="flex flex-col w-full">
        <label className="mb-1">Select Niche</label>
        <select
          value={niche}
          onChange={(e) => onChange(e.target.value)}
          className="border p-1"
        >
          {niches.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }