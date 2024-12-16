interface SidebarProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "YOUR INFO", description: "STEP 1" },
  { number: 2, title: "SELECT PLAN", description: "STEP 2" },
  { number: 3, title: "ADD-ONS", description: "STEP 3" },
  { number: 4, title: "SUMMARY", description: "STEP 4" },
];

export default function Sidebar({ currentStep }: SidebarProps) {
  const StepCircle = ({
    number,
    isActive,
  }: {
    number: number;
    isActive: boolean;
  }) => (
    <div
      className={`
        w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium
        ${
          isActive
            ? "bg-light-blue text-marine-blue border-transparent"
            : "border-white text-white"
        }
        transition-all duration-300 ease-in-out
      `}
    >
      {number}
    </div>
  );

  return (
    <>
      {/* Mobile view */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10">
        <div
          className="w-full h-[172px] bg-[url('/assets/images/bg-sidebar-mobile.svg')] 
          bg-cover bg-center bg-no-repeat"
        >
          <div className="flex justify-center items-start h-full gap-4 pt-8">
            {steps.map((step) => (
              <StepCircle
                key={step.number}
                number={step.number}
                isActive={
                  currentStep === 5
                    ? step.number === 4
                    : currentStep === step.number
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <aside className="hidden md:block relative md:min-h-[568px] md:w-[274px]">
        <div className="h-full bg-[url('/assets/images/bg-sidebar-desktop.svg')] bg-cover bg-no-repeat rounded-lg">
          <nav className="p-8 space-y-6">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center gap-4">
                <StepCircle
                  number={step.number}
                  isActive={
                    currentStep === 5
                      ? step.number === 4
                      : currentStep === step.number
                  }
                />
                <div className="flex flex-col">
                  <span className="text-xs text-pastel-blue uppercase">
                    {step.description}
                  </span>
                  <span className="font-bold text-white tracking-wider uppercase">
                    {step.title}
                  </span>
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
