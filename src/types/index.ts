export type BillingCycle = "monthly" | "yearly";

export type PlanType = "arcade" | "advanced" | "pro";

export type Plan = {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: string;
};

export type PlansConfig = {
  [key in PlanType]: Plan;
};

export type AddOn = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
};

export type FormData = {
  name: string;
  email: string;
  phone: string;
  plan: string;
  billingCycle: "monthly" | "yearly";
  addOns: string[];
};
