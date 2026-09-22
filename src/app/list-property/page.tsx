"use client";

import { useState } from "react";
import Link from "next/link";
import { usePreferences } from "@/context/PreferencesContext";
import { CurrencyUnitSelector } from "@/components/CurrencyUnitSelector";

interface ValuationModel {
  locality: string;
  type: string;
  size: number;
  condition: string;
}

export default function ListPropertyPage() {
  const { formatPrice, currency } = usePreferences();
  const [sent, setSent] = useState(false);

  // Valuation Estimator State
  const [valLocality, setValLocality] = useState("dha6");
  const [valType, setValType] = useState("villa");
  const [valSize, setValSize] = useState(500);
  const [valCondition, setValCondition] = useState("new");

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [locationStr, setLocationStr] = useState("DHA Phase 6, Karachi");
  const [intent, setIntent] = useState("sell");

  // Base rate per sq. yard in PKR
  const baseRates: Record<string, number> = {
    dha5: 190000,
    dha6: 180000,
    dha8: 220000,
    clifton2: 240000,
    clifton8: 280000,
    bahria: 85000,
    gulshan: 95000,
  };

  const typeMultipliers: Record<string, number> = {
    villa: 1.25,
    house: 1.15,
    apartment: 1.0,
    plot: 0.85,
  };

  const conditionMultipliers: Record<string, number> = {
    new: 1.15,
    mid: 1.0,
    older: 0.85,
  };

  const baseRate = baseRates[valLocality] || 150000;
  const typeMult = typeMultipliers[valType] || 1.0;
  const condMult = conditionMultipliers[valCondition] || 1.0;

  const estimatedValue = Math.round(valSize * baseRate * typeMult * condMult);
  const lowBracket = Math.round(estimatedValue * 0.94);
  const highBracket = Math.round(estimatedValue * 1.06);
  const estMonthlyRent = Math.round(estimatedValue * 0.0042);

  function handleValuationPrefill() {
    const localityNames: Record<string, string> = {
      dha5: "DHA Phase 5",
      dha6: "DHA Phase 6",
      dha8: "DHA Phase 8",
      clifton2: "Clifton Block 2",
      clifton8: "Clifton Block 8",
      bahria: "Bahria Town Karachi",
      gulshan: "Gulshan-e-Iqbal",
    };
    setLocationStr(`${valSize} sq. yd ${valType} in ${localityNames[valLocality] || "Karachi"}`);
    document.getElementById("seller-form")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="inner-page">
      {/* Topbar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span>Pakistan&apos;s trusted property partner</span>
          <div className="topbar-right-wrap">
            <CurrencyUnitSelector />
            <span className="topbar-right">Karachi, PK</span>
          </div>
        </div>
      </div>

      <header className="inner-header container">
        <Link href="/" className="brand">
          <span className="brand-mark">K</span>
          <span>karachi<span>estate</span></span>
        </Link>
        <Link href="/" className="text-link">
          Back to home <span>←</span>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container valuation-hero-section">
        <span className="eyebrow">
          <span className="eyebrow-line" /> SELLER &amp; LANDLORD ADVISORY
        </span>
        <h1>
          Know what your Karachi property<br />
          <i>is truly worth today.</i>
        </h1>
        <p className="hero-subtext">
          Use our intelligent Karachi market valuation model to calculate realistic sale brackets or request an in-person advisory appraisal.
        </p>
      </section>

      {/* Interactive Valuation Tool */}
      <section className="container valuation-widget-section">
        <div className="val-widget-card">
          <div className="val-widget-inputs">
            <span className="eyebrow">
              <span className="eyebrow-line" /> INSTANT ESTIMATOR
            </span>
            <h3>Market Valuation Calculator</h3>

            <div className="val-inputs-grid">
              <div className="form-field">
                <label>Locality &amp; Sector</label>
                <select
                  value={valLocality}
                  onChange={(e) => setValLocality(e.target.value)}
                >
                  <option value="dha6">DHA Phase 6 (Prime Residential)</option>
                  <option value="dha5">DHA Phase 5 (Commercial &amp; Living)</option>
                  <option value="dha8">DHA Phase 8 (Coastline &amp; Extension)</option>
                  <option value="clifton8">Clifton Block 8 (Seaview Luxury)</option>
                  <option value="clifton2">Clifton Block 2 (Central)</option>
                  <option value="bahria">Bahria Town Karachi (Precincts)</option>
                  <option value="gulshan">Gulshan-e-Iqbal (Blocks 1-13)</option>
                </select>
              </div>

              <div className="form-field">
                <label>Property Category</label>
                <select
                  value={valType}
                  onChange={(e) => setValType(e.target.value)}
                >
                  <option value="villa">Architect / Designer Villa</option>
                  <option value="house">Standard Standalone House</option>
                  <option value="apartment">Luxury Apartment Tower</option>
                  <option value="plot">Residential Plot</option>
                </select>
              </div>

              <div className="form-field">
                <label>Plot / Covered Area ({valSize} Sq. Yd)</label>
                <select
                  value={valSize}
                  onChange={(e) => setValSize(Number(e.target.value))}
                >
                  <option value={120}>120 Sq. Yards (Small Family / Townhouse)</option>
                  <option value={250}>250 Sq. Yards (10 Marla / Medium)</option>
                  <option value={350}>350 Sq. Yards (Bahria Standard)</option>
                  <option value={500}>500 Sq. Yards (1 Kanal / DHA Standard)</option>
                  <option value={1000}>1,000 Sq. Yards (2 Kanal Luxury Estate)</option>
                  <option value={2000}>2,000 Sq. Yards (Flagship Compound)</option>
                </select>
              </div>

              <div className="form-field">
                <label>Age &amp; Finish Condition</label>
                <select
                  value={valCondition}
                  onChange={(e) => setValCondition(e.target.value)}
                >
                  <option value="new">Brand New (2024-2026 / Turnkey)</option>
                  <option value="mid">1 - 5 Years (Well Maintained)</option>
                  <option value="older">10+ Years (Renovation Potential)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="val-widget-results">
            <span className="res-tag">ESTIMATED MARKET BRACKET</span>
            <div className="res-price-bracket">
              <strong>{formatPrice(lowBracket)}</strong>
              <span>to</span>
              <strong>{formatPrice(highBracket)}</strong>
            </div>
            <p className="res-rate-note">
              Average Rate: ~ PKR {Math.round(baseRate * typeMult).toLocaleString()} / sq. yd based on active registered transactions in this sector.
            </p>

            <div className="res-rental-yield-box">
              <span>Potential Rental Yield:</span>
              <strong>{formatPrice(estMonthlyRent, "rent")} / month</strong>
            </div>

            <button
              type="button"
              className="primary-button full-width"
              onClick={handleValuationPrefill}
            >
              Request Certified Appraisal with this Estimate ↓
            </button>
          </div>
        </div>
      </section>

      {/* Seller Consultation Form */}
      <section id="seller-form" className="contact-layout container">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-line" /> PERSONAL ADVISORY
          </span>
          <h1>
            Put your property<br />
            <i>in the right hands.</i>
          </h1>
          <p>
            Whether selling an architectural villa or leasing a high-floor Clifton residence, our team pairs discreet representation with serious, qualified buyers.
          </p>

          <div className="contact-points">
            <span>01 <b>Accurate Comparative Market Analysis (CMA)</b></span>
            <span>02 <b>High-Definition Architectural Photography &amp; Video</b></span>
            <span>03 <b>Pre-screened High-Net-Worth Buyers &amp; Corporate Expats</b></span>
            <span>04 <b>Complete Legal Documentation &amp; Transfer Support</b></span>
          </div>
        </div>

        {sent ? (
          <div className="form-card success-card">
            <span className="note-icon">✦</span>
            <h2>Thank You, We&apos;ll Be in Touch.</h2>
            <p>
              Your property brief has been assigned to our senior Karachi advisory desk. We will contact you via WhatsApp / Phone within one business day.
            </p>
            <Link href="/" className="primary-button">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <form
            className="form-card"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <h3>Schedule Seller Consultation</h3>

            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              required
              placeholder="e.g. Tariq Mansoor"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="phone">Phone / WhatsApp Number</label>
            <input
              id="phone"
              required
              placeholder="+92 300 0000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label htmlFor="property">Property Brief &amp; Location</label>
            <input
              id="property"
              required
              placeholder="e.g. 500 Sq Yd Villa, DHA Phase 6"
              value={locationStr}
              onChange={(e) => setLocationStr(e.target.value)}
            />

            <label htmlFor="intent">Primary Goal</label>
            <select
              id="intent"
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
            >
              <option value="sell">Sell my property at highest market value</option>
              <option value="rent">Find executive corporate tenants (Rent)</option>
              <option value="value">Formal bank/legal property valuation</option>
            </select>

            <button className="primary-button" type="submit">
              Request Advisory Consultation <span>↗</span>
            </button>
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
