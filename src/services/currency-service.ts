import type { CurrencyCode, CurrencyOption } from "@/models/ecommerce";

export const currencies: CurrencyOption[] = [
  { code: "USD", label: "US Dollar", symbol: "$", rateFromUsd: 1 },
  { code: "BDT", label: "Bangladeshi Taka", symbol: "\u09F3", rateFromUsd: 117 },
];

export function getCurrency(code: CurrencyCode) {
  return currencies.find((currency) => currency.code === code) ?? currencies[0];
}

export function formatPrice(amountUsd: number, code: CurrencyCode) {
  const convertedAmount = amountUsd * getCurrency(code).rateFromUsd;

  return new Intl.NumberFormat(code === "BDT" ? "bn-BD" : "en-US", {
    currency: code,
    maximumFractionDigits: code === "BDT" ? 0 : 2,
    style: "currency",
  }).format(convertedAmount);
}
