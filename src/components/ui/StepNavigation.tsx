import { Button } from "./Button";

interface StepNavigationProps {
  showBack?: boolean;
  onBack?: () => void;
  nextLabel?: string;
  nextVariant?: "primary" | "secondary";
}

export function StepNavigation({
  showBack = true,
  onBack,
  nextLabel = "Next Step",
  nextVariant = "primary",
}: StepNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 md:relative md:p-0 md:bg-transparent">
      <div className="flex justify-between max-w-lg mx-auto">
        {showBack && onBack && (
          <Button type="button" variant="ghost" onClick={onBack}>
            Go Back
          </Button>
        )}
        <div className={!showBack ? "ml-auto " : ""}>
          <Button type="submit" variant={nextVariant} className="bg-indigo">
            {nextLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
