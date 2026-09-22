"use client";

import Link from "next/link";
import { usePreferences } from "@/context/PreferencesContext";

export function SavedDrawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    savedProperties,
    toggleSave,
    formatPrice,
  } = usePreferences();

  if (!isDrawerOpen) return null;

  // Build Batch WhatsApp Message
  const batchMessageText = `Salam Karachi Estate Hub Team,

I have shortlisted the following ${savedProperties.length} property listings on your website and would like to arrange viewings / receive complete dossiers:

${savedProperties
  .map(
    (p, i) =>
      `${i + 1}. *${p.title}* (${p.price} - ${p.location.area})\n   Link: https://karachiestate.pk/properties/${p.id}`
  )
  .join("\n\n")}

Please connect me with the respective property advisors. Thank you!`;

  const waUrl = `https://wa.me/923008214590?text=${encodeURIComponent(batchMessageText)}`;

  return (
    <div className="drawer-backdrop" onClick={() => setIsDrawerOpen(false)}>
      <aside className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" /> YOUR SHORTLIST
            </span>
            <h2>Saved Properties ({savedProperties.length})</h2>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close saved drawer"
          >
            ✕
          </button>
        </div>

        <div className="drawer-content">
          {savedProperties.length > 0 ? (
            <div className="saved-items-list">
              {savedProperties.map((prop) => (
                <div className="saved-item-row" key={prop.id}>
                  <div
                    className="saved-item-thumb"
                    style={{ backgroundImage: `url(${prop.coverImage})` }}
                  />
                  <div className="saved-item-details">
                    <span className={`saved-purpose-tag ${prop.purpose}`}>
                      {prop.purpose === "buy" ? "For Sale" : "For Rent"}
                    </span>
                    <h4 className="saved-item-title">
                      <Link
                        href={`/properties/${prop.id}`}
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        {prop.title}
                      </Link>
                    </h4>
                    <p className="saved-item-location">📍 {prop.location.area}</p>
                    <div className="saved-item-bottom">
                      <strong className="saved-item-price">
                        {formatPrice(prop.priceNumeric, prop.purpose)}
                        {prop.purpose === "rent" && <small>/mo</small>}
                      </strong>
                      <button
                        type="button"
                        className="remove-saved-btn"
                        onClick={() => toggleSave(prop.id)}
                        title="Remove from saved"
                      >
                        Remove ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="drawer-empty-state">
              <span className="empty-heart-icon">♡</span>
              <h3>Your shortlist is empty</h3>
              <p>
                Click the heart icon on any property card to save your favorite villas, apartments, and penthouses here.
              </p>
              <Link
                href="/properties"
                className="primary-button"
                onClick={() => setIsDrawerOpen(false)}
              >
                Browse Properties
              </Link>
            </div>
          )}
        </div>

        {savedProperties.length > 0 && (
          <div className="drawer-footer">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa-batch"
            >
              <svg viewBox="0 0 24 24" className="wa-icon" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.95.57 3.86 1.64 5.51L2 22l4.74-1.72a9.87 9.87 0 0 0 5.3 1.52h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.28c-.24.68-1.39 1.33-1.92 1.38-.5.06-1.12.08-3.6-1.03-3.17-1.42-5.18-4.73-5.34-4.95-.16-.22-1.28-1.7-1.28-3.24 0-1.54.81-2.3 1.1-2.61.29-.31.63-.39.84-.39.21 0 .42 0 .61.01.2.01.46-.07.72.55.27.65.92 2.25.99 2.42.08.17.13.37.03.59-.11.22-.16.35-.32.54-.16.19-.34.42-.49.57-.16.16-.33.34-.14.67.19.33.85 1.4 1.82 2.26 1.25 1.11 2.3 1.46 2.63 1.62.33.16.52.14.72-.09.2-.23.84-.98 1.07-1.31.22-.33.45-.28.75-.17.31.11 1.96.93 2.3 1.1.33.16.55.24.63.38.08.14.08.8-.16 1.48z" />
              </svg>
              <span>Inquire on All ({savedProperties.length}) via WhatsApp</span>
            </a>
            <p className="drawer-footer-note">
              Sends an aggregated message with your shortlisted listings directly to our senior advisory desk.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
