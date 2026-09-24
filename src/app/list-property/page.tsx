"use client";

import { useState } from "react";
import Link from "next/link";
import { CurrencyUnitSelector } from "@/components/CurrencyUnitSelector";

export default function ListPropertyPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState<"Sell" | "Rent">("Sell");
  const [propertyType, setPropertyType] = useState("House");
  const [areaLocation, setAreaLocation] = useState("Gulshan-e-Iqbal");
  const [sizeDetails, setSizeDetails] = useState("");
  const [demandPrice, setDemandPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;

    const messageText = `Assalam o Alaikum, I would like to list my property with your agency:

*Owner Name:* ${name}
*WhatsApp:* ${phone}
*Purpose:* For ${purpose}
*Property Type:* ${propertyType}
*Location:* ${areaLocation}
*Size / Specs:* ${sizeDetails || "Not specified"}
*Demand / Price:* ${demandPrice || "Negotiable"}
${notes ? `*Additional Notes:* ${notes}` : ""}

Please connect me with a property advisor. Thank you!`;

    const waUrl = `https://wa.me/923008214590?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp in new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }

    setSubmitted(true);
  }

  return (
    <main className="inner-page">
      {/* Topbar */}
      <div className="topbar">
        <div className="container topbar-inner">
          <span>✨ Real Estate Agency Solutions · Karachi, PK</span>
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

      {/* Main Submit Section */}
      <section className="container contact-layout" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <div>
          <span className="eyebrow">
            <span className="eyebrow-line" /> PROPERTY OWNERS &amp; LANDLORDS
          </span>
          <h1>
            Want to Sell or Rent<br />
            <i>Your Property?</i>
          </h1>
          <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--muted)", marginTop: "18px" }}>
            List your house, flat, plot, or commercial property with our team. We connect your listing directly with verified buyers and corporate tenants across Karachi.
          </p>

          <div className="contact-points" style={{ marginTop: "35px" }}>
            <span>01 <b>Direct WhatsApp Inquiry Routing</b></span>
            <span>02 <b>Verified Buyers &amp; Corporate Expats</b></span>
            <span>03 <b>Zero Clutter, Professional Presentation</b></span>
            <span>04 <b>Complete Documentation &amp; Transfer Support</b></span>
          </div>
        </div>

        {submitted ? (
          <div className="form-card success-card">
            <span className="note-icon" style={{ fontSize: "32px" }}>✓</span>
            <h2>Thank You!</h2>
            <p>
              Your property brief has been submitted. Our property advisor will contact you shortly on WhatsApp (<strong>{phone}</strong>).
            </p>
            <div style={{ marginTop: "20px", display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                type="button"
                className="outline-button"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Property
              </button>
              <Link href="/" className="primary-button">
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <form className="form-card" onSubmit={handleSubmit}>
            <h3 style={{ fontSize: "20px", margin: "0 0 10px" }}>Submit Your Property Details</h3>

            <label htmlFor="owner-name">Your Full Name</label>
            <input
              id="owner-name"
              required
              placeholder="e.g. Tariq Mansoor"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="owner-phone">WhatsApp Number</label>
            <input
              id="owner-phone"
              required
              placeholder="+92 300 1234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "10px" }}>
              <div>
                <label htmlFor="prop-purpose">Purpose</label>
                <select
                  id="prop-purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value as "Sell" | "Rent")}
                >
                  <option value="Sell">Sell Property</option>
                  <option value="Rent">Rent Out Property</option>
                </select>
              </div>
              <div>
                <label htmlFor="prop-type">Property Type</label>
                <select
                  id="prop-type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="House">House / Portion</option>
                  <option value="Apartment">Apartment / Flat</option>
                  <option value="Villa">Villa / Bungalow</option>
                  <option value="Plot">Residential Plot</option>
                  <option value="Commercial">Commercial / Shop / Office</option>
                </select>
              </div>
            </div>

            <label htmlFor="prop-area">Location / Area</label>
            <input
              id="prop-area"
              required
              placeholder="e.g. Gulshan Block 13-D, DHA Phase 6, Jauhar Block 14"
              value={areaLocation}
              onChange={(e) => setAreaLocation(e.target.value)}
            />

            <label htmlFor="prop-size">Plot / Covered Size (e.g. 120 Sq Yd / 3 Bed)</label>
            <input
              id="prop-size"
              required
              placeholder="e.g. 120 Sq Yd, 4 Bed, Double Storey"
              value={sizeDetails}
              onChange={(e) => setSizeDetails(e.target.value)}
            />

            <label htmlFor="prop-demand">Expected Demand / Rent (PKR)</label>
            <input
              id="prop-demand"
              placeholder="e.g. PKR 2.40 Crore or PKR 65,000 / month"
              value={demandPrice}
              onChange={(e) => setDemandPrice(e.target.value)}
            />

            <label htmlFor="prop-notes">Additional Notes (Optional)</label>
            <textarea
              id="prop-notes"
              rows={2}
              placeholder="e.g. Corner plot, West open, sweet water line available"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ border: "0", borderBottom: "1px solid var(--line)", padding: "8px 0", outline: "0", fontSize: "13.5px", resize: "none" }}
            />

            <button className="primary-button" type="submit" style={{ marginTop: "16px", padding: "14px" }}>
              💬 Submit Property to WhatsApp Advisor <span>→</span>
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
              Professional Real Estate Website Solution.<br />
              Built for Karachi Agencies.
            </p>
          </div>
          <div>
            <h4>Properties</h4>
            <Link href="/properties?purpose=buy">Buy a property</Link>
            <Link href="/properties?purpose=rent">Rent a property</Link>
            <Link href="/properties">All Listings</Link>
          </div>
          <div>
            <h4>Agency Solutions</h4>
            <Link href="/#for-agencies">Get This Website</Link>
            <Link href="/#for-agencies">WhatsApp Integration</Link>
          </div>
          <div>
            <h4>Contact Advisor</h4>
            <a href="tel:+923008214590">+92 300 8214590</a>
            <a href="mailto:contact@karachiestate.pk">contact@karachiestate.pk</a>
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
