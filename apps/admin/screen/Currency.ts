import React from "react";
import { getEntityCurrency } from "../graphql/actions";
function getCurrencySymbol(code: string): string | undefined {
  const currencySymbols: Record<string, string> = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    AUD: "A$",
    CAD: "C$",
    RUB: "₽",
    KRW: "₩",
    NGN: "₦",
    THB: "฿",
    VND: "₫",
    IDR: "Rp",
  };

  return currencySymbols[code];
}

const GetCurrency = () => {
  const { data, loading } = getEntityCurrency();

  if (loading) {
    return "$"; // Default to $ while loading
  }

  if (!loading) {
    return data?.getEntityCurrency
      ? getCurrencySymbol(data?.getEntityCurrency)
      : "$";
  }
};

export { GetCurrency, getCurrencySymbol };
