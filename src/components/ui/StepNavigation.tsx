import { Button } from "./Button";

interface StepNavigationProps {
  showBack?: boolean;
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  nextVariant?: "primary" | "secondary";
}

export function StepNavigation({
  showBack = true,
  onNext,
  onBack,
  nextLabel = "Next Step",
  nextVariant = "primary",
}: StepNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 md:relative md:p-0 md:bg-transparent">
      <div className="flex justify-between max-w-lg mx-auto">
        {showBack && onBack && (
          <Button variant="ghost" onClick={onBack}>
            Go Back
          </Button>
        )}
        <div className={!showBack ? "ml-auto " : ""}>
          <Button variant={nextVariant} onClick={onNext} className="bg-indigo">
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
