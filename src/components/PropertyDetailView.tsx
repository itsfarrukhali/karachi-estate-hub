"use client";

import { useState } from "react";
import Link from "next/link";
import { Property, getSimilarProperties } from "@/data/properties";
import { usePreferences } from "@/context/PreferencesContext";
import { PropertyCard } from "./PropertyCard";
import { ScheduleTourModal } from "./ScheduleTourModal";
import { CurrencyUnitSelector } from "./CurrencyUnitSelector";

interface PropertyDetailViewProps {
  property: Property;
}

export function PropertyDetailView({ property }: PropertyDetailViewProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    isSaved,
    toggleSave,
    isCompared,
    toggleCompare,
    formatPrice,
    formatArea,
    setIsDrawerOpen,
    savedIds,
  } = usePreferences();

  const saved = isSaved(property.id);
  const compared = isCompared(property.id);

  // Buy Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [loanTenureYears, setLoanTenureYears] = useState(15);
  const [interestRate, setInterestRate] = useState(13.5);

  // Rent Calculator State
  const [advanceRentMonths, setAdvanceRentMonths] = useState(3);
  const [depositMonths, setDepositMonths] = useState(3);

  // Sidebar Inquiry Form State
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState(
    `Salam, I would like more information on ${property.title} in ${property.location.area}.`
  );
  const [inquirySent, setInquirySent] = useState(false);

  const images = property.images && property.images.length > 0 ? property.images : [property.coverImage];
  const similarProperties = getSimilarProperties(property.id, 3);

  // Mortgage EMI Calculation (standard banking formula)
  const propertyPrice = property.priceNumeric;
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanPrincipal = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTenureYears * 12;
  const monthlyEmi =
    monthlyRate > 0
      ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : loanPrincipal / totalMonths;

  // Rent Upfront Calculation
  const monthlyRent = property.priceNumeric;
  const securityDepositAmount = monthlyRent * depositMonths;
  const advanceRentAmount = monthlyRent * advanceRentMonths;
  const totalUpfrontMoveIn = securityDepositAmount + advanceRentAmount;

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  }

  function handlePrintDossier() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  function handleInquirySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (inquiryName && inquiryPhone) {
      setInquirySent(true);
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum ${property.agent.name}, I am interested in the "${property.title}" in ${property.location.area} listed at ${property.price}. Please share more details.`
  );

  return (
    <div className="prop-detail-page">
      {/* Top Bar Header with Currency & Unit Switcher */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span>✨ Real Estate Agency Solutions · Karachi, PK</span>
          <div className="topbar-right-wrap">
            <CurrencyUnitSelector />
            <span className="topbar-right">Karachi, PK</span>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="nav container">
        <Link href="/" className="brand" aria-label="Karachi Estate Hub home">
          <span className="brand-mark">K</span>
          <span>karachi<span>estate</span></span>
        </Link>
        <nav className="nav-links">
          <Link href="/properties?purpose=buy">Buy</Link>
          <Link href="/properties?purpose=rent">Rent</Link>
          <Link href="/properties">All Properties</Link>
          <Link href="/list-property">List your property</Link>
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            className="saved-link-btn"
            onClick={() => setIsDrawerOpen(true)}
            title="Open saved shortlist"
          >
            ♡ Saved <small>{savedIds.length}</small>
          </button>
          <button
            type="button"
            className="share-btn-top"
            onClick={handleShare}
            title="Share property link"
          >
            {copiedLink ? "✓ Link Copied!" : "🔗 Share"}
          </button>
          <button
            type="button"
            className="print-dossier-btn"
            onClick={handlePrintDossier}
            title="Print or Save PDF Dossier"
          >
            🖨️ Print Dossier
          </button>
        </div>
      </header>

      {/* Breadcrumbs & Title Bar */}
      <section className="container prop-header-section">
        <div className="breadcrumbs">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/properties">Properties</Link>
          <span>/</span>
          <Link href={`/properties?purpose=${property.purpose}`}>
            {property.purpose === "buy" ? "For Sale" : "For Rent"}
          </Link>
          <span>/</span>
          <span className="current">{property.location.area}</span>
        </div>

        <div className="prop-main-heading-row">
          <div className="heading-left">
            <div className="badge-row">
              <span className={`prop-badge-purpose ${property.purpose === "buy" ? "badge-buy" : "badge-rent"}`}>
                {property.purpose === "buy" ? "For Sale" : "For Rent"}
              </span>
              {property.badge && (
                <span className="prop-badge-special">
                  {property.badge === "Verified" && "✓ "}
                  {property.badge}
                </span>
              )}
              <span className="prop-type-pill">{property.propertyType}</span>
              <span className="prop-id-code">ID: #{property.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <h1 className="prop-title">{property.title}</h1>
            <p className="prop-address">
              <svg viewBox="0 0 24 24" className="location-pin-icon" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              {property.location.fullAddress}
            </p>
          </div>

          <div className="heading-right">
            <div className="price-tag-large">
              <span className="price-type-label">
                {property.purpose === "buy" ? "Guide Price" : "Monthly Rent"}
              </span>
              <div className="price-val">
                {formatPrice(property.priceNumeric, property.purpose)}
                {property.purpose === "rent" && <small>/month</small>}
              </div>
              <span className="price-per-sqft">
                Approx. PKR {Math.round(property.priceNumeric / property.areaSqFt).toLocaleString()} / sq. ft
              </span>
            </div>

            <div className="action-buttons-row">
              <button
                type="button"
                className={`compare-prop-btn ${compared ? "is-active" : ""}`}
                onClick={() => toggleCompare(property.id)}
                title="Add to side-by-side comparison"
              >
                ⚖️ {compared ? "Comparing" : "Compare"}
              </button>

              <button
                type="button"
                className={`save-prop-btn ${saved ? "is-active" : ""}`}
                onClick={() => toggleSave(property.id)}
                aria-label="Save to favorites"
              >
                <svg viewBox="0 0 24 24" className="heart-icon-btn" aria-hidden="true">
                  <path d="M20.8 8.7c0 5.4-8.8 10-8.8 10s-8.8-4.6-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
                </svg>
                {saved ? "Saved" : "Save"}
              </button>

              <button
                type="button"
                className="primary-button schedule-btn-trigger"
                onClick={() => setIsTourModalOpen(true)}
              >
                📅 Schedule Viewing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Photo Mosaic */}
      <section className="container gallery-section">
        <div className="mosaic-grid">
          <div
            className="mosaic-item mosaic-lead"
            style={{ backgroundImage: `url(${images[0]})` }}
            onClick={() => setSelectedPhotoIndex(0)}
          >
            <span className="mosaic-expand-hint">🔍 Click to enlarge</span>
          </div>
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              className={`mosaic-item mosaic-sub-${idx + 1}`}
              style={{ backgroundImage: `url(${img})` }}
              onClick={() => setSelectedPhotoIndex(idx + 1)}
            >
              {idx === 3 && images.length > 5 && (
                <div className="more-photos-overlay">
                  <span>+{images.length - 4} Photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <section className="container prop-body-layout">
        {/* Left Column: Details, Amenities, Floor Plans, Calculators */}
        <div className="prop-left-col">
          {/* Key Specs Bar */}
          <div className="specs-card">
            {property.bedrooms > 0 ? (
              <div className="spec-tile">
                <span className="spec-label">Bedrooms</span>
                <strong className="spec-value">🛏️ {property.bedrooms} Beds</strong>
              </div>
            ) : (
              <div className="spec-tile">
                <span className="spec-label">Category</span>
                <strong className="spec-value">📍 {property.propertyType}</strong>
              </div>
            )}

            {property.bathrooms > 0 && (
              <div className="spec-tile">
                <span className="spec-label">Bathrooms</span>
                <strong className="spec-value">🚿 {property.bathrooms} Baths</strong>
              </div>
            )}

            <div className="spec-tile">
              <span className="spec-label">Covered Area</span>
              <strong className="spec-value">📐 {formatArea(property.areaSqFt, property.area)}</strong>
            </div>

            <div className="spec-tile">
              <span className="spec-label">{property.parkingSpaces > 0 ? "Parking" : "Orientation"}</span>
              <strong className="spec-value">{property.parkingSpaces > 0 ? `🚗 ${property.parkingSpaces} Cars` : (property.facing || "Open")}</strong>
            </div>

            <div className="spec-tile">
              <span className="spec-label">Status</span>
              <strong className="spec-value">🏗️ {property.yearBuilt ? `${property.yearBuilt}` : "Ready"}</strong>
            </div>

            <div className="spec-tile">
              <span className="spec-label">Furnishing</span>
              <strong className="spec-value">🛋️ {property.furnished}</strong>
            </div>
          </div>

          {/* Editorial Description */}
          <div className="content-box">
            <span className="eyebrow">
              <span className="eyebrow-line" /> THE PROPERTY
            </span>
            <h2>Architectural Overview</h2>
            <div className="description-paragraphs">
              {property.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Key Features & Highlights */}
          <div className="content-box">
            <span className="eyebrow">
              <span className="eyebrow-line" /> HIGHLIGHTS
            </span>
            <h2>Key Property Features</h2>
            <div className="features-grid">
              {property.features.map((feature, i) => (
                <div className="feature-item" key={i}>
                  <span className="feature-check">✦</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categorized Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="content-box">
              <span className="eyebrow">
                <span className="eyebrow-line" /> SPECIFICATIONS
              </span>
              <h2>Amenities &amp; Utility Systems</h2>
              <div className="amenities-categories">
                {property.amenities.map((cat, idx) => (
                  <div className="amenity-group" key={idx}>
                    <h3>{cat.category}</h3>
                    <ul>
                      {cat.items.map((item, i) => (
                        <li key={i}>
                          <span className="dot-mark">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floor Plan Breakdown */}
          {property.floorPlan && (
            <div className="content-box">
              <span className="eyebrow">
                <span className="eyebrow-line" /> ARCHITECTURE
              </span>
              <h2>{property.floorPlan.title}</h2>
              <div className="floorplan-levels">
                {property.floorPlan.levels.map((lvl, i) => (
                  <div className="floorplan-card" key={i}>
                    <div className="floorplan-header">
                      <strong>{lvl.name}</strong>
                      <span className="floorplan-size">{lvl.size}</span>
                    </div>
                    <p className="floorplan-details">{lvl.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Estimator (Mortgage for Buy, Deposit for Rent) */}
          <div className="content-box calculator-box">
            {property.purpose === "buy" ? (
              <>
                <span className="eyebrow">
                  <span className="eyebrow-line" /> HOME FINANCING
                </span>
                <h2>Mortgage &amp; EMI Estimator</h2>
                <p className="calc-sub">
                  Estimate your monthly payment with local Pakistani commercial banks (e.g. Meezan Bank, HBL, Bank Alfalah).
                </p>

                <div className="calc-grid">
                  <div className="calc-inputs">
                    <div className="calc-input-row">
                      <div className="label-val-row">
                        <label>Down Payment ({downPaymentPercent}%)</label>
                        <strong>{formatPrice(downPaymentAmount)}</strong>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={downPaymentPercent}
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="calc-range"
                      />
                    </div>

                    <div className="calc-input-row">
                      <div className="label-val-row">
                        <label>Loan Duration</label>
                        <strong>{loanTenureYears} Years ({loanTenureYears * 12} mo)</strong>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="25"
                        step="5"
                        value={loanTenureYears}
                        onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                        className="calc-range"
                      />
                    </div>

                    <div className="calc-input-row">
                      <div className="label-val-row">
                        <label>Annual Interest Rate (KIBOR + Margin)</label>
                        <strong>{interestRate}%</strong>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="20"
                        step="0.5"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="calc-range"
                      />
                    </div>
                  </div>

                  <div className="calc-result-panel">
                    <span className="result-label">Estimated Monthly Payment</span>
                    <strong className="monthly-emi-amount">{formatPrice(monthlyEmi)}/mo</strong>
                    <div className="emi-breakdown">
                      <div>
                        <span>Loan Principal:</span>
                        <b>{formatPrice(loanPrincipal)}</b>
                      </div>
                      <div>
                        <span>Down Payment:</span>
                        <b>{formatPrice(downPaymentAmount)}</b>
                      </div>
                      <div>
                        <span>Tenure:</span>
                        <b>{loanTenureYears} Years</b>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="calc-apply-btn"
                      onClick={() => setIsTourModalOpen(true)}
                    >
                      Apply for Bank Pre-Approval →
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="eyebrow">
                  <span className="eyebrow-line" /> LEASE BREAKDOWN
                </span>
                <h2>Rent &amp; Move-In Cost Calculator</h2>
                <p className="calc-sub">
                  Calculate the initial capital required to secure this rental home in {property.location.area}.
                </p>

                <div className="calc-grid">
                  <div className="calc-inputs">
                    <div className="calc-input-row">
                      <div className="label-val-row">
                        <label>Refundable Security Deposit</label>
                        <strong>{depositMonths} Months ({formatPrice(securityDepositAmount)})</strong>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        step="1"
                        value={depositMonths}
                        onChange={(e) => setDepositMonths(Number(e.target.value))}
                        className="calc-range"
                      />
                    </div>

                    <div className="calc-input-row">
                      <div className="label-val-row">
                        <label>Advance Rent Required</label>
                        <strong>{advanceRentMonths} Months ({formatPrice(advanceRentAmount)})</strong>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="6"
                        step="1"
                        value={advanceRentMonths}
                        onChange={(e) => setAdvanceRentMonths(Number(e.target.value))}
                        className="calc-range"
                      />
                    </div>
                  </div>

                  <div className="calc-result-panel">
                    <span className="result-label">Total Move-in Cost</span>
                    <strong className="monthly-emi-amount">{formatPrice(totalUpfrontMoveIn)}</strong>
                    <div className="emi-breakdown">
                      <div>
                        <span>Advance Rent ({advanceRentMonths} mo):</span>
                        <b>{formatPrice(advanceRentAmount)}</b>
                      </div>
                      <div>
                        <span>Refundable Deposit ({depositMonths} mo):</span>
                        <b>{formatPrice(securityDepositAmount)}</b>
                      </div>
                      <div>
                        <span>Monthly Rent:</span>
                        <b>{formatPrice(property.priceNumeric, "rent")}/mo</b>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="calc-apply-btn"
                      onClick={() => setIsTourModalOpen(true)}
                    >
                      Book Rental Inspection →
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Neighborhood & Nearby Landmarks */}
          <div className="content-box">
            <span className="eyebrow">
              <span className="eyebrow-line" /> LOCALITY &amp; LIFESTYLE
            </span>
            <h2>{property.location.area} Highlights</h2>
            <p className="calc-sub">
              Key distances and transport convenience from this address:
            </p>
            <div className="landmarks-grid">
              {property.nearbyLandmarks.map((landmark, i) => (
                <div className="landmark-tile" key={i}>
                  <div className="landmark-type-tag">{landmark.type}</div>
                  <strong>{landmark.name}</strong>
                  <span>📍 {landmark.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Contact & Booking Sidebar */}
        <aside className="prop-right-col">
          <div className="sticky-agent-card">
            {/* Agent Profile */}
            <div className="agent-profile-header">
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="agent-avatar-img"
              />
              <div className="agent-meta">
                <span className="agent-verified-badge">✓ Verified Partner</span>
                <h3 className="agent-name">{property.agent.name}</h3>
                <p className="agent-role">{property.agent.role}</p>
                <div className="agent-rating">
                  ⭐ <strong>{property.agent.rating}</strong> ({property.agent.reviewsCount} reviews) · {property.agent.experienceYears} yrs exp
                </div>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="agent-actions-stack">
              <a
                href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa-large"
              >
                <svg viewBox="0 0 24 24" className="wa-icon-large" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.95.57 3.86 1.64 5.51L2 22l4.74-1.72a9.87 9.87 0 0 0 5.3 1.52h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.28c-.24.68-1.39 1.33-1.92 1.38-.5.06-1.12.08-3.6-1.03-3.17-1.42-5.18-4.73-5.34-4.95-.16-.22-1.28-1.7-1.28-3.24 0-1.54.81-2.3 1.1-2.61.29-.31.63-.39.84-.39.21 0 .42 0 .61.01.2.01.46-.07.72.55.27.65.92 2.25.99 2.42.08.17.13.37.03.59-.11.22-.16.35-.32.54-.16.19-.34.42-.49.57-.16.16-.33.34-.14.67.19.33.85 1.4 1.82 2.26 1.25 1.11 2.3 1.46 2.63 1.62.33.16.52.14.72-.09.2-.23.84-.98 1.07-1.31.22-.33.45-.28.75-.17.31.11 1.96.93 2.3 1.1.33.16.55.24.63.38.08.14.08.8-.16 1.48z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>

              <a href={`tel:${property.agent.phone}`} className="btn-call-agent">
                📞 Call {property.agent.phone}
              </a>

              <button
                type="button"
                className="btn-book-viewing"
                onClick={() => setIsTourModalOpen(true)}
              >
                📅 Schedule Private Viewing
              </button>
            </div>

            {/* Quick Inquiry Form */}
            <div className="inquiry-form-wrap">
              <h4>Request Property Dossier</h4>
              {inquirySent ? (
                <div className="inquiry-success">
                  <span className="success-icon">✓</span>
                  <strong>Inquiry Received!</strong>
                  <p>{property.agent.name} has been notified and will respond via WhatsApp / Phone shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="inquiry-form">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp (+92...)"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    required
                  />
                  <textarea
                    rows={3}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    required
                  />
                  <button type="submit" className="primary-button full-width">
                    Send Inquiry <span>↗</span>
                  </button>
                </form>
              )}
            </div>

            {/* Trust Assurance */}
            <div className="assurance-box">
              <span>🔒 100% Verified Title Deed &amp; Clear Documents</span>
              <span>⚡ Fast-track transfer assistance included</span>
            </div>
          </div>
        </aside>
      </section>

      {/* Similar / Recommended Properties */}
      {similarProperties.length > 0 && (
        <section className="container similar-props-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-line" /> RECOMMENDATIONS
              </span>
              <h2>Similar Properties in Karachi</h2>
            </div>
            <Link href="/properties" className="text-link">
              View all listings ↗
            </Link>
          </div>
          <div className="prop-cards-grid">
            {similarProperties.map((similarProp) => (
              <PropertyCard key={similarProp.id} property={similarProp} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox / Modal for Photos */}
      {selectedPhotoIndex !== null && (
        <div className="lightbox-backdrop" onClick={() => setSelectedPhotoIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label="Close photo viewer"
            >
              ✕
            </button>
            <img
              src={images[selectedPhotoIndex]}
              alt={`${property.title} photo ${selectedPhotoIndex + 1}`}
              className="lightbox-img"
            />
            <div className="lightbox-controls">
              <button
                type="button"
                onClick={() =>
                  setSelectedPhotoIndex(
                    (selectedPhotoIndex - 1 + images.length) % images.length
                  )
                }
              >
                ‹ Previous
              </button>
              <span>
                {selectedPhotoIndex + 1} of {images.length}
              </span>
              <button
                type="button"
                onClick={() =>
                  setSelectedPhotoIndex((selectedPhotoIndex + 1) % images.length)
                }
              >
                Next ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Tour Modal */}
      <ScheduleTourModal
        property={property}
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <span className="brand-mark">K</span>
              <span>karachi<span>estate</span></span>
            </Link>
            <p>
              Property with a point of view.<br />
              Made for Karachi.
            </p>
            <div className="socials">
              <a href="#instagram">ig</a>
              <a href="#facebook">f</a>
              <a href="#linkedin">in</a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/properties?purpose=buy">Buy a property</Link>
            <Link href="/properties?purpose=rent">Rent a property</Link>
            <Link href="/properties">All Neighbourhoods</Link>
            <Link href="/list-property">List your property</Link>
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/#about">About us</Link>
            <Link href="/#services">Our services</Link>
            <Link href="/#contact">Contact</Link>
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href="tel:+9221111222333">021 111 222 333</a>
            <a href="mailto:hello@karachiestate.pk">hello@karachiestate.pk</a>
            <p className="footer-address">
              Clifton, Karachi<br />
              Mon–Sat, 9am–6pm
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2025 Karachi Estate. All rights reserved.</span>
          <span>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#sitemap">Sitemap</a>
          </span>
          <span>Made with care in Karachi <b>♥</b></span>
        </div>
      </footer>
    </div>
  );
}
