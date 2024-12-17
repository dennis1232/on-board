import { FormData } from "@/types";
import { ADD_ONS } from "@/config/constants";
import { Step } from "@/components/ui/Step";
import { SelectionCard } from "@/components/ui/SelectionCard";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface AddOnsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  isLoading?: boolean;
  error?: string;
}

const formatPrice = (price: number, cycle: "monthly" | "yearly") => {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price) + (cycle === "monthly" ? "/mo" : "/yr")
  );
};

export default function AddOns({
  formData,
  updateFormData,
  isLoading,
  error,
}: AddOnsProps) {
  const [focusedAddon, setFocusedAddon] = useState<string | null>(null);

  const toggleAddOn = (addOnId: string) => {
    const newAddOns = formData.addOns.includes(addOnId)
      ? formData.addOns.filter((id) => id !== addOnId)
      : [...formData.addOns, addOnId];
    updateFormData({ addOns: newAddOns });
  };

  const handleKeyPress = (addOnId: string, event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleAddOn(addOnId);
    }
  };

  if (isLoading) {
    return (
      <Step
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
      >
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-alabaster rounded-lg" />
          ))}
        </div>
      </Step>
    );
  }

  if (error) {
    return (
      <Step
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
      >
        <div className="text-center p-4 text-strawberry-red">
          <p>Error loading add-ons: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-marine-blue underline"
          >
            Try again
          </button>
        </div>
      </Step>
    );
  }

  return (
    <Step
      title="Pick add-ons"
      description="Add-ons help enhance your gaming experience."
    >
      <div
        className="space-y-4 md:space-y-6"
        role="group"
        aria-label="Available add-ons"
      >
        <AnimatePresence>
          {ADD_ONS.map((addon) => (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SelectionCard
                variant="checkbox"
                title={addon.name}
                description={addon.description}
                price={formatPrice(
                  formData.billingCycle === "monthly"
                    ? addon.monthlyPrice
                    : addon.yearlyPrice,
                  formData.billingCycle
                )}
                isSelected={formData.addOns.includes(addon.id)}
                onClick={() => toggleAddOn(addon.id)}
                onKeyDown={(e) => handleKeyPress(addon.id, e)}
                onFocus={() => setFocusedAddon(addon.id)}
                onBlur={() => setFocusedAddon(null)}
                aria-checked={formData.addOns.includes(addon.id)}
                role="checkbox"
                tabIndex={0}
                inputId={`addon-${addon.id}`}
                className={
                  focusedAddon === addon.id ? "ring-2 ring-purplish-blue" : ""
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Step>
  );
}
