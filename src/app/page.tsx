"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { properties } from "@/data/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { CurrencyUnitSelector } from "@/components/CurrencyUnitSelector";
import { KarachiAreaIntel } from "@/components/KarachiAreaIntel";
import { usePreferences } from "@/context/PreferencesContext";

const neighborhoods = [
  {
    name: "DHA Karachi",
    count: "1,240 properties",
    slug: "DHA",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Clifton",
    count: "486 properties",
    slug: "Clifton",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Bahria Town",
    count: "892 properties",
    slug: "Bahria Town",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Gulshan-e-Iqbal",
    count: "328 properties",
    slug: "Gulshan",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85",
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
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [location, setLocation] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function runSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const purposeParam = searchType === "Buy" ? "buy" : searchType === "Rent" ? "rent" : "all";
    const query = new URLSearchParams();
    if (purposeParam !== "all") query.set("purpose", purposeParam);
    if (location.trim()) query.set("area", location.trim());
    router.push(`/properties?${query.toString()}`);
  }

  const featuredListings = properties.slice(0, 3);

  return (
    <main>
      {/* Top Banner with Currency/Unit Switcher */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Pakistan&apos;s trusted property partner</span>
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
          <Link href="/properties">All Properties</Link>
          <a href="#neighborhoods">Explore Areas</a>
          <a href="#area-intel">Area Intel</a>
          <Link href="/list-property">Valuation</Link>
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
            <span className="eyebrow-line" /> FIND YOUR PLACE
          </p>
          <h1>
            Space to live<br />
            <i>your way.</i>
          </h1>
          <p className="hero-description">
            The considered way to find a home in Karachi. Browse verified properties,
            understand the market, and move with confidence.
          </p>
          <div className="hero-actions">
            <Link href="/properties" className="primary-button">
              Explore properties <ArrowUpRight />
            </Link>
            <a href="#how-it-works" className="text-link">
              How it works <span>↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack">
              <span>AR</span>
              <span>MK</span>
              <span>SA</span>
              <b>+</b>
            </div>
            <div>
              <strong>4.9 / 5</strong>
              <span>from 2,000+ happy clients</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo" />
          <div className="hero-photo-label">
            <span>01</span>
            <div>
              <strong>Thoughtfully<br />found homes</strong>
              <small>Karachi, Pakistan</small>
            </div>
          </div>
          <div className="hero-note">
            <span className="note-icon">✦</span>
            <span>
              <strong>15 years</strong><br />
              of local expertise
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
            <label htmlFor="location">Location or keyword</label>
            <input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="e.g. DHA Phase 6, Clifton, Bahria Town..."
            />
          </div>
          <div className="search-field">
            <label>Property type</label>
            <strong>All residential types <span>⌄</span></strong>
          </div>
          <div className="search-field">
            <label>City region</label>
            <strong>Karachi South &amp; East <span>⌄</span></strong>
          </div>
          <button className="search-button" type="submit">
            <SearchIcon /> Search
          </button>
        </form>
        <div className="search-trending">
          <span>Popular searches</span>
          <Link href="/properties?area=DHA%20Phase%206">DHA Phase 6</Link>
          <Link href="/properties?area=Clifton">Clifton Block 8</Link>
          <Link href="/properties?area=Bahria%20Town">Bahria Town</Link>
          <Link href="/properties?purpose=buy">Villas for Sale</Link>
          <Link href="/properties?purpose=rent">Sea View Rentals</Link>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="trust-strip">
        <div className="container trust-inner">
          <span>Trusted by people who care about where they live</span>
          <div className="trust-stats">
            <div>
              <strong>18k<span>+</span></strong>
              <small>verified listings</small>
            </div>
            <div>
              <strong>12<span>k</span></strong>
              <small>families placed</small>
            </div>
            <div>
              <strong>4.9<span>/5</span></strong>
              <small>client rating</small>
            </div>
          </div>
          <span className="as-seen">
            As seen in <b>DAWN</b> <b>Business<br />Recorder</b>
          </span>
        </div>
      </section>

      {/* Curated Properties Showcase with Enhanced PropertyCard */}
      <section id="properties" className="section container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> CURATED FOR YOU
            </p>
            <h2>Homes worth <i>coming home to.</i></h2>
          </div>
          <Link href="/properties" className="text-link">
            View all properties <ArrowUpRight />
          </Link>
        </div>

        <div className="prop-cards-grid">
          {featuredListings.map((listing) => (
            <PropertyCard key={listing.id} property={listing} />
          ))}
        </div>
      </section>

      {/* Karachi Locality Intel Component */}
      <div id="area-intel">
        <KarachiAreaIntel />
      </div>

      {/* Neighborhoods Showcase */}
      <section id="neighborhoods" className="section neighborhood-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" /> KNOW THE NEIGHBOURHOOD
              </p>
              <h2>Find your kind<br />of <i>Karachi.</i></h2>
            </div>
            <p className="heading-note">
              Every neighbourhood has a rhythm.<br />
              Let&apos;s find the one that fits yours.
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

      {/* Services Section */}
      <section id="services" className="section services container">
        <div className="services-intro">
          <p className="eyebrow">
            <span className="eyebrow-line" /> MORE THAN A LISTING
          </p>
          <h2>A better way<br />to <i>move.</i></h2>
          <p>
            From first search to final signature, our people and partners are here to make property feel personal again.
          </p>
          <Link href="/list-property" className="text-link">
            See how we help <ArrowUpRight />
          </Link>
        </div>
        <div className="service-list">
          <Link href="/properties?purpose=buy">
            <span className="service-icon">⌂</span>
            <div>
              <h3>Buy with confidence</h3>
              <p>Local insight, verified documents, and a dedicated property advisor.</p>
            </div>
            <ArrowUpRight />
          </Link>
          <Link href="/list-property">
            <span className="service-icon">↗</span>
            <div>
              <h3>Sell for what it&apos;s worth</h3>
              <p>Instant market valuation calculator and discreet qualified marketing.</p>
            </div>
            <ArrowUpRight />
          </Link>
          <Link href="/properties?purpose=rent">
            <span className="service-icon">✦</span>
            <div>
              <h3>Premium Rental Advisory</h3>
              <p>Fully vetted executive tenants, transparent leases, and move-in coordination.</p>
            </div>
            <ArrowUpRight />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section id="how-it-works" className="quote-section">
        <div className="container quote-inner">
          <span className="quote-mark">“</span>
          <blockquote>
            They didn&apos;t just find us a house. They found us the place where our next chapter feels possible.
          </blockquote>
          <div className="quote-author">
            <span className="author-avatar">HS</span>
            <div>
              <strong>Hira &amp; Saad</strong>
              <span>Moved to DHA Phase 6 in 2024</span>
            </div>
          </div>
          <div className="quote-controls">
            <button aria-label="Previous testimonial" type="button">←</button>
            <span>01 <i /> 03</span>
            <button aria-label="Next testimonial" type="button">→</button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="contact" className="newsletter container">
        <div>
          <p className="eyebrow">
            <span className="eyebrow-line" /> THE WEEKLY EDIT
          </p>
          <h2>Good properties.<br /><i>Good ideas.</i></h2>
          <p>
            Get a considered shortlist of new homes, local stories and market notes in your inbox.
          </p>
        </div>
        {subscribed ? (
          <div className="subscribe-success">
            You&apos;re on the list. See you in your inbox.
          </div>
        ) : (
          <form
            className="subscribe-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
          >
            <label htmlFor="email">Your email address</label>
            <div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" aria-label="Subscribe">
                <ArrowUpRight />
              </button>
            </div>
            <small>No noise. Just the good stuff. Unsubscribe anytime.</small>
          </form>
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
            <a href="#about">About us</a>
            <a href="#services">Our services</a>
            <a href="#contact">Journal</a>
            <a href="#contact">Contact</a>
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
