export interface CountryPackage {
  packageId: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  isPopular: boolean;
  subscriptionType: string;
  accessType: string;
  numberOfUsers: number;
  adminUsers: number;
  benefits: string[];
  currency: string;
  modules: {
    icon: string;
    name: string;
  }[];
}

export interface UpgradePlanSummary {
  monthlyPrice: String;
  yearlyPrice: String;
  creditApplied: String;
  monthsCovered: String;
  upgradeSummaryText: String;
  yearlyNextBillingDate: String;
  monthlyBillingDate: String;
  finalMonthlyPrice: String;
  finalYearlyPrice: String;
  creditAppliedMonthly: String;
  creditAppliedYearly: String;
}
