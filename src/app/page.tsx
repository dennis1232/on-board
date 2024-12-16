"use client";

import { useState, useRef } from "react";
import PersonalInfo from "@/components/steps/PersonalInfo";
import SelectPlan from "@/components/steps/SelectPlan";
import AddOns from "@/components/steps/AddOns";
import Summary from "@/components/steps/Summary";
import ThankYou from "@/components/steps/ThankYou";
import Sidebar from "@/components/Sidebar";
import { FormData } from "@/types";
import { StepNavigation } from "@/components/ui/StepNavigation";
import { Card } from "@/components/ui/Card";

const defaultFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  plan: "arcade",
  billingCycle: "monthly",
  addOns: [],
};

const TOTAL_STEPS = 5;

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const personalInfoRef = useRef<{ validateForm: () => Promise<boolean> }>(
    null
  );

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await personalInfoRef.current?.validateForm();
      if (!isValid) return;
    }

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    const commonProps = {
      formData,
      updateFormData,
    };

    const steps = {
      1: <PersonalInfo ref={personalInfoRef} {...commonProps} />,
      2: <SelectPlan {...commonProps} />,
      3: <AddOns {...commonProps} />,
      4: <Summary formData={formData} onPlanChange={() => setStep(2)} />,
      5: <ThankYou />,
    };

    return steps[step as keyof typeof steps] || null;
  };

  const isLastStep = step === TOTAL_STEPS;
  const isConfirmStep = step === TOTAL_STEPS - 1;

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit", step);

    e.preventDefault();
    await nextStep();
  };
  console.log("isLastStep", isLastStep);

  return (
    <>
      <Sidebar currentStep={step} />
      <main className="flex-1 px-4 md:px-8 py-8 mt-[172px] md:mt-0 xs:bg-magnolia md:bg-white">
        <Card className="max-w-[550px] mx-auto -mt-16 md:mt-0 relative z-20">
          <form onSubmit={handleSubmit}>
            {renderStep()}
            {!isLastStep && (
              <div className="fixed md:static bottom-0 left-0 right-0 bg-white p-4">
                <StepNavigation
                  showBack={step > 1}
                  onBack={prevStep}
                  nextLabel={isConfirmStep ? "Confirm" : "Next Step"}
                  nextVariant={isConfirmStep ? "secondary" : "primary"}
                />
              </div>
            )}
          </form>
        </Card>
      </main>
    </>
  );
}
