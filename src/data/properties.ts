export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  purpose: "buy" | "rent";
  propertyType: "House" | "Apartment" | "Villa" | "Penthouse" | "Townhouse" | "Plot" | "Commercial" | "Shop" | "Office";
  price: string;
  priceNumeric: number;
  rentFrequency?: "month" | "year";
  location: {
    area: string;
    city: string;
    fullAddress: string;
    mapCoordinates?: { lat: number; lng: number };
  };
  bedrooms: number;
  bathrooms: number;
  area: string;
  areaSqFt: number;
  plotSize?: string;
  yearBuilt: number;
  parkingSpaces: number;
  furnished: "Furnished" | "Unfurnished" | "Semi-Furnished";
  facing?: string;
  badge?: "Featured" | "Verified" | "Exclusive" | "Sea View" | "Price Drop" | "New Today" | "Hot Deal";
  coverImage: string;
  images: string[];
  description: string[];
  features: string[];
  amenities: {
    category: string;
    items: string[];
  }[];
  floorPlan?: {
    title: string;
    levels: {
      name: string;
      size: string;
      details: string;
    }[];
  };
  agent: {
    name: string;
    role: string;
    phone: string;
    whatsapp: string;
    email: string;
    image: string;
    rating: number;
    reviewsCount: number;
    experienceYears: number;
  };
  nearbyLandmarks: {
    name: string;
    distance: string;
    type: "School" | "Hospital" | "Mall" | "Beach" | "Highway" | "Park" | "Market";
  }[];
  financials?: {
    maintenanceFee?: string;
    securityDeposit?: string;
    advanceRent?: string;
    estimatedMortgage?: string;
  };
}

export const properties: Property[] = [
  {
    id: "dha-phase-6-contemporary-villa",
    slug: "dha-phase-6-contemporary-villa",
    title: "500 Sq. Yd. Luxury Family Villa",
    tagline: "Architect-designed 5-bed residence with lawn & standby solar power",
    purpose: "buy",
    propertyType: "Villa",
    price: "PKR 8.95 Cr",
    priceNumeric: 89500000,
    location: {
      area: "DHA Phase 6",
      city: "Karachi",
      fullAddress: "Khayaban-e-Seher, Phase 6, Defence, Karachi",
    },
    bedrooms: 5,
    bathrooms: 6,
    area: "500 sq. yd.",
    areaSqFt: 4500,
    plotSize: "500 Sq. Yards (50 x 90)",
    yearBuilt: 2024,
    parkingSpaces: 3,
    furnished: "Semi-Furnished",
    facing: "West Open (Breezy)",
    badge: "Featured",
    coverImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Prime location 500 sq. yard modern villa located in DHA Phase 6 on Khayaban-e-Seher. Features 5 master bedrooms with attached baths, imported fittings, double-height lobby, dirty & show kitchens, and hybrid solar setup.",
      "Spacious car porch accommodating 3 SUVs, separate maid room with bath, and lush green front terrace.",
    ],
    features: [
      "5 Master Ensuite Bedrooms",
      "20KW Hybrid Solar Net-Metering",
      "Double Glazed Soundproof Windows",
      "Servant Quarters with Separate Entry",
      "3-Car Covered Automated Garage",
      "Full CCTV & Smart Access Locks",
    ],
    amenities: [
      {
        category: "Utilities",
        items: ["20KW Hybrid Solar System", "Dual Line Water Connection", "25,000L Underground Water Tank", "3-Phase Electricity Line"],
      },
    ],
    agent: {
      name: "Taimoor Shah",
      role: "Lead Property Partner",
      phone: "+92 300 8214590",
      whatsapp: "923008214590",
      email: "taimoor@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviewsCount: 48,
      experienceYears: 12,
    },
    nearbyLandmarks: [
      { name: "Creek Club DHA", distance: "4 mins drive", type: "Park" },
      { name: "South City Hospital", distance: "8 mins drive", type: "Hospital" },
      { name: "Dolmen Mall Clifton", distance: "12 mins drive", type: "Mall" },
    ],
  },
  {
    id: "gulshan-block-13d-apartment",
    slug: "gulshan-block-13d-apartment",
    title: "3 Bed Corner Family Flat - 1,750 Sq. Ft.",
    tagline: "Prime location near University Road with standby generator & lift",
    purpose: "buy",
    propertyType: "Apartment",
    price: "PKR 1.85 Cr",
    priceNumeric: 18500000,
    location: {
      area: "Gulshan-e-Iqbal",
      city: "Karachi",
      fullAddress: "Block 13-D/2, Main University Road, Gulshan-e-Iqbal, Karachi",
    },
    bedrooms: 3,
    bathrooms: 3,
    area: "1,750 sq. ft.",
    areaSqFt: 1750,
    yearBuilt: 2023,
    parkingSpaces: 1,
    furnished: "Unfurnished",
    facing: "West Open (Corner)",
    badge: "Hot Deal",
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Well-maintained 3-bedroom corner apartment on 4th floor with dedicated high-speed elevator and standby generator. Located in a family-secured gated project in Gulshan Block 13-D.",
      "Walking distance to University Road, markets, schools, and BRT Green Line stop.",
    ],
    features: [
      "Corner Unit with Excellent Airflow",
      "Standby Generator for Lift & Corridors",
      "24/7 Sweet Line Water",
      "Covered Reserved Car Parking",
      "Gated Complex with Intercom & Security",
    ],
    amenities: [
      {
        category: "Building Facilities",
        items: ["Dual High Speed Lifts", "Standby Generator", "CCTV Surveillance", "Guard Room"],
      },
    ],
    agent: {
      name: "Fahad Malik",
      role: "Central Karachi Property Advisor",
      phone: "+92 333 4519800",
      whatsapp: "923334519800",
      email: "fahad@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviewsCount: 62,
      experienceYears: 10,
    },
    nearbyLandmarks: [
      { name: "University of Karachi", distance: "4 mins drive", type: "School" },
      { name: "LuckyOne Mall", distance: "8 mins drive", type: "Mall" },
      { name: "Aga Khan Hospital", distance: "10 mins drive", type: "Hospital" },
    ],
  },
  {
    id: "jauhar-block-14-120yd-house",
    slug: "jauhar-block-14-120yd-house",
    title: "120 Sq. Yd. Double Storey House",
    tagline: "Move-in ready 4-bed family house in prime peaceful residential street",
    purpose: "buy",
    propertyType: "House",
    price: "PKR 2.40 Cr",
    priceNumeric: 24000000,
    location: {
      area: "Gulistan-e-Jauhar",
      city: "Karachi",
      fullAddress: "Block 14, Near Kamran Chowrangi, Gulistan-e-Jauhar, Karachi",
    },
    bedrooms: 4,
    bathrooms: 4,
    area: "120 sq. yd.",
    areaSqFt: 2160,
    plotSize: "120 Sq. Yards (24 x 45)",
    yearBuilt: 2022,
    parkingSpaces: 1,
    furnished: "Semi-Furnished",
    facing: "North-East",
    badge: "Verified",
    coverImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Solidly constructed 120 sq. yard double storey house in Gulistan-e-Jauhar Block 14. 2 bedrooms on ground floor and 2 bedrooms on upper floor with separate access, making it ideal for joint families or rental income.",
      "Fitted with tiled bathrooms, American kitchen, sweet water line connection, and secure iron main gate.",
    ],
    features: [
      "Double Storey (Independent Upper & Lower)",
      "2 Modern Fitted Kitchens",
      "Sweet Water Line + Underground Tank",
      "Tiled Flooring Throughout",
      "Peaceful Street with Security Gate",
    ],
    amenities: [
      {
        category: "Utilities & Security",
        items: ["K-Electric Meter Separated", "Direct Sui Gas Line", "Water Boring & Line Water"],
      },
    ],
    agent: {
      name: "Fahad Malik",
      role: "Central Karachi Property Advisor",
      phone: "+92 333 4519800",
      whatsapp: "923334519800",
      email: "fahad@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviewsCount: 62,
      experienceYears: 10,
    },
    nearbyLandmarks: [
      { name: "Kamran Chowrangi Market", distance: "2 mins walk", type: "Market" },
      { name: "Habib University", distance: "5 mins drive", type: "School" },
      { name: "Jinnah International Airport", distance: "12 mins drive", type: "Highway" },
    ],
  },
  {
    id: "north-nazimabad-block-b-240yd-house",
    slug: "north-nazimabad-block-b-240yd-house",
    title: "240 Sq. Yd. Single Storey Renovated House",
    tagline: "Spacious 3-bed house with wide lawn, car porch & solid construction",
    purpose: "buy",
    propertyType: "House",
    price: "PKR 3.85 Cr",
    priceNumeric: 38500000,
    location: {
      area: "North Nazimabad",
      city: "Karachi",
      fullAddress: "Block B, Near KDA Officers Club, North Nazimabad, Karachi",
    },
    bedrooms: 3,
    bathrooms: 4,
    area: "240 sq. yd.",
    areaSqFt: 2160,
    plotSize: "240 Sq. Yards (30 x 72)",
    yearBuilt: 2021,
    parkingSpaces: 2,
    furnished: "Unfurnished",
    facing: "West Open",
    badge: "Verified",
    coverImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Recently renovated single storey 240 sq. yard house in North Nazimabad Block B. Open layout, high ceiling drawing and dining room, 3 big bedrooms with attached baths, and roof ready for second floor construction.",
      "Prime location in a gated street near KDA Club and Hyderi market.",
    ],
    features: [
      "3 Large Bedrooms with Attached Baths",
      "2-Car Covered Porch",
      "Front Green Garden Area",
      "Roof Construction Allowed (Upper Floor Ready)",
      "Leased Clear Documentation",
    ],
    amenities: [
      {
        category: "Utilities",
        items: ["Direct Municipal Line Water", "Gas Connection Active", "Fiber Internet Ready"],
      },
    ],
    agent: {
      name: "Taimoor Shah",
      role: "Lead Property Partner",
      phone: "+92 300 8214590",
      whatsapp: "923008214590",
      email: "taimoor@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviewsCount: 48,
      experienceYears: 12,
    },
    nearbyLandmarks: [
      { name: "Hyderi Super Market", distance: "4 mins drive", type: "Market" },
      { name: "Ziauddin Hospital North Nazimabad", distance: "6 mins drive", type: "Hospital" },
      { name: "Green Line BRT Station", distance: "3 mins walk", type: "Highway" },
    ],
  },
  {
    id: "scheme-33-120yd-plot",
    slug: "scheme-33-120yd-plot",
    title: "120 Sq. Yd. Residential Plot in Scheme 33",
    tagline: "Gated society plot with demarcation, ready for immediate construction",
    purpose: "buy",
    propertyType: "Plot",
    price: "PKR 68 Lakh",
    priceNumeric: 6800000,
    location: {
      area: "Scheme 33",
      city: "Karachi",
      fullAddress: "Sector 50-A, Main Superhighway Link, Scheme 33, Karachi",
    },
    bedrooms: 0,
    bathrooms: 0,
    area: "120 sq. yd.",
    areaSqFt: 1080,
    plotSize: "120 Sq. Yards (24 x 45)",
    yearBuilt: 2024,
    parkingSpaces: 0,
    furnished: "Unfurnished",
    facing: "East Facing",
    badge: "Hot Deal",
    coverImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Prime 120 sq. yard residential plot in fully developed and populated society in Scheme 33. All development charges paid, boundary wall completed, electricity and water lines connected.",
      "Clear title deed and instant possession upon payment transfer.",
    ],
    features: [
      "Clear Leased Registry Document",
      "Ready for Immediate House Construction",
      "Wide 40-Feet Paved Carpet Road",
      "Gated Community with 24/7 Guard Post",
      "Electricity & Water Pipelines Laid",
    ],
    amenities: [
      {
        category: "Society Features",
        items: ["Gated Security Entry", "Community Park & Mosque", "Street Lighting"],
      },
    ],
    agent: {
      name: "Fahad Malik",
      role: "Central Karachi Property Advisor",
      phone: "+92 333 4519800",
      whatsapp: "923334519800",
      email: "fahad@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviewsCount: 62,
      experienceYears: 10,
    },
    nearbyLandmarks: [
      { name: "Main Superhighway (M9)", distance: "3 mins drive", type: "Highway" },
      { name: "Kiran Hospital", distance: "8 mins drive", type: "Hospital" },
      { name: "NED University", distance: "10 mins drive", type: "School" },
    ],
  },
  {
    id: "pechs-block-2-commercial-shop",
    slug: "pechs-block-2-commercial-shop",
    title: "350 Sq. Ft. Ground Floor Commercial Shop",
    tagline: "High-footfall commercial shop / office in prime PECHS Tariq Road precinct",
    purpose: "buy",
    propertyType: "Commercial",
    price: "PKR 1.25 Cr",
    priceNumeric: 12500000,
    location: {
      area: "PECHS Block 2",
      city: "Karachi",
      fullAddress: "Near Tariq Road Commercial Area, PECHS Block 2, Karachi",
    },
    bedrooms: 0,
    bathrooms: 1,
    area: "350 sq. ft.",
    areaSqFt: 350,
    yearBuilt: 2022,
    parkingSpaces: 1,
    furnished: "Semi-Furnished",
    facing: "Main Road Facing",
    badge: "Exclusive",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Ground floor 350 sq. ft. commercial space situated just off main Tariq Road in PECHS Block 2. Perfect for a boutique retail shop, travel agency, real estate office, medical clinic, or IT consultancy.",
      "High rental demand yielding approx. PKR 65,000 - 80,000 monthly rent.",
    ],
    features: [
      "Ground Floor Main Road Facing",
      "Glass Front Showroom Facade",
      "Attached Private Restroom",
      "Standby Generator Connection",
      "High Footfall Commercial Strip",
    ],
    amenities: [
      {
        category: "Commercial Facilities",
        items: ["3-Phase Power Connection", "Water Supply", "CCTV Surveillance"],
      },
    ],
    agent: {
      name: "Taimoor Shah",
      role: "Lead Property Partner",
      phone: "+92 300 8214590",
      whatsapp: "923008214590",
      email: "taimoor@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviewsCount: 48,
      experienceYears: 12,
    },
    nearbyLandmarks: [
      { name: "Tariq Road Shopping Center", distance: "2 mins walk", type: "Market" },
      { name: "Shahrah-e-Faisal", distance: "3 mins drive", type: "Highway" },
      { name: "Jinnah Hospital (JPMC)", distance: "7 mins drive", type: "Hospital" },
    ],
  },
  {
    id: "clifton-block-8-sea-view-apartment",
    slug: "clifton-block-8-sea-view-apartment",
    title: "3 Bed Sea-View Executive Apartment for Rent",
    tagline: "High-floor 2,450 sq. ft residence overlooking Arabian Sea & Clifton beach",
    purpose: "rent",
    propertyType: "Apartment",
    price: "PKR 2.8 Lakh",
    priceNumeric: 280000,
    rentFrequency: "month",
    location: {
      area: "Clifton Block 8",
      city: "Karachi",
      fullAddress: "Marine Drive, Block 8, Clifton, Karachi",
    },
    bedrooms: 3,
    bathrooms: 3,
    area: "2,450 sq. ft.",
    areaSqFt: 2450,
    yearBuilt: 2023,
    parkingSpaces: 2,
    furnished: "Furnished",
    facing: "Arabian Sea Facing",
    badge: "Sea View",
    coverImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Sea-facing 3-bedroom luxury apartment on the 14th floor overlooking Clifton coastline. Fully furnished with double-glazed acoustic glass, open-plan living and dining, and full standby generator power backup.",
    ],
    features: [
      "Unobstructed 180° Arabian Sea View",
      "Fully Furnished Designer Interior",
      "100% Standby Power (No Load Shedding)",
      "2 Reserved Basement Parking Slots",
      "Gym & Swimming Pool in Building",
    ],
    amenities: [
      {
        category: "Building Facilities",
        items: ["24/7 Standby Generator", "Dual High-Speed Elevators", "Swimming Pool & Gym", "Card Access Security"],
      },
    ],
    agent: {
      name: "Zainab Alvi",
      role: "Luxury Rental Specialist",
      phone: "+92 321 9081234",
      whatsapp: "923219081234",
      email: "zainab@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      rating: 5.0,
      reviewsCount: 39,
      experienceYears: 9,
    },
    nearbyLandmarks: [
      { name: "Dolmen Mall Clifton", distance: "3 mins walk", type: "Mall" },
      { name: "Ziauddin Hospital Clifton", distance: "5 mins drive", type: "Hospital" },
      { name: "Clifton Beach Park", distance: "2 mins walk", type: "Beach" },
    ],
    financials: {
      securityDeposit: "PKR 840,000 (3 Months Refundable Deposit)",
      advanceRent: "PKR 840,000 (Quarterly in advance)",
    },
  },
  {
    id: "bahria-town-precinct-1-villa",
    slug: "bahria-town-precinct-1-villa",
    title: "350 Sq. Yd. Mediterranean Villa",
    tagline: "Gated community luxury living with lawn, solar wiring & uninterrupted power",
    purpose: "buy",
    propertyType: "Villa",
    price: "PKR 5.25 Cr",
    priceNumeric: 52500000,
    location: {
      area: "Bahria Town Karachi",
      city: "Karachi",
      fullAddress: "Precinct 1, Main Avenue, Bahria Town Karachi",
    },
    bedrooms: 4,
    bathrooms: 5,
    area: "350 sq. yd.",
    areaSqFt: 3150,
    plotSize: "350 Sq. Yards",
    yearBuilt: 2023,
    parkingSpaces: 2,
    furnished: "Unfurnished",
    facing: "Corner Unit",
    badge: "Verified",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Nestled in prime Precinct 1 of Bahria Town Karachi, just 2 minutes from the main entrance gate. 4 spacious ensuite bedrooms, imported Turkish marble flooring, and 24/7 captive power supply.",
    ],
    features: [
      "4 Spacious Ensuite Bedrooms",
      "Corner Plot with Extra Lawn",
      "Zero Load Shedding (Bahria Grid)",
      "2-Car Port & Wide Driveway",
      "24/7 Gated Security Escort",
    ],
    amenities: [
      {
        category: "Community",
        items: ["24/7 Security Patrol", "Continuous Water & Electricity", "Fiber Internet"],
      },
    ],
    agent: {
      name: "Fahad Malik",
      role: "Bahria Town Specialist",
      phone: "+92 333 4519800",
      whatsapp: "923334519800",
      email: "fahad@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviewsCount: 62,
      experienceYears: 10,
    },
    nearbyLandmarks: [
      { name: "Roots Millennium School", distance: "2 mins drive", type: "School" },
      { name: "Bahria International Hospital", distance: "4 mins drive", type: "Hospital" },
      { name: "M9 Motorway Gate", distance: "3 mins drive", type: "Highway" },
    ],
  },
  {
    id: "federal-b-area-block-14-flat",
    slug: "federal-b-area-block-14-flat",
    title: "2 Bed Family Flat in FB Area Block 14",
    tagline: "Affordable 1,050 sq. ft. ready-to-move apartment with sweet water",
    purpose: "buy",
    propertyType: "Apartment",
    price: "PKR 85 Lakh",
    priceNumeric: 8500000,
    location: {
      area: "Federal B Area",
      city: "Karachi",
      fullAddress: "Block 14, Near Water Pump Chowrangi, FB Area, Karachi",
    },
    bedrooms: 2,
    bathrooms: 2,
    area: "1,050 sq. ft.",
    areaSqFt: 1050,
    yearBuilt: 2022,
    parkingSpaces: 1,
    furnished: "Unfurnished",
    facing: "Road Facing",
    badge: "Hot Deal",
    coverImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Affordable 2-bedroom family apartment in FB Area Block 14 near Water Pump Chowrangi. Features bright lounge, tiled flooring, sweet line water, and low monthly maintenance.",
    ],
    features: [
      "2 Bedrooms with Attached Baths",
      "Sweet Line Water Connection",
      "Secure Building with Guard",
      "Walking Distance to Markets & Transport",
    ],
    amenities: [
      {
        category: "Building",
        items: ["Intercom System", "Water Storage Tanks", "CCTV"],
      },
    ],
    agent: {
      name: "Fahad Malik",
      role: "Central Karachi Property Advisor",
      phone: "+92 333 4519800",
      whatsapp: "923334519800",
      email: "fahad@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviewsCount: 62,
      experienceYears: 10,
    },
    nearbyLandmarks: [
      { name: "Water Pump Food Street", distance: "3 mins walk", type: "Market" },
      { name: "Shahrah-e-Pakistan", distance: "2 mins drive", type: "Highway" },
      { name: "Memon Medical Hospital", distance: "8 mins drive", type: "Hospital" },
    ],
  },
];

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id || p.slug === id);
}

export function getFeaturedProperties(): Property[] {
  return properties.slice(0, 3);
}

export function getSimilarProperties(currentId: string, limit = 3): Property[] {
  const current = getPropertyById(currentId);
  return properties
    .filter((p) => p.id !== currentId && (current ? p.purpose === current.purpose || p.location.area === current.location.area : true))
    .slice(0, limit);
}

