import { FormData } from "@/types";
import { PLANS } from "@/config/constants";
import { Step } from "@/components/ui/Step";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/Tooltip";
import Image from "next/image";

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
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        role="radiogroup"
        aria-label="Subscription plans"
      >
        {Object.entries(PLANS).map(([planKey, planDetails]) => (
          <motion.div
            key={planKey}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              role="radio"
              aria-checked={plan === planKey}
              tabIndex={0}
              onClick={() => updateFormData({ plan: planKey })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  updateFormData({ plan: planKey });
                }
              }}
              className={`
                flex flex-row md:flex-col items-start p-4 border-2 rounded-xl cursor-pointer
                transition-all duration-200 h-full
                ${
                  plan === planKey
                    ? "border-purplish-blue bg-alabaster shadow-sm"
                    : "border-light-gray hover:border-purplish-blue"
                }
              `}
            >
              <div className="relative w-10 h-10 mb-4">
                <Image
                  src={planDetails.icon}
                  alt={`${planDetails.name} plan icon`}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                  aria-hidden="true"
                />
              </div>

              <div className="flex-1 md:mt-4">
                <h3 className="text-lg font-bold text-marine-blue">
                  {planDetails.name}
                </h3>
                <p className="text-cool-gray">
                  $
                  {isYearly
                    ? planDetails.yearlyPrice
                    : planDetails.monthlyPrice}
                  /{isYearly ? "yr" : "mo"}
                </p>

                {isYearly && (
                  <div className="mt-2">
                    <span className="text-sm text-marine-blue font-medium">
                      2 months free
                    </span>
                  </div>
                )}

                <Tooltip
                  content={`${planDetails.name} plan features and benefits`}
                >
                  <button
                    className="mt-2 text-xs text-cool-gray hover:text-marine-blue"
                    aria-label={`Learn more about ${planDetails.name} plan`}
                  >
                    ⓘ More info
                  </button>
                </Tooltip>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-alabaster rounded-xl p-4">
        <div className="flex justify-center items-center gap-4">
          <span
            className={`font-medium transition-colors ${
              !isYearly ? "text-marine-blue" : "text-cool-gray"
            }`}
          >
            Monthly
          </span>
          <ToggleSwitch
            checked={isYearly}
            onChange={(checked) => updateFormData({
              billingCycle: checked ? "yearly" : "monthly",
            })}
            aria-label="Toggle billing cycle"
            leftLabel={""}
            rightLabel={""}
          />
          <span
            className={`font-medium transition-colors ${
              isYearly ? "text-marine-blue" : "text-cool-gray"
            }`}
          >
            Yearly
          </span>
        </div>
      </div>
    </Step>
  );
}
