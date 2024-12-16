import { PlansConfig } from "@/types";

export const PLANS: PlansConfig = {
  arcade: {
    name: "Arcade",
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: "/assets/images/icon-arcade.svg",
  },
  advanced: {
    name: "Advanced",
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: "/assets/images/icon-advanced.svg",
  },
  pro: {
    name: "Pro",
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: "/assets/images/icon-pro.svg",
  },
};

export const PLANS_SIMPLE = {
  arcade: { monthly: 9, yearly: 90 },
  advanced: { monthly: 12, yearly: 120 },
  pro: { monthly: 15, yearly: 150 },
};

export const ADD_ONS = [
  {
    id: "online",
    name: "Online service",
    description: "Access to multiplayer games",
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: "storage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: "profile",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

export const ADD_ONS_SIMPLE = {
  online: { name: "Online service", monthly: 1, yearly: 10 },
  storage: { name: "Larger storage", monthly: 2, yearly: 20 },
  profile: { name: "Customizable profile", monthly: 2, yearly: 20 },
};
