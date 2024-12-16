interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  leftLabel: string;
  rightLabel: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  leftLabel,
  rightLabel
}: ToggleSwitchProps) {
  return (
    <div className="bg-alabaster rounded-lg p-4 flex items-center justify-center gap-6">
      <span className={`font-medium ${!checked ? "text-marine-blue" : "text-cool-gray"}`}>
        {leftLabel}
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-marine-blue rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
      </label>
      <span className={`font-medium ${checked ? "text-marine-blue" : "text-cool-gray"}`}>
        {rightLabel}
      </span>
    </div>
  );
} 