import { FormData } from "@/types";
import { Step } from "@/components/ui/Step";
import { SummaryItem } from "@/components/ui/SummaryItem";
import { Button } from "../ui/Button";
import { PLANS_SIMPLE, ADD_ONS_SIMPLE } from "@/config/constants";

interface SummaryProps {
  formData: FormData;
  onPlanChange?: () => void;
}

export default function Summary({ formData, onPlanChange }: SummaryProps) {
  const isYearly = formData.billingCycle === "yearly";
  const selectedPlan = PLANS_SIMPLE[formData.plan as keyof typeof PLANS_SIMPLE];

  const calculateTotal = (data: FormData) => {
    const planCost = isYearly ? selectedPlan.yearly : selectedPlan.monthly;
    const addOnsCost = data.addOns.reduce((total, addonId) => {
      const addon = ADD_ONS_SIMPLE[addonId as keyof typeof ADD_ONS_SIMPLE];
      if (!addon) return total;
      return total + (isYearly ? addon.yearly : addon.monthly);
    }, 0);
    return planCost + addOnsCost;
  };

  return (
    <Step
      title="Finishing up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="bg-alabaster rounded-lg p-6">
        <SummaryItem
          label={`${formData.plan} (${isYearly ? "Yearly" : "Monthly"})`}
          value={`$${isYearly ? selectedPlan.yearly : selectedPlan.monthly}/${
            isYearly ? "yr" : "mo"
          }`}
          type="primary"
        />
        <Button
          variant="ghost"
          className="cursor-pointer hover:text-purplish-blue underline text-sm !px-0"
          onClick={onPlanChange}
        >
          Change
        </Button>

        {formData.addOns.length > 0 && (
          <>
            <div className="h-px bg-light-gray my-4" />
            <div className="space-y-3">
              {formData.addOns.map((addonId) => {
                const addon =
                  ADD_ONS_SIMPLE[addonId as keyof typeof ADD_ONS_SIMPLE];
                if (!addon) return null;

                return (
                  <SummaryItem
                    key={addonId}
                    label={addon.name}
                    value={`+$${isYearly ? addon.yearly : addon.monthly}/${
                      isYearly ? "yr" : "mo"
                    }`}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <SummaryItem
          label={`Total (per ${isYearly ? "year" : "month"})`}
          value={`$${calculateTotal(formData)}/${isYearly ? "yr" : "mo"}`}
          type="primary"
        />
      </div>
    </Step>
  );
}
