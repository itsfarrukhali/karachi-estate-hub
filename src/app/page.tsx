"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { CurrencyUnitSelector } from "@/components/CurrencyUnitSelector";
import { usePreferences } from "@/context/PreferencesContext";

const neighborhoods = [
  {
    name: "Gulshan-e-Iqbal",
    count: "Houses & Apartments",
    slug: "Gulshan",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "DHA Karachi",
    count: "Luxury Villas & Plots",
    slug: "DHA",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Gulistan-e-Jauhar",
    count: "Portions & Family Homes",
    slug: "Jauhar",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "North Nazimabad",
    count: "Prime Residential Houses",
    slug: "North Nazimabad",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=85",
  },
];

function ArrowUpRight() {
  return <span aria-hidden="true">↗</span>;
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.2 4.2" />
    </svg>
  );
}

export default function Home() {
  const router = useRouter();
  const { savedIds, setIsDrawerOpen } = usePreferences();
  const [searchType, setSearchType] = useState<"Buy" | "Rent" | "All">("Buy");
  const [propertyType, setPropertyType] = useState("all");
  const [region, setRegion] = useState("all");
  const [location, setLocation] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function runSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const purposeParam = searchType === "Buy" ? "buy" : searchType === "Rent" ? "rent" : "all";
    const query = new URLSearchParams();
    if (purposeParam !== "all") query.set("purpose", purposeParam);
    if (location.trim()) {
      query.set("area", location.trim());
    } else if (region !== "all") {
      query.set("area", region);
    }
    if (propertyType !== "all") {
      query.set("type", propertyType);
    }
    router.push(`/properties?${query.toString()}`);
  }

  const featuredListings = properties.slice(0, 6);

  return (
    <main>
      {/* Top Banner with Currency/Unit Switcher & Agency Demo Notice */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span>✨ Built for Real Estate Businesses · Ready to Customize</span>
          <div className="topbar-right-wrap">
            <CurrencyUnitSelector />
            <span className="topbar-right">Karachi, PK</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="nav container">
        <Link href="/" className="brand" aria-label="Karachi Estate Hub home">
          <span className="brand-mark">K</span>
          <span>karachi<span>estate</span></span>
        </Link>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link href="/properties?purpose=buy">Buy</Link>
          <Link href="/properties?purpose=rent">Rent</Link>
          <Link href="/properties">All Listings</Link>
          <Link href="/list-property">Sell / Rent With Us</Link>
          <a href="#for-agencies" className="nav-highlight-link">For Agencies</a>
        </nav>
        <div className="nav-actions">
          <button
            type="button"
            className="saved-link-btn"
            onClick={() => setIsDrawerOpen(true)}
            title="Open saved shortlist"
          >
            ♡ Shortlist <small>{savedIds.length}</small>
          </button>
          <Link href="/list-property" className="outline-button">
            Submit Property
          </Link>
          <button
            type="button"
            className="menu-button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-line" /> BUILT FOR KARACHI PROPERTY BUSINESSES
          </p>
          <h1>
            Your Properties.<br />
            <i>Your Brand.</i>
          </h1>
          <p className="hero-description">
            The modern way to showcase Karachi properties. Give your clients a clean, verified browsing experience with instant 1-click WhatsApp inquiries.
          </p>
          <div className="hero-actions">
            <Link href="/properties" className="primary-button">
              Explore Properties <ArrowUpRight />
            </Link>
            <a href="#for-agencies" className="text-link">
              Get this website for your agency <span>↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <div className="hero-capability-pills">
              <span className="cap-pill">🏡 Houses &amp; Flats</span>
              <span className="cap-pill">📐 Plots &amp; Commercial</span>
              <span className="cap-pill">💬 Direct WhatsApp Leads</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo" />
          <div className="hero-photo-label">
            <span>01</span>
            <div>
              <strong>Verified Karachi<br />Properties</strong>
              <small>Houses, Flats &amp; Plots</small>
            </div>
          </div>
          <div className="hero-note">
            <span className="note-icon">💬</span>
            <span>
              <strong>Direct Leads</strong><br />
              Straight to your WhatsApp
            </span>
          </div>
        </div>
      </section>

      {/* Search Wrap */}
      <section className="search-wrap container" aria-label="Property search">
        <div className="search-tabs">
          {(["Buy", "Rent", "All"] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={searchType === item ? "active" : ""}
              onClick={() => setSearchType(item)}
            >
              {item === "All" ? "All Listings" : item}
            </button>
          ))}
        </div>
        <form className="search-form" onSubmit={runSearch}>
          <div className="search-field search-where">
            <span className="search-icon">
              <SearchIcon />
            </span>
            <label htmlFor="location">Area or keyword</label>
            <input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. Gulshan, DHA, Jauhar, Scheme 33..."
            />
          </div>
          <div className="search-field">
            <label htmlFor="search-prop-type">Property type</label>
            <select
              id="search-prop-type"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              aria-label="Filter property type"
            >
              <option value="all">All Types (Houses, Flats, Plots, Shops)</option>
              <option value="house">Houses &amp; Portions</option>
              <option value="apartment">Apartments &amp; Flats</option>
              <option value="villa">Villas &amp; Bungalows</option>
              <option value="plot">Residential Plots</option>
              <option value="commercial">Commercial &amp; Shops</option>
            </select>
          </div>
          <div className="search-field">
            <label htmlFor="search-region">City region</label>
            <select
              id="search-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              aria-label="Filter city region"
            >
              <option value="all">All Karachi Sectors</option>
              <option value="Gulshan">Gulshan-e-Iqbal</option>
              <option value="DHA">DHA Karachi</option>
              <option value="Jauhar">Gulistan-e-Jauhar</option>
              <option value="North Nazimabad">North Nazimabad</option>
              <option value="Scheme 33">Scheme 33</option>
              <option value="PECHS">PECHS</option>
              <option value="Clifton">Clifton</option>
              <option value="Bahria Town">Bahria Town</option>
              <option value="Federal B Area">Federal B Area</option>
            </select>
          </div>
          <button className="search-button" type="submit">
            <SearchIcon /> Search
          </button>
        </form>
        <div className="search-trending">
          <span>Popular searches:</span>
          <Link href="/properties?area=Gulshan">Gulshan-e-Iqbal</Link>
          <Link href="/properties?area=DHA">DHA Phase 6</Link>
          <Link href="/properties?area=Jauhar">Gulistan-e-Jauhar</Link>
          <Link href="/properties?area=North%20Nazimabad">North Nazimabad</Link>
          <Link href="/properties?area=Scheme%2033">Scheme 33 Plots</Link>
          <Link href="/properties?area=PECHS">PECHS Commercial</Link>
        </div>
      </section>

      {/* Honest Agency Value Strip (No Fake Numbers) */}
      <section className="trust-strip">
        <div className="container trust-inner">
          <span>Built for Karachi Property Businesses</span>
          <div className="trust-stats">
            <div>
              <strong>Property Listings</strong>
              <small>Houses, Flats, Plots &amp; Commercial</small>
            </div>
            <div>
              <strong>Buy &amp; Rent Ready</strong>
              <small>Filterable search with specs</small>
            </div>
            <div>
              <strong>WhatsApp Inquiries</strong>
              <small>Direct pre-filled lead capture</small>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Properties Showcase with Enhanced PropertyCard */}
      <section id="properties" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> CURRENT LISTINGS
            </p>
            <h2>Featured Karachi <i>Properties.</i></h2>
          </div>
          <Link href="/properties" className="text-link">
            View all properties ({properties.length}) <ArrowUpRight />
          </Link>
        </div>

        <div className="prop-cards-grid">
          {featuredListings.map((listing) => (
            <PropertyCard key={listing.id} property={listing} />
          ))}
        </div>
      </section>

      {/* Neighborhoods Showcase */}
      <section id="neighborhoods" className="section neighborhood-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" /> COVERED LOCATIONS
              </p>
              <h2>Properties Across<br /><i>Karachi.</i></h2>
            </div>
            <p className="heading-note">
              Showcase listings across any sector or neighborhood in the city.
            </p>
          </div>
          <div className="neighborhood-grid">
            {neighborhoods.map((area, i) => (
              <Link
                className={`neighborhood-card ${i === 0 ? "large" : ""}`}
                href={`/properties?area=${encodeURIComponent(area.slug)}`}
                key={area.name}
                style={{
                  backgroundImage: `linear-gradient(180deg, transparent 20%, rgba(5,22,28,.86) 100%), url(${area.image})`,
                }}
              >
                <span className="area-number">0{i + 1}</span>
                <div>
                  <h3>{area.name}</h3>
                  <p>
                    {area.count} <ArrowUpRight />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated "For Agencies" Sales & Conversion Section */}
      <section id="for-agencies" className="section for-agencies-section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> FOR REAL ESTATE AGENCIES
            </p>
            <h2>Your Properties. Your Brand.<br /><i>Your Leads.</i></h2>
          </div>
          <p className="heading-note">
            Give your customers one professional place to discover your properties and contact your team directly.
          </p>
        </div>

        <div className="agency-cards-grid">
          <div className="agency-card">
            <span className="agency-card-icon">🏛️</span>
            <h3>Showcase Properties</h3>
            <p>
              Display houses, apartments, plots, and commercial properties with photos, specs, pricing, and key features.
            </p>
          </div>
          <div className="agency-card highlight">
            <span className="agency-card-icon">💬</span>
            <h3>Generate WhatsApp Leads</h3>
            <p>
              Let potential buyers and tenants contact your advisors directly with 1-click pre-filled inquiry messages.
            </p>
          </div>
          <div className="agency-card">
            <span className="agency-card-icon">✨</span>
            <h3>Build Your Brand</h3>
            <p>
              Customized with your agency name, logo, brand colors, advisor contact details, and your custom domain name.
            </p>
          </div>
        </div>

        <div className="agency-cta-box">
          <div className="agency-cta-text">
            <h3>Want a website like this for your real estate business?</h3>
            <p>
              We can customize this entire website with your agency&apos;s branding, listings, contact details, and WhatsApp numbers.
            </p>
          </div>
          <a
            href="https://wa.me/923008214590?text=Assalam%20o%20Alaikum%2C%20I%20saw%20your%20Karachi%20Real%20Estate%20website%20demo%20and%20want%20a%20similar%20website%20for%20my%20agency."
            target="_blank"
            rel="noopener noreferrer"
            className="agency-wa-btn"
          >
            <svg viewBox="0 0 24 24" className="wa-icon-large" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.95.57 3.86 1.64 5.51L2 22l4.74-1.72a9.87 9.87 0 0 0 5.3 1.52h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.28c-.24.68-1.39 1.33-1.92 1.38-.5.06-1.12.08-3.6-1.03-3.17-1.42-5.18-4.73-5.34-4.95-.16-.22-1.28-1.7-1.28-3.24 0-1.54.81-2.3 1.1-2.61.29-.31.63-.39.84-.39.21 0 .42 0 .61.01.2.01.46-.07.72.55.27.65.92 2.25.99 2.42.08.17.13.37.03.59-.11.22-.16.35-.32.54-.16.19-.34.42-.49.57-.16.16-.33.34-.14.67.19.33.85 1.4 1.82 2.26 1.25 1.11 2.3 1.46 2.63 1.62.33.16.52.14.72-.09.2-.23.84-.98 1.07-1.31.22-.33.45-.28.75-.17.31.11 1.96.93 2.3 1.1.33.16.55.24.63.38.08.14.08.8-.16 1.48z" />
            </svg>
            <span>WhatsApp Us For Your Website</span>
          </a>
        </div>
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
              Professional Real Estate Website Solution.<br />
              Built for Karachi Agencies.
            </p>
          </div>
          <div>
            <h4>Properties</h4>
            <Link href="/properties?purpose=buy">Buy a property</Link>
            <Link href="/properties?purpose=rent">Rent a property</Link>
            <Link href="/properties">All Listings</Link>
            <Link href="/list-property">Sell Your Property</Link>
          </div>
          <div>
            <h4>Agency Solutions</h4>
            <a href="#for-agencies">Get This Website</a>
            <a href="#for-agencies">WhatsApp Integration</a>
            <a href="#for-agencies">Custom Branding</a>
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href="tel:+923008214590">+92 300 8214590</a>
            <a href="mailto:contact@karachiestate.pk">contact@karachiestate.pk</a>
            <p className="footer-address">
              Karachi, Pakistan<br />
              Mon–Sat, 9am–7pm
            </p>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2025 Karachi Estate. Ready for Real Estate Agency Customization.</span>
          <span>Made with care for Karachi Businesses <b>♥</b></span>
        </div>
      </footer>
    </main>
  );
}
