"use client";

import { usePreferences, CurrencyType, AreaUnitType } from "@/context/PreferencesContext";

export function CurrencyUnitSelector() {
  const { currency, setCurrency, areaUnit, setAreaUnit, rates } = usePreferences();

  return (
    <div className="pref-selector-bar">
      {/* Currency Switcher */}
      <div className="pref-group">
        {(["PKR", "USD", "AED"] as CurrencyType[]).map((cur) => (
          <button
            key={cur}
            type="button"
            className={`pref-btn ${currency === cur ? "active" : ""}`}
            onClick={() => setCurrency(cur)}
            title={
              cur !== "PKR"
                ? `1 ${cur} = ~PKR ${rates[cur]} (Live conversion)`
                : "Base Currency: Pakistani Rupee"
            }
          >
            {cur}
          </button>
        ))}
      </div>

      <span className="pref-divider">|</span>

      {/* Area Unit Switcher */}
      <div className="pref-group">
        {(
          [
            { id: "sqyd", label: "Sq. Yd (Gaz)" },
            { id: "sqft", label: "Sq. Ft" },
          ] as { id: AreaUnitType; label: string }[]
        ).map((unit) => (
          <button
            key={unit.id}
            type="button"
            className={`pref-btn ${areaUnit === unit.id ? "active" : ""}`}
            onClick={() => setAreaUnit(unit.id)}
          >
            {unit.label}
          </button>
        ))}
      </div>
    </div>
  );
}
