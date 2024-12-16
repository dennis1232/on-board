import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        {label && (
          <label className="block text-sm font-medium text-marine-blue">
            {label}
          </label>
        )}
        {error && <p className="text-sm text-strawberry-red">{error}</p>}
      </div>
      <input
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-purplish-blue
          ${error ? "border-strawberry-red" : "border-light-gray"}
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
