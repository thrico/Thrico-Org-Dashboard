export const formatPrice = (
  monthly: number,
  yearly: number,
  isYearly: boolean,
  currency: string
) => {
  if (monthly === 0 && yearly === 0) return "Free";
  const price = isYearly ? yearly : monthly;
  const period = isYearly ? "year" : "month";
  return `${currency}${price.toLocaleString()}/${period}`;
};

export const getYearlySavings = (
  monthly: number,
  yearly: number,
  currency: string
) => {
  if (monthly === 0 || yearly === 0) return "₹0.00 (0%)";
  const monthlyTotal = monthly * 12;
  const savings = monthlyTotal - yearly;
  if (savings < 0) return "";
  const percentage = Math.round((savings / monthlyTotal) * 100);
  return `${currency}${savings.toFixed(2)} (${percentage}%)`;
};

export const allPlanPercentage = (
  packages: { monthlyPrice: number; yearlyPrice: number; currency: string }[]
) => {
  if (!packages || packages.length === 0) return 0;
  return Math.max(
    ...packages.map((pkg) => {
      const savingsStr = getYearlySavings(
        pkg.monthlyPrice,
        pkg.yearlyPrice,
        pkg.currency
      );
      // Extract the percentage number from the string, e.g., "₹1200.00 (20%)"
      const match = savingsStr.match(/\((\d+)%\)/);
      return match ? Number(match[1]) : 0;
    })
  );
};
