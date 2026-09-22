"use client";

import { useState } from "react";
import Link from "next/link";

interface AreaIntelData {
  id: string;
  name: string;
  subtitle: string;
  avgPriceSqYd: string;
  waterStatus: string;
  waterRating: "Good" | "Moderate" | "Tanker Reliant";
  powerBackup: string;
  securityProfile: string;
  idealFor: string;
  commuteKey: string;
  topStreets: string[];
}

const AREA_INTEL: AreaIntelData[] = [
  {
    id: "dha",
    name: "DHA Karachi (Phases 5, 6 & 8)",
    subtitle: "Premier residential cantonment with broad boulevards & coastal breeze",
    avgPriceSqYd: "PKR 1.6 Lakh – 2.4 Lakh / sq. yd",
    waterStatus: "Mix of CBC line water & tanker supply. Phase 6/8 homes typically equipped with 20kL underground reservoirs.",
    waterRating: "Moderate",
    powerBackup: "Low load-shedding zones with heavy residential hybrid solar net-metering adoption (15-25KW).",
    securityProfile: "DHA Vigilance armed mobile patrols 24/7, high perimeter surveillance, and direct police liaison.",
    idealFor: "Corporate executives, multi-generational families, overseas returnees.",
    commuteKey: "10-15 mins to Clifton Business District; 25 mins to Shahrah-e-Faisal.",
    topStreets: ["Khayaban-e-Seher", "Khayaban-e-Shamsheer", "Khayaban-e-Muhafiz", "Creek Avenue"],
  },
  {
    id: "clifton",
    name: "Clifton (Blocks 2, 4 & 8)",
    subtitle: "Historic high-end enclave combining seaside high-rises and heritage estates",
    avgPriceSqYd: "PKR 1.8 Lakh – 3.2 Lakh / sq. yd",
    waterStatus: "Consistent municipal lines in Block 2/8 plus desalination/tanker backup for luxury high-rises.",
    waterRating: "Good",
    powerBackup: "Prime VIP grid with standard 100% standby generator provision across all major apartment towers.",
    securityProfile: "Consulate-grade security presence, rapid response units, and active private building concierges.",
    idealFor: "Diplomats, expats, luxury renters, sea-view lifestyle seekers.",
    commuteKey: "5 mins to Dolmen Mall & South City Hospital; 20 mins to Karachi Port.",
    topStreets: ["Marine Drive", "Old Clifton / Bilawal House", "Block 4 Consulate Area", "Hatfield Road"],
  },
  {
    id: "bahria",
    name: "Bahria Town Karachi",
    subtitle: "Self-contained master-planned township with uninterrupted modern utilities",
    avgPriceSqYd: "PKR 75,000 – 1.2 Lakh / sq. yd",
    waterStatus: "Dedicated 24/7 internal reverse osmosis filtration network; clean pressurized tap water.",
    waterRating: "Good",
    powerBackup: "100% captive uninterrupted electricity grid with zero load-shedding.",
    securityProfile: "Private Bahria security force, gated precinct boom barriers, and round-the-clock patrol cruisers.",
    idealFor: "Modern families seeking tranquility, international school access, and quiet neighborhood parks.",
    commuteKey: "Direct signal-free connectivity to M9 Superhighway; 30 mins to Malir Expressway.",
    topStreets: ["Precinct 1 Avenue", "Precinct 19 Luxury Towers", "Jinnah Avenue", "Golf City"],
  },
  {
    id: "gulshan",
    name: "Gulshan-e-Iqbal & University Road",
    subtitle: "Central Karachi hub with prime institutional access and vibrant markets",
    avgPriceSqYd: "PKR 90,000 – 1.4 Lakh / sq. yd",
    waterStatus: "Municipal line schedule 2-3 days a week supplemented with underground storage tanks.",
    waterRating: "Moderate",
    powerBackup: "Standard K-Electric feeder with building standby generator setups.",
    securityProfile: "Gated residential apartment societies with guarded entrance barriers and CCTV.",
    idealFor: "Academics, healthcare professionals, families seeking central city accessibility.",
    commuteKey: "Green Line BRT & University Road connectivity; 10 mins to Aga Khan Hospital & LuckyOne Mall.",
    topStreets: ["Block 13-D/2", "Block 6 Rashid Minhas", "Block 4 Disco Bakery Road", "Main University Road"],
  },
];

export function KarachiAreaIntel() {
  const [activeAreaId, setActiveAreaId] = useState("dha");
  const currentArea = AREA_INTEL.find((a) => a.id === activeAreaId) || AREA_INTEL[0];

  return (
    <section className="area-intel-section container">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-line" /> LOCAL INTELLIGENCE
          </span>
          <h2>
            Karachi Neighbourhood <i>Intel.</i>
          </h2>
        </div>
        <p className="heading-note">
          Essential insights on utilities, power, security, and market rates before you move.
        </p>
      </div>

      <div className="intel-tabs-row">
        {AREA_INTEL.map((area) => (
          <button
            key={area.id}
            type="button"
            className={`intel-tab-btn ${activeAreaId === area.id ? "active" : ""}`}
            onClick={() => setActiveAreaId(area.id)}
          >
            {area.name.split(" ")[0]} {area.id === "dha" ? "DHA" : ""}
          </button>
        ))}
      </div>

      <div className="intel-card">
        <div className="intel-header">
          <div>
            <h3>{currentArea.name}</h3>
            <p className="intel-subtitle">{currentArea.subtitle}</p>
          </div>
          <div className="intel-price-box">
            <span>Average Market Rate</span>
            <strong>{currentArea.avgPriceSqYd}</strong>
          </div>
        </div>

        <div className="intel-metrics-grid">
          <div className="metric-tile">
            <div className="metric-title-row">
              <span className="metric-icon">💧</span>
              <strong>Water Infrastructure</strong>
              <span className={`water-pill rating-${currentArea.waterRating.toLowerCase().replace(" ", "-")}`}>
                {currentArea.waterRating}
              </span>
            </div>
            <p>{currentArea.waterStatus}</p>
          </div>

          <div className="metric-tile">
            <div className="metric-title-row">
              <span className="metric-icon">⚡</span>
              <strong>Power &amp; Backup Index</strong>
            </div>
            <p>{currentArea.powerBackup}</p>
          </div>

          <div className="metric-tile">
            <div className="metric-title-row">
              <span className="metric-icon">🛡️</span>
              <strong>Security &amp; Vigilance</strong>
            </div>
            <p>{currentArea.securityProfile}</p>
          </div>

          <div className="metric-tile">
            <div className="metric-title-row">
              <span className="metric-icon">🚗</span>
              <strong>Connectivity &amp; Commute</strong>
            </div>
            <p>{currentArea.commuteKey}</p>
          </div>
        </div>

        <div className="intel-footer">
          <div className="top-streets-list">
            <span>Notable Roads &amp; Belts:</span>
            {currentArea.topStreets.map((street, idx) => (
              <span key={idx} className="street-tag">
                {street}
              </span>
            ))}
          </div>

          <Link
            href={`/properties?area=${encodeURIComponent(currentArea.name.split(" ")[0])}`}
            className="text-link"
          >
            Explore {currentArea.name.split(" ")[0]} Properties ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
