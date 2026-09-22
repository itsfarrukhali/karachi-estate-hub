"use client";

import { usePreferences } from "@/context/PreferencesContext";

export function CompareFloatingBar() {
  const { compareIds, comparedProperties, setIsCompareModalOpen, clearCompare } = usePreferences();

  if (compareIds.length === 0) return null;

  return (
    <div className="compare-floating-bar">
      <div className="compare-bar-inner">
        <div className="compare-info">
          <span className="compare-badge">⚖️ Compare</span>
          <strong>{compareIds.length} of 3 Properties Selected</strong>
        </div>

        <div className="compare-thumbs">
          {comparedProperties.map((p) => (
            <div
              key={p.id}
              className="compare-mini-thumb"
              style={{ backgroundImage: `url(${p.coverImage})` }}
              title={p.title}
            />
          ))}
        </div>

        <div className="compare-actions">
          <button
            type="button"
            className="primary-button compare-launch-btn"
            onClick={() => setIsCompareModalOpen(true)}
          >
            Compare Side-by-Side <span>→</span>
          </button>
          <button
            type="button"
            className="compare-clear-btn"
            onClick={clearCompare}
            title="Clear selected"
          >
            ✕ Clear
          </button>
        </div>
      </div>
    </div>
  );
}
