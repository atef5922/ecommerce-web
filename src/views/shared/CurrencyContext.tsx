"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CurrencyCode } from "@/models/ecommerce";
import { formatPrice } from "@/services/currency-service";

type CurrencyContextValue = {
  currency: CurrencyCode;
  formatMoney: (amountUsd: number) => string;
  setCurrency: (currency: CurrencyCode) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const value = useMemo(
    () => ({
      currency,
      formatMoney: (amountUsd: number) => formatPrice(amountUsd, currency),
      setCurrency,
    }),
    [currency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
}
