import { FormData } from "@/types";
import { PLANS } from "@/config/constants";
import { Step } from "@/components/ui/Step";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { PlanCard } from "../ui/PlanCard";

interface SelectPlanProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function SelectPlan({
  formData,
  updateFormData,
}: SelectPlanProps) {
  const { billingCycle, plan } = formData;
  const isYearly = billingCycle === "yearly";

  return (
    <Step
      title="Select your plan"
      description="You have the option of monthly or yearly billing."
    >
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {Object.entries(PLANS).map(([planKey, planDetails]) => (
          <PlanCard
            key={planKey}
            name={planDetails.name}
            price={`$${
              isYearly
                ? `${planDetails.yearlyPrice}/yr`
                : `${planDetails.monthlyPrice}/mo`
            }`}
            icon={planDetails.icon}
            isSelected={plan === planKey}
            yearlyBonus={isYearly}
            onClick={() => updateFormData({ plan: planKey })}
          />
        ))}
      </div>
      <div className="bg-alabaster rounded-lg py-3">
        <ToggleSwitch
          checked={isYearly}
          onChange={(checked) =>
            updateFormData({
              billingCycle: checked ? "yearly" : "monthly",
            })
          }
          leftLabel="Monthly"
          rightLabel="Yearly"
        />
      </div>
    </Step>
  );
}
