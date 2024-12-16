interface SummaryItemProps {
  label: string;
  value: string;
  type?: "primary" | "secondary";
  onClick?: (() => void) | undefined;
}

export function SummaryItem({
  label,
  value,
  type = "secondary",
}: SummaryItemProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <span
          className={`
          ${
            type === "primary"
              ? "text-marine-blue font-medium"
              : "text-cool-gray"
          }
        `}
        >
          {label}
        </span>
      </div>
      <span
        className={`
        ${
          type === "primary" ? "text-marine-blue font-bold" : "text-marine-blue"
        }
      `}
      >
        {value}
      </span>
    </div>
  );
}
