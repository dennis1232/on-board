import { StepNavigation } from "./StepNavigation";

interface StepContainerProps {
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  showBack?: boolean;
  nextLabel?: string;
  nextVariant?: 'primary' | 'secondary';
  className?: string;
}

export function StepContainer({
  children,
  onNext,
  onBack,
  showBack = true,
  nextLabel = 'Next Step',
  nextVariant = 'primary',
  className = ''
}: StepContainerProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex-1">
        {children}
      </div>
      
      {(onNext || onBack) && (
        <StepNavigation
          showBack={showBack}
          onNext={onNext || (() => {})}
          onBack={onBack || (() => {})}
          nextLabel={nextLabel}
          nextVariant={nextVariant}
        />
      )}
    </div>
  );
} 