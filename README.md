# 🏛️ Karachi Estate Hub (karachiestate.pk)
> **Editorial & Luxury Real Estate Discovery Platform for Karachi, Pakistan**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-brightgreen?style=flat)](https://turbo.build/pack)

---

## 🌟 Overview

**Karachi Estate Hub** is a modern, high-end real estate portal engineered specifically for the prime property market in Karachi (DHA, Clifton, Bahria Town, Emaar Oceanfront, and Gulshan-e-Iqbal). 

Unlike legacy classified portals with cluttered banners and unverified listings, Karachi Estate Hub delivers an **editorial, bespoke buying and renting experience** tailored for discerning local buyers, high-net-worth individuals, and overseas Pakistanis (Dubai, USA, UK, Canada).

---

## ✨ Key Features

### 1. 💱 Dynamic Multi-Currency & Area Unit Converter
- **Live Currency Switcher**: Real-time pricing toggle between **PKR**, **USD ($)**, and **AED**.
- **Live Exchange Rate Engine**: Automatically synchronizes with live FX rates via Open Exchange API with a graceful fallback and 12-hour client-side cache.
- **Area Unit Switcher**: Toggle effortlessly between **Sq. Yards (Gaz)** and **Sq. Feet**.
- **Persistent Preferences**: Saves user selection across page reloads via `localStorage`.

### 2. 🔍 Curated Property Catalog & Interactive Filters
- **Live Filtering**: Instant filtering by Purpose (*Buy / Rent*), Location (*DHA Phase 6, Clifton Block 8, Bahria Town, etc.*), Property Type (*Villas, Apartments, Penthouses, Townhouses*), and Minimum Bedrooms.
- **Dynamic Sorting**: Sort by Recommended, Price (*Low to High / High to Low*), and Size (*Largest First*).
- **View Modes**: Switch between **Grid View** and **List View**.

### 3. 💡 Karachi Locality Ground Intelligence
Dedicated local intelligence dashboard detailing the exact ground realities buyers care about:
- **Water Infrastructure**: CBC municipal lines vs. underground reservoir & tanker dependency ratings.
- **Power & Solar Index**: Load-shedding vulnerability and residential hybrid solar net-metering adoption.
- **Security & Vigilance Profile**: Cantonment security patrols, armed mobile vigilance, gated barriers.
- **Commute & Connectivity**: Distance matrix to commercial business districts, hospitals, and highways.

### 4. 🧮 Interactive Financial Estimators
- **Buy / Mortgage Calculator**: Real-time KIBOR-based EMI monthly installment calculation with adjustable Down Payment %, Loan Duration (years), and Interest Rate.
- **Rent / Move-in Breakdown**: Calculate upfront capital required (Advance Rent + Refundable Security Deposit).

### 5. 🏷️ Seller & Landlord Valuation Calculator (`/list-property`)
- Algorithm-based instant market valuation model taking into account sector base rates, property category multipliers, and finishing condition.
- Computes estimated sale price bracket and projected monthly rental yield.

### 6. ⚖️ Side-by-Side Property Comparison Matrix
- Compare up to **3 properties simultaneously** across location, price, rate per sq. ft, bedrooms/bathrooms, parking capacity, building year, facing direction, and amenities.
- Floating quick-access bar with instant modal preview.

### 7. 📲 Aggregated Shortlist & WhatsApp Lead Generator
- Save / Favorite any property to the drawer.
- **Batch WhatsApp Inquiry**: Generates a single, organized WhatsApp message with titles, prices, and links to all shortlisted listings directly to the assigned property partner.

### 8. 🖨️ Executive Print / PDF Dossier
- Custom `@media print` layout formatting property details into a clean, 2-page A4 executive brochure for offline clients and overseas investors.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16.3 (App Router)](https://nextjs.org/)
- **Bundler**: Turbopack
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Design System Tokens
- **Typography**: Playfair Display (Editorial Serif) & DM Sans (Modern Sans-Serif)
- **State Management**: React Context (`PreferencesContext`) with `localStorage`
- **Images**: Next.js Remote Image Patterns with AVIF/WebP optimization

---

## 📂 Project Structure

```text
karachi-estate-hub/
├── public/                    # Static assets & icons
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root Layout with Preferences & Floating Modals
│   │   ├── globals.css        # Global CSS, Design System & Print Dossier Styles
│   │   ├── page.tsx           # Homepage (Hero, Search, Featured, Intel, Services)
│   │   ├── list-property/     # Seller Valuation Calculator & Advisory Page
│   │   └── properties/
│   │       ├── page.tsx       # Filterable Property Catalog (Grid/List)
│   │       └── [id]/page.tsx  # Dynamic Property Detail Page (SSG + Metadata)
│   ├── components/
│   │   ├── CompareFloatingBar.tsx # Sticky bar when properties are selected
│   │   ├── ComparisonModal.tsx    # Side-by-side comparison matrix table
│   │   ├── CurrencyUnitSelector.tsx # Currency (PKR/USD/AED) & Unit Selector
│   │   ├── KarachiAreaIntel.tsx   # Water, Power & Security Area Intel
│   │   ├── PropertyCard.tsx       # Property Card with Image Slider & WhatsApp CTA
│   │   ├── PropertyDetailView.tsx # Comprehensive Property Dossier View
│   │   ├── SavedDrawer.tsx        # Saved Shortlist Drawer & Batch WhatsApp
│   │   └── ScheduleTourModal.tsx  # In-Person & Video Walkthrough Booking
│   ├── context/
│   │   └── PreferencesContext.tsx # Currency, Units, Saved & Compared State
│   └── data/
│       └── properties.ts      # Comprehensive Karachi Property Dataset & Types
├── next.config.ts             # Next.js Config (Image Optimization Remote Patterns)
├── package.json               # Dependencies & Scripts
└── tsconfig.json              # TypeScript Configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) v18.18 or higher
- `npm`, `pnpm`, or `yarn`

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/karachi-estate-hub.git
cd karachi-estate-hub
npm install
```

### 3. Development Server

Start the Turbopack development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build

Verify TypeScript compilation and generate optimized static pages:

```bash
npm run build
npm run start
```

---

## 💼 Business & Monetization Model

Karachi Estate Hub is architected with clear commercial monetization avenues:

1. **Boutique Real Estate Agency White-Labeling**:
   - Deliver high-ticket branding for luxury brokerages dealing in DHA, Clifton, and Emaar.
2. **Monthly Agent Subscriptions (SaaS)**:
   - Tiered packages for realtors (Featured Listings placement, Verified Partner checkmark, Direct WhatsApp Lead routing).
3. **Overseas Buyer Concierge Packages**:
   - Paid title deed legal verification, physical structural inspection, and live video walkthroughs for expats.
4. **Bank Mortgage & Home Financing Affiliates**:
   - Commission earned on mortgage lead conversions via integrated banking EMI calculator.

---

## 📄 License

This project is private and proprietary. All rights reserved.
