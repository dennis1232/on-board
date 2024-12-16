import { FormData } from "@/types";
import { ADD_ONS } from "@/config/constants";

import { Step } from "@/components/ui/Step";
import { SelectionCard } from "@/components/ui/SelectionCard";

interface AddOnsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function AddOns({ formData, updateFormData }: AddOnsProps) {
  const toggleAddOn = (addOnId: string) => {
    const newAddOns = formData.addOns.includes(addOnId)
      ? formData.addOns.filter((id) => id !== addOnId)
      : [...formData.addOns, addOnId];
    updateFormData({ addOns: newAddOns });
  };

  return (
    <Step
      title="Pick add-ons"
      description="Add-ons help enhance your gaming experience."
    >
      <div className="space-y-4 md:space-y-6">
        {ADD_ONS.map((addon) => (
          <SelectionCard
            key={addon.id}
            variant="checkbox"
            title={addon.name}
            description={addon.description}
            price={`+$${
              formData.billingCycle === "monthly"
                ? `${addon.monthlyPrice}/mo`
                : `${addon.yearlyPrice}/yr`
            }`}
            isSelected={formData.addOns.includes(addon.id)}
            onClick={() => toggleAddOn(addon.id)}
          />
        ))}
      </div>
    </Step>
  );
}
