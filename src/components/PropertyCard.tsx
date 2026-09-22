"use client";

import { useState } from "react";
import Link from "next/link";
import { Property } from "@/data/properties";
import { usePreferences } from "@/context/PreferencesContext";

interface PropertyCardProps {
  property: Property;
  onToggleFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export function PropertyCard({ property, onToggleFavorite, isFavorite }: PropertyCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const {
    isSaved: contextIsSaved,
    toggleSave: contextToggleSave,
    isCompared,
    toggleCompare,
    formatPrice,
    formatArea,
  } = usePreferences();

  const saved = isFavorite !== undefined ? isFavorite : contextIsSaved(property.id);
  const compared = isCompared(property.id);

  const images = property.images && property.images.length > 0 ? property.images : [property.coverImage];

  function handleToggleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    } else {
      contextToggleSave(property.id);
    }
  }

  function handleToggleCompare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(property.id);
  }

  function handleImageNav(e: React.MouseEvent, direction: "next" | "prev") {
    e.preventDefault();
    e.stopPropagation();
    if (direction === "next") {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }

  const whatsappMessage = encodeURIComponent(
    `Salam, I am interested in "${property.title}" (${property.price}) listed on Karachi Estate Hub. Please share more details: https://karachiestate.pk/properties/${property.id}`
  );

  return (
    <article className="prop-card">
      <div className="prop-card-media">
        <Link href={`/properties/${property.id}`} className="prop-card-link-overlay" aria-label={property.title}>
          <div
            className="prop-card-image"
            style={{ backgroundImage: `url(${images[activeImageIndex]})` }}
          />
        </Link>

        {/* Top Badges */}
        <div className="prop-card-badges-top">
          <span className={`prop-badge-purpose ${property.purpose === "buy" ? "badge-buy" : "badge-rent"}`}>
            {property.purpose === "buy" ? "For Sale" : "For Rent"}
          </span>
          {property.badge && (
            <span className="prop-badge-special">
              {property.badge === "Verified" && <span className="verified-check">✓ </span>}
              {property.badge}
            </span>
          )}
        </div>

        {/* Heart / Favorite Button & Compare Trigger */}
        <div className="prop-card-actions-top-right">
          <button
            type="button"
            className={`prop-card-compare-btn ${compared ? "is-compared" : ""}`}
            onClick={handleToggleCompare}
            title={compared ? "Remove from comparison" : "Compare this property"}
            aria-label="Compare property"
          >
            ⚖️
          </button>
          <button
            type="button"
            className={`prop-card-heart ${saved ? "is-saved" : ""}`}
            onClick={handleToggleSave}
            aria-label={saved ? "Remove from saved" : "Save property"}
            aria-pressed={saved}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="heart-svg">
              <path d="M20.8 8.7c0 5.4-8.8 10-8.8 10s-8.8-4.6-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
            </svg>
          </button>
        </div>

        {/* Image Slider Controls (if multiple images) */}
        {images.length > 1 && (
          <>
            <div className="prop-card-slider-arrows">
              <button
                type="button"
                className="slider-arrow prev"
                onClick={(e) => handleImageNav(e, "prev")}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                className="slider-arrow next"
                onClick={(e) => handleImageNav(e, "next")}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
            <div className="prop-card-dots">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === activeImageIndex ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImageIndex(idx);
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Property Type Floating Tag */}
        <span className="prop-card-type-tag">{property.propertyType}</span>
      </div>

      <div className="prop-card-content">
        <div className="prop-card-header">
          <div className="prop-card-location">
            <svg viewBox="0 0 24 24" className="location-icon" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            <span>{property.location.area}, {property.location.city}</span>
          </div>
          <h3 className="prop-card-title">
            <Link href={`/properties/${property.id}`}>{property.title}</Link>
          </h3>
          <p className="prop-card-tagline">{property.tagline}</p>
        </div>

        {/* Specs Grid */}
        <div className="prop-card-specs">
          <div className="spec-item" title={`${property.bedrooms} Bedrooms`}>
            <svg viewBox="0 0 24 24" className="spec-icon" aria-hidden="true">
              <path d="M3 7v11m0-4h18m0-7v11M7 10h4a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2z" />
            </svg>
            <span><b>{property.bedrooms}</b> Beds</span>
          </div>

          <div className="spec-item" title={`${property.bathrooms} Bathrooms`}>
            <svg viewBox="0 0 24 24" className="spec-icon" aria-hidden="true">
              <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1zm2-8h4a2 2 0 0 1 2 2v6H4V6a2 2 0 0 1 2-2z" />
            </svg>
            <span><b>{property.bathrooms}</b> Baths</span>
          </div>

          <div className="spec-item" title={`Area: ${property.area}`}>
            <svg viewBox="0 0 24 24" className="spec-icon" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18M9 21V9" />
            </svg>
            <span><b>{formatArea(property.areaSqFt, property.area)}</b></span>
          </div>

          <div className="spec-item" title={`${property.parkingSpaces} Car Parking`}>
            <svg viewBox="0 0 24 24" className="spec-icon" aria-hidden="true">
              <path d="M5 17h14M7 17V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v9M9 17v2m6-2v2" />
            </svg>
            <span><b>{property.parkingSpaces}</b> Cars</span>
          </div>
        </div>

        {/* Card Footer with Price and CTAs */}
        <div className="prop-card-footer">
          <div className="prop-card-price-block">
            <span className="price-label">{property.purpose === "buy" ? "Guide Price" : "Monthly Rent"}</span>
            <div className="price-value">
              <strong>{formatPrice(property.priceNumeric, property.purpose)}</strong>
              {property.purpose === "rent" && <small>/mo</small>}
            </div>
          </div>

          <div className="prop-card-actions">
            <a
              href={`https://wa.me/${property.agent.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              title="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="wa-icon" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.95.57 3.86 1.64 5.51L2 22l4.74-1.72a9.87 9.87 0 0 0 5.3 1.52h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.28c-.24.68-1.39 1.33-1.92 1.38-.5.06-1.12.08-3.6-1.03-3.17-1.42-5.18-4.73-5.34-4.95-.16-.22-1.28-1.7-1.28-3.24 0-1.54.81-2.3 1.1-2.61.29-.31.63-.39.84-.39.21 0 .42 0 .61.01.2.01.46-.07.72.55.27.65.92 2.25.99 2.42.08.17.13.37.03.59-.11.22-.16.35-.32.54-.16.19-.34.42-.49.57-.16.16-.33.34-.14.67.19.33.85 1.4 1.82 2.26 1.25 1.11 2.3 1.46 2.63 1.62.33.16.52.14.72-.09.2-.23.84-.98 1.07-1.31.22-.33.45-.28.75-.17.31.11 1.96.93 2.3 1.1.33.16.55.24.63.38.08.14.08.8-.16 1.48z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <Link href={`/properties/${property.id}`} className="btn-view-details">
              <span>Explore</span>
              <span className="arrow">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
