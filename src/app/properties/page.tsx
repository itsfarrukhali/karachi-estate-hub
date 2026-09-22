"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { CurrencyUnitSelector } from "@/components/CurrencyUnitSelector";
import { usePreferences } from "@/context/PreferencesContext";

function PropertiesCatalog() {
  const searchParams = useSearchParams();
  const initialPurpose = searchParams.get("purpose") || searchParams.get("mode") || "all";
  const initialArea = searchParams.get("area") || "";

  const { savedIds, setIsDrawerOpen } = usePreferences();

  const [purposeFilter, setPurposeFilter] = useState<string>(
    initialPurpose === "rent" ? "rent" : initialPurpose === "buy" ? "buy" : "all"
  );
  const [searchTerm, setSearchTerm] = useState(initialArea);
  const [typeFilter, setTypeFilter] = useState("all");
  const [bedsFilter, setBedsFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProperties = useMemo(() => {
    return properties
      .filter((prop) => {
        // Purpose match
        if (purposeFilter !== "all" && prop.purpose !== purposeFilter) {
          return false;
        }

        // Search match (title, area, city, tagline, features)
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchArea = prop.location.area.toLowerCase().includes(term);
          const matchTitle = prop.title.toLowerCase().includes(term);
          const matchTagline = prop.tagline.toLowerCase().includes(term);
          const matchType = prop.propertyType.toLowerCase().includes(term);
          if (!matchArea && !matchTitle && !matchTagline && !matchType) {
            return false;
          }
        }

        // Property Type match
        if (typeFilter !== "all" && prop.propertyType.toLowerCase() !== typeFilter.toLowerCase()) {
          return false;
        }

        // Bedrooms match
        if (bedsFilter !== "all") {
          const minBeds = parseInt(bedsFilter, 10);
          if (prop.bedrooms < minBeds) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.priceNumeric - b.priceNumeric;
        }
        if (sortBy === "price-desc") {
          return b.priceNumeric - a.priceNumeric;
        }
        if (sortBy === "size-desc") {
          return b.areaSqFt - a.areaSqFt;
        }
        return 0; // Default recommended
      });
  }, [purposeFilter, searchTerm, typeFilter, bedsFilter, sortBy]);

  function resetFilters() {
    setPurposeFilter("all");
    setSearchTerm("");
    setTypeFilter("all");
    setBedsFilter("all");
    setSortBy("recommended");
  }

  return (
    <main className="catalog-page">
      {/* Top Bar with Currency/Unit Switcher */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Pakistan&apos;s trusted property partner</span>
          <div className="topbar-right-wrap">
            <CurrencyUnitSelector />
            <span className="topbar-right">Karachi, PK</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="nav container">
        <Link href="/" className="brand" aria-label="Karachi Estate Hub home">
          <span className="brand-mark">K</span>
          <span>karachi<span>estate</span></span>
        </Link>
        <nav className="nav-links">
          <button
            type="button"
            className={`nav-tab-btn ${purposeFilter === "buy" ? "active" : ""}`}
            onClick={() => setPurposeFilter("buy")}
          >
            Buy
          </button>
          <button
            type="button"
            className={`nav-tab-btn ${purposeFilter === "rent" ? "active" : ""}`}
            onClick={() => setPurposeFilter("rent")}
          >
            Rent
          </button>
          <Link href="/list-property">Valuation</Link>
          <Link href="/#services">Advisory</Link>
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
          <Link href="/list-property" className="outline-button">
            List your property
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="catalog-hero container">
        <span className="eyebrow">
          <span className="eyebrow-line" /> KARACHI CURATED PORTFOLIO
        </span>
        <h1>
          Explore homes &amp; properties<br />
          <i>worth living in.</i>
        </h1>
        <p className="catalog-hero-desc">
          Browse verified residential villas, sea-view penthouses, and luxury apartments across Karachi’s most sought-after neighborhoods.
        </p>

        {/* Quick Area Filter Pills */}
        <div className="quick-area-pills">
          <span className="pills-label">Popular Locations:</span>
          {["DHA Phase 6", "Clifton", "Bahria Town", "Gulshan-e-Iqbal", "DHA Phase 8"].map((area) => (
            <button
              key={area}
              type="button"
              className={`area-pill ${searchTerm === area ? "is-selected" : ""}`}
              onClick={() => setSearchTerm(searchTerm === area ? "" : area)}
            >
              {area}
            </button>
          ))}
        </div>
      </section>

      {/* Interactive Filter Toolbar */}
      <section className="container filter-toolbar-wrap">
        <div className="filter-toolbar">
          {/* Purpose Tabs (All / Buy / Rent) */}
          <div className="purpose-switch">
            <button
              type="button"
              className={purposeFilter === "all" ? "active" : ""}
              onClick={() => setPurposeFilter("all")}
            >
              All
            </button>
            <button
              type="button"
              className={purposeFilter === "buy" ? "active" : ""}
              onClick={() => setPurposeFilter("buy")}
            >
              For Sale
            </button>
            <button
              type="button"
              className={purposeFilter === "rent" ? "active" : ""}
              onClick={() => setPurposeFilter("rent")}
            >
              For Rent
            </button>
          </div>

          {/* Location / Keyword Input */}
          <div className="filter-search-input">
            <svg viewBox="0 0 24 24" className="search-icon-sm" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.2 4.2" />
            </svg>
            <input
              type="text"
              placeholder="Search DHA, Clifton, Bahria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>

          {/* Property Type Dropdown */}
          <div className="filter-select-wrap">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Property type"
            >
              <option value="all">All Property Types</option>
              <option value="villa">Villas</option>
              <option value="house">Houses</option>
              <option value="apartment">Apartments</option>
              <option value="penthouse">Penthouses</option>
              <option value="townhouse">Townhouses</option>
            </select>
          </div>

          {/* Bedrooms Dropdown */}
          <div className="filter-select-wrap">
            <select
              value={bedsFilter}
              onChange={(e) => setBedsFilter(e.target.value)}
              aria-label="Minimum bedrooms"
            >
              <option value="all">Any Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="filter-select-wrap">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort listings"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="size-desc">Size: Largest First</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="view-mode-toggle">
            <button
              type="button"
              className={viewMode === "grid" ? "active" : ""}
              onClick={() => setViewMode("grid")}
              title="Grid view"
              aria-label="Grid view"
            >
              ⊞
            </button>
            <button
              type="button"
              className={viewMode === "list" ? "active" : ""}
              onClick={() => setViewMode("list")}
              title="List view"
              aria-label="List view"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Results Count Bar */}
        <div className="results-summary-bar">
          <span>
            Showing <strong>{filteredProperties.length}</strong> {purposeFilter === "buy" ? "properties for sale" : purposeFilter === "rent" ? "properties for rent" : "verified listings"} in Karachi
            {searchTerm ? ` matching "${searchTerm}"` : ""}
          </span>
          {(searchTerm || typeFilter !== "all" || bedsFilter !== "all" || purposeFilter !== "all") && (
            <button type="button" className="reset-filters-btn" onClick={resetFilters}>
              Reset all filters ✕
            </button>
          )}
        </div>
      </section>

      {/* Property Results Grid / List */}
      <section className="container catalog-results-section">
        {filteredProperties.length > 0 ? (
          <div className={viewMode === "grid" ? "prop-cards-grid" : "prop-cards-list-view"}>
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="empty-results-box">
            <span className="empty-icon">🔍</span>
            <h3>No matching properties found</h3>
            <p>
              We couldn&apos;t find any listings matching your current criteria. Try expanding your search or clearing applied filters.
            </p>
            <button type="button" className="primary-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

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
    </main>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="loading-screen">Loading Karachi Estate Portfolio...</div>}>
      <PropertiesCatalog />
    </Suspense>
  );
}
