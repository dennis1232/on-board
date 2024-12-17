import { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        role="tooltip"
        tabIndex={0}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 px-2 py-1 text-xs text-white bg-marine-blue rounded-md shadow-lg -top-8 left-1/2 transform -translate-x-1/2 w-max max-w-[200px]">
          {content}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-marine-blue rotate-45" />
        </div>
      )}
    </div>
  );
} 