"use client";

import Link from "next/link";
import { usePreferences } from "@/context/PreferencesContext";

export function ComparisonModal() {
  const {
    isCompareModalOpen,
    setIsCompareModalOpen,
    comparedProperties,
    toggleCompare,
    clearCompare,
    formatPrice,
    formatArea,
  } = usePreferences();

  if (!isCompareModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsCompareModalOpen(false)}>
      <div className="compare-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="compare-modal-header">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" /> SIDE-BY-SIDE EVALUATION
            </span>
            <h2>Compare Properties ({comparedProperties.length})</h2>
          </div>
          <div className="compare-header-right">
            <button
              type="button"
              className="compare-clear-btn-top"
              onClick={() => {
                clearCompare();
                setIsCompareModalOpen(false);
              }}
            >
              Clear Comparison
            </button>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsCompareModalOpen(false)}
              aria-label="Close comparison"
            >
              ✕
            </button>
          </div>
        </div>

        {comparedProperties.length === 0 ? (
          <div className="compare-empty">
            <p>No properties selected for comparison. Select up to 3 properties from the listings page.</p>
          </div>
        ) : (
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="feature-col">Property</th>
                  {comparedProperties.map((p) => (
                    <th key={p.id} className="prop-col">
                      <div className="compare-card-header">
                        <button
                          type="button"
                          className="compare-remove-prop"
                          onClick={() => toggleCompare(p.id)}
                          title="Remove from comparison"
                        >
                          ✕
                        </button>
                        <div
                          className="compare-table-img"
                          style={{ backgroundImage: `url(${p.coverImage})` }}
                        />
                        <span className={`saved-purpose-tag ${p.purpose}`}>
                          {p.purpose === "buy" ? "For Sale" : "For Rent"}
                        </span>
                        <h4>{p.title}</h4>
                        <strong className="compare-price">
                          {formatPrice(p.priceNumeric, p.purpose)}
                          {p.purpose === "rent" && <small>/mo</small>}
                        </strong>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-col">Location</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>
                      <strong>{p.location.area}</strong>
                      <br />
                      <small>{p.location.city}</small>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Property Type</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>{p.propertyType}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Bedrooms &amp; Baths</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>
                      <b>{p.bedrooms}</b> Beds · <b>{p.bathrooms}</b> Baths
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Covered Area</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>
                      <strong>{formatArea(p.areaSqFt, p.area)}</strong>
                      {p.plotSize && <small className="plot-note"><br />Plot: {p.plotSize}</small>}
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Rate / Sq. Ft</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>
                      ~ PKR {Math.round(p.priceNumeric / p.areaSqFt).toLocaleString()} / sq. ft
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Car Parking</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>{p.parkingSpaces} Dedicated Spaces</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Furnishing</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>{p.furnished}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Year Built</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>{p.yearBuilt}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Facing Direction</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id}>{p.facing || "Standard Open"}</td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Key Features</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="features-cell">
                      <ul>
                        {p.features.slice(0, 4).map((f, i) => (
                          <li key={i}>✦ {f}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="feature-col">Action</td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="action-cell">
                      <Link
                        href={`/properties/${p.id}`}
                        className="primary-button full-width"
                        onClick={() => setIsCompareModalOpen(false)}
                      >
                        Explore Details →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
