import { FormData } from "@/types";
import { Step } from "@/components/ui/Step";
import { SummaryItem } from "@/components/ui/SummaryItem";
import { Button } from "../ui/Button";
import { PLANS_SIMPLE, ADD_ONS_SIMPLE } from "@/config/constants";
import { Tooltip } from "../ui/Tooltip";

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
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-marine-blue text-lg">
              {`${formData.plan} (${isYearly ? "Yearly" : "Monthly"})`}
            </span>
            <Tooltip content="Includes basic gaming features and cloud storage">
              <span className="text-xs text-cool-gray cursor-help">ⓘ</span>
            </Tooltip>
          </div>
          <span className="font-bold text-marine-blue">
            ${isYearly ? selectedPlan.yearly : selectedPlan.monthly}/$
            {isYearly ? "yr" : "mo"}
          </span>
        </div>

        <Button
          variant="ghost"
          className="text-sm text-cool-gray hover:text-purplish-blue underline !px-0"
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
                  <div
                    key={addonId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cool-gray">{addon.name}</span>
                      <Tooltip content={getAddonDescription(addonId)}>
                        <span className="text-xs text-cool-gray cursor-help">
                          ⓘ
                        </span>
                      </Tooltip>
                    </div>
                    <span className="text-marine-blue">
                      +${isYearly ? addon.yearly : addon.monthly}/$
                      {isYearly ? "yr" : "mo"}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="p-6 mt-4 bg-magnolia rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-cool-gray">
            Total (per {isYearly ? "year" : "month"})
          </span>
          <span className="text-xl font-bold text-purplish-blue">
            ${calculateTotal(formData)}/{isYearly ? "yr" : "mo"}
          </span>
        </div>
      </div>
    </Step>
  );
}

function getAddonDescription(addonId: string): string {
  const descriptions = {
    online: "Access multiplayer games and online features",
    storage: "1TB of cloud storage for game saves and screenshots",
    profile: "Customize your gaming profile with themes and badges",
  };
  return descriptions[addonId as keyof typeof descriptions] || "";
}
