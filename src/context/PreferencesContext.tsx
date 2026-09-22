"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { properties, Property, getPropertyById } from "@/data/properties";

export type CurrencyType = "PKR" | "USD" | "AED";
export type AreaUnitType = "sqyd" | "sqft";

// Conversion rates against PKR
const RATES: Record<CurrencyType, number> = {
  PKR: 1,
  USD: 278.5,
  AED: 75.8,
};

interface PreferencesContextType {
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  areaUnit: AreaUnitType;
  setAreaUnit: (u: AreaUnitType) => void;
  savedIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  compareIds: string[];
  toggleCompare: (id: string) => void;
  isCompared: (id: string) => boolean;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  formatPrice: (pkrAmount: number, purpose?: "buy" | "rent") => string;
  formatArea: (sqFt: number, originalText?: string) => string;
  savedProperties: Property[];
  comparedProperties: Property[];
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyType>("PKR");
  const [areaUnit, setAreaUnit] = useState<AreaUnitType>("sqyd");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedCur = localStorage.getItem("keh_currency") as CurrencyType;
      const savedUnit = localStorage.getItem("keh_unit") as AreaUnitType;
      const savedFavs = localStorage.getItem("keh_saved");
      if (savedCur && (savedCur === "PKR" || savedCur === "USD" || savedCur === "AED")) {
        setCurrency(savedCur);
      }
      if (savedUnit && (savedUnit === "sqyd" || savedUnit === "sqft")) {
        setAreaUnit(savedUnit);
      }
      if (savedFavs) {
        setSavedIds(JSON.parse(savedFavs));
      }
    } catch {
      // Ignore in SSR
    }
  }, []);

  function handleSetCurrency(c: CurrencyType) {
    setCurrency(c);
    try {
      localStorage.setItem("keh_currency", c);
    } catch {}
  }

  function handleSetUnit(u: AreaUnitType) {
    setAreaUnit(u);
    try {
      localStorage.setItem("keh_unit", u);
    } catch {}
  }

  function toggleSave(id: string) {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("keh_saved", JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  function isSaved(id: string) {
    return savedIds.includes(id);
  }

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 properties at a time.");
        return prev;
      }
      return [...prev, id];
    });
  }

  function isCompared(id: string) {
    return compareIds.includes(id);
  }

  function clearCompare() {
    setCompareIds([]);
  }

  function formatPrice(pkrAmount: number, purpose: "buy" | "rent" = "buy"): string {
    if (currency === "PKR") {
      if (purpose === "rent") {
        if (pkrAmount >= 100000) {
          return `PKR ${(pkrAmount / 100000).toFixed(1)} Lakh`;
        }
        return `PKR ${pkrAmount.toLocaleString()}`;
      }
      if (pkrAmount >= 10000000) {
        return `PKR ${(pkrAmount / 10000000).toFixed(2)} Cr`;
      }
      if (pkrAmount >= 100000) {
        return `PKR ${(pkrAmount / 100000).toFixed(1)} Lakh`;
      }
      return `PKR ${pkrAmount.toLocaleString()}`;
    }

    // Foreign currency conversion
    const rate = RATES[currency];
    const converted = pkrAmount / rate;

    if (currency === "USD") {
      if (converted >= 1000000) {
        return `$${(converted / 1000000).toFixed(2)}M`;
      }
      if (converted >= 1000) {
        return `$${Math.round(converted / 1000)}k`;
      }
      return `$${Math.round(converted).toLocaleString()}`;
    }

    if (currency === "AED") {
      if (converted >= 1000000) {
        return `AED ${(converted / 1000000).toFixed(2)}M`;
      }
      if (converted >= 1000) {
        return `AED ${Math.round(converted / 1000)}k`;
      }
      return `AED ${Math.round(converted).toLocaleString()}`;
    }

    return `PKR ${pkrAmount.toLocaleString()}`;
  }

  function formatArea(sqFt: number, originalText?: string): string {
    if (areaUnit === "sqyd") {
      const sqYards = Math.round(sqFt / 9);
      if (sqYards >= 100) {
        return `${sqYards} sq. yd.`;
      }
      return originalText || `${sqYards} sq. yd.`;
    }
    return `${sqFt.toLocaleString()} sq. ft.`;
  }

  const savedProperties = savedIds
    .map((id) => getPropertyById(id))
    .filter((p): p is Property => p !== undefined);

  const comparedProperties = compareIds
    .map((id) => getPropertyById(id))
    .filter((p): p is Property => p !== undefined);

  return (
    <PreferencesContext.Provider
      value={{
        currency,
        setCurrency: handleSetCurrency,
        areaUnit,
        setAreaUnit: handleSetUnit,
        savedIds,
        toggleSave,
        isSaved,
        isDrawerOpen,
        setIsDrawerOpen,
        compareIds,
        toggleCompare,
        isCompared,
        clearCompare,
        isCompareModalOpen,
        setIsCompareModalOpen,
        formatPrice,
        formatArea,
        savedProperties,
        comparedProperties,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
