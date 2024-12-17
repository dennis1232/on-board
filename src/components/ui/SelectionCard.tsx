import Image from "next/image";

interface SelectionCardProps {
  isSelected: boolean;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  icon?: string;
  title: string;
  description?: string;
  price?: string;
  additionalInfo?: string | null;
  variant?: "checkbox" | "radio";
  className?: string;
  role?: string;
  tabIndex?: number;
  "aria-checked"?: boolean;
  inputId?: string;
}

export function SelectionCard({
  isSelected,
  onClick,
  onKeyDown,
  onFocus,
  onBlur,
  icon,
  title,
  description,
  price,
  additionalInfo,
  variant = "radio",
  className = "",
  role,
  tabIndex,
  "aria-checked": ariaChecked,
  inputId,
}: SelectionCardProps) {
  return (
    <div
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      role={role}
      tabIndex={tabIndex}
      aria-checked={ariaChecked}
      className={`
        flex items-start gap-4 p-4 border rounded-lg cursor-pointer
        hover:border-purplish-blue transition-colors duration-200
        ${isSelected ? "border-purplish-blue bg-alabaster" : "border-light-gray"}
        ${className}
      `}
    >
      {variant === "checkbox" && (
        <input
          type="checkbox"
          id={inputId}
          checked={isSelected}
          onChange={() => {}}
          className="w-5 h-5 mt-1 accent-purplish-blue cursor-pointer"
        />
      )}

      {icon && <Image src={icon} alt={title} width={40} height={40} />}

      <div className="flex-1">
        <h3 className="font-medium text-marine-blue">{title}</h3>
        {description && <p className="text-cool-gray text-sm">{description}</p>}
        {additionalInfo && (
          <p className="text-marine-blue text-sm mt-1">{additionalInfo}</p>
        )}
      </div>

      {price && <div className="text-purplish-blue text-sm">{price}</div>}
    </div>
  );
}