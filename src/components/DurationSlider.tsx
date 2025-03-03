// File: src/components/DurationSlider.tsx

interface DurationSliderProps {
    duration: number;
    onChange: (value: number) => void;
  }
  
  export default function DurationSlider({ duration, onChange }: DurationSliderProps) {
    return (
      <div className="flex flex-col w-full">
        <label className="mb-1">Duration (seconds): {duration}</label>
        <input
          type="range"
          min={10}
          max={60}
          value={duration}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    );
  }