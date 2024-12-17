import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  showErrorIcon?: boolean;
  labelClassName?: string;
}

export function Input({
  label,
  error,
  helpText,
  showErrorIcon = true,
  labelClassName = "",
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpTextId = helpText ? `${inputId}-help` : undefined;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        {label && (
          <label 
            htmlFor={inputId}
            className={`block text-sm font-medium text-marine-blue ${labelClassName}`}
          >
            {label}
          </label>
        )}
        {error && (
          <p 
            id={errorId}
            className="text-sm text-strawberry-red font-medium"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
      <div className="relative">
        <input
          id={inputId}
          className={`
            w-full px-4 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-purplish-blue
            disabled:bg-alabaster disabled:cursor-not-allowed
            ${error ? "border-strawberry-red" : "border-light-gray"}
            ${error ? "focus:ring-strawberry-red" : "focus:ring-purplish-blue"}
            ${className}
          `}
          aria-invalid={!!error}
          aria-describedby={[errorId, helpTextId].filter(Boolean).join(' ')}
          {...props}
        />
        {error && showErrorIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-strawberry-red" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      {helpText && (
        <p id={helpTextId} className="text-sm text-cool-gray">
          {helpText}
        </p>
      )}
    </div>
  );
}
