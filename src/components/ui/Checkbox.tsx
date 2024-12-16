import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  price?: string;
}

export function Checkbox({
  label,
  description,
  price,
  className = '',
  ...props
}: CheckboxProps) {
  return (
    <label
      className={`
        flex items-center p-4 border rounded-lg cursor-pointer
        hover:border-purplish-blue transition-colors duration-200
        ${props.checked ? 'border-purplish-blue bg-alabaster' : 'border-light-gray'}
        ${className}
      `}
    >
      <input
        type="checkbox"
        className="w-5 h-5 mr-4 accent-purplish-blue cursor-pointer"
        {...props}
      />
      <div className="flex-1">
        {label && (
          <div className="font-bold text-marine-blue">{label}</div>
        )}
        {description && (
          <div className="text-cool-gray text-sm">{description}</div>
        )}
      </div>
      {price && (
        <div className="text-purplish-blue text-sm">{price}</div>
      )}
    </label>
  );
} 