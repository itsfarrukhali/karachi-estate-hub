export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  purpose: "buy" | "rent";
  propertyType: "House" | "Apartment" | "Villa" | "Penthouse" | "Townhouse";
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
  badge?: "Featured" | "Verified" | "Exclusive" | "Sea View" | "Price Drop" | "New Today";
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
    type: "School" | "Hospital" | "Mall" | "Beach" | "Highway" | "Park";
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
    title: "Contemporary Minimalist Family Villa",
    tagline: "Architect-designed 500 sq. yd luxury residence with private courtyard pool",
    purpose: "buy",
    propertyType: "Villa",
    price: "PKR 8.95 Cr",
    priceNumeric: 89500000,
    location: {
      area: "DHA Phase 6",
      city: "Karachi",
      fullAddress: "Khayaban-e-Seher, Phase 6, Defence Housing Authority, Karachi",
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
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Perched in the prestigious heart of DHA Phase 6, this bespoke 500 sq. yard modern villa stands as a masterpiece of contemporary Pakistani residential architecture. Built with an open-plan ethos, high ceilings, and double-glazed Belgian glass, the home balances abundant natural daylight with thermal comfort.",
      "The ground floor opens to an expansive double-height drawing room, an Italian designer show kitchen with integrated Bosch appliances, a secondary dirty kitchen, and two lavish ensuite guest suites looking out onto an internal plunge pool and landscaped courtyard.",
      "On the upper floor, you'll find three opulent bedrooms including a master retreat with a walk-in dressing lounge and Spanish porcelain-tiled rain shower bathroom. Complete with dedicated servant quarters, rooftop terrace with panoramic views, and 20KW hybrid solar installation.",
    ],
    features: [
      "5 Ensuite Master Bedrooms",
      "Italian Show Kitchen + Dirty Kitchen",
      "Private Courtyard Plunge Pool",
      "20KW Hybrid Solar Net-Metering",
      "Double Glazed Soundproof Windows",
      "Servant Quarters with Separate Entry",
      "3-Car Covered Automated Garage",
      "Full CCTV & Smart Access Locks",
    ],
    amenities: [
      {
        category: "Energy & Utilities",
        items: ["20KW Hybrid Solar System", "Dual Line Water Connection", "25,000L Underground Water Tank", "3-Phase Electricity Line"],
      },
      {
        category: "Interior & Finishes",
        items: ["Imported Spanish Porcelain Tiles", "Grohe & Kohler Sanitaryware", "Solid Teak Wood Doors", "Concealed Inverter AC Ducting"],
      },
      {
        category: "Security & Tech",
        items: ["8-Camera 4K HD CCTV", "Smart Fingerprint Door Lock", "Automated Security Gate", "Video Intercom on Both Floors"],
      },
    ],
    floorPlan: {
      title: "Architectural Layout Breakdown",
      levels: [
        {
          name: "Ground Level (2,400 sq. ft)",
          size: "2,400 sq. ft",
          details: "Main Foyer, Double-height Drawing Room, Dining, Show Kitchen, Wet Kitchen, 2 Ensuite Bedrooms, Courtyard Pool & Garage.",
        },
        {
          name: "First Level (2,100 sq. ft)",
          size: "2,100 sq. ft",
          details: "Family Lounge with Skylight, Master Suite with Walk-in Wardrobe, 2 Additional Ensuites, Private Terrace.",
        },
        {
          name: "Rooftop & Service Level",
          size: "Rooftop Space",
          details: "2 Maid Rooms with Bath, Laundry Utility Area, BBQ Gazebo with Pergola, Solar Panel Deck.",
        },
      ],
    },
    agent: {
      name: "Taimoor Shah",
      role: "Senior Property Partner (DHA & Clifton)",
      phone: "+92 300 8214590",
      whatsapp: "923008214590",
      email: "taimoor.shah@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviewsCount: 48,
      experienceYears: 12,
    },
    nearbyLandmarks: [
      { name: "Creek Club DHA", distance: "4 mins drive", type: "Park" },
      { name: "Karachi Grammar Middle School", distance: "6 mins drive", type: "School" },
      { name: "South City Hospital", distance: "8 mins drive", type: "Hospital" },
      { name: "Dolmen Mall Clifton", distance: "12 mins drive", type: "Mall" },
      { name: "Seaview Beach Promenade", distance: "5 mins drive", type: "Beach" },
    ],
    financials: {
      maintenanceFee: "PKR 6,500/mo (DHA Authority)",
      estimatedMortgage: "PKR 620,000/mo (based on 30% down payment @ 14% tenure)",
    },
  },
  {
    id: "clifton-block-8-sea-view-apartment",
    slug: "clifton-block-8-sea-view-apartment",
    title: "Sunlit Sea-View Executive Apartment",
    tagline: "High-floor 2,450 sq. ft luxury residence overlooking Arabian Sea & Clifton coastline",
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
    facing: "South-West (Arabian Sea Facing)",
    badge: "Sea View",
    coverImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Boasting uninterrupted views of the Arabian Sea from the 14th floor, this immaculate 3-bedroom apartment in Clifton Block 8 represents turn-key executive living at its finest.",
      "Fully furnished with curated Scandinavian and mid-century modern pieces, the residence features floor-to-ceiling double insulated acoustic glass, a seamless open-plan living and dining gallery, and an expansive balcony for sunset unwinding.",
      "Residents enjoy 24/7 dedicated reception concierge, dual high-speed Mitsubishi elevators, 100% full standby generator power backup, and secure basement reserved parking.",
    ],
    features: [
      "Unobstructed 180° Arabian Sea View",
      "Fully Furnished Designer Interior",
      "100% Standby Power (No Load Shedding)",
      "High-Floor Unit (14th Floor)",
      "Dedicated Reception & 24/7 Concierge",
      "2 Reserved Basement Parking Slots",
      "Gated High-Security Complex",
      "Gym & Resident Rooftop Deck",
    ],
    amenities: [
      {
        category: "Building Facilities",
        items: ["24/7 Standby Generator", "Dual High-Speed Elevators", "Swimming Pool & Gym", "Card Access Security"],
      },
      {
        category: "Interior Amenities",
        items: ["Fully Equipped Western Kitchen", "Washing Machine & Dryer", "Smart TV & High-Speed Fiber Internet", "Centralized Water Filtration"],
      },
    ],
    floorPlan: {
      title: "Apartment Layout Overview",
      levels: [
        {
          name: "Main Unit (2,450 sq. ft)",
          size: "2,450 sq. ft",
          details: "Large Sea-Facing Living/Dining Room, Master Bedroom with Sea View Balcony, 2 Guest Ensuites, Powder Room, Kitchen with Utility.",
        },
      ],
    },
    agent: {
      name: "Zainab Alvi",
      role: "Clifton & Luxury Rental Advisor",
      phone: "+92 321 9081234",
      whatsapp: "923219081234",
      email: "zainab.alvi@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      rating: 5.0,
      reviewsCount: 39,
      experienceYears: 9,
    },
    nearbyLandmarks: [
      { name: "Dolmen Mall Clifton", distance: "3 mins walk", type: "Mall" },
      { name: "Ziauddin Hospital Clifton", distance: "5 mins drive", type: "Hospital" },
      { name: "Clifton Beach Park", distance: "2 mins walk", type: "Beach" },
      { name: "Karachi Port Trust (KPT)", distance: "10 mins drive", type: "Highway" },
    ],
    financials: {
      maintenanceFee: "PKR 18,000/mo (Included in rent or separate per lease)",
      securityDeposit: "PKR 840,000 (3 Months Refundable Deposit)",
      advanceRent: "PKR 840,000 (Quarterly in advance)",
    },
  },
  {
    id: "bahria-town-architect-villa",
    slug: "bahria-town-architect-villa",
    title: "Signature Mediterranean 350 Sq. Yd Villa",
    tagline: "Gated community luxury living with private landscaped lawn and designer finish",
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
    facing: "North-East (Corner Unit)",
    badge: "Verified",
    coverImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Nestled in the prime and fully inhabited Precinct 1 of Bahria Town Karachi, this 350 sq. yard designer villa combines understated luxury with optimal family-oriented functionality.",
      "Features soaring 11-foot ceiling heights, imported Turkish marble flooring, custom fluted panel walls, and high-efficiency inverter climate zoning throughout.",
      "The property is situated just two minutes from the Main Superhighway entrance, international schools, Danzoo Safari, and premium healthcare facilities.",
    ],
    features: [
      "4 Spacious Ensuite Bedrooms",
      "Corner Plot with Extra Green Lawn",
      "Imported Turkish Marble Flooring",
      "Designer False Ceilings with Warm Ambient Lighting",
      "Bahria Town 24/7 Security Patrol",
      "Underground Electrification & Fiber Internet",
      "2-Car Port & Wide Paved Driveway",
    ],
    amenities: [
      {
        category: "Community & Security",
        items: ["24/7 Gated Security Escort", "Uninterrupted Bahria Town Power Supply", "Clean Tap Water 24/7", "Fire Station & Rapid Response"],
      },
      {
        category: "Fittings & Materials",
        items: ["Turkish Travertine Tiles", "Fitted Wardrobes in all Rooms", "Concealed Sanitary Fittings", "Solar Inverter Ready Wiring"],
      },
    ],
    floorPlan: {
      title: "Villa Floor Configuration",
      levels: [
        {
          name: "Ground Floor (1,700 sq. ft)",
          size: "1,700 sq. ft",
          details: "Grand Entrance Porch, Drawing Room, Dining Area, Kitchen, 1 Guest Ensuite, Powder Room, Lawn.",
        },
        {
          name: "First Floor (1,450 sq. ft)",
          size: "1,450 sq. ft",
          details: "Master Suite with Balcony, 2 Kids/Guest Ensuites, Family TV Lounge, Front Terrace.",
        },
      ],
    },
    agent: {
      name: "Fahad Malik",
      role: "Bahria Town Senior Specialist",
      phone: "+92 333 4519800",
      whatsapp: "923334519800",
      email: "fahad.malik@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviewsCount: 62,
      experienceYears: 10,
    },
    nearbyLandmarks: [
      { name: "Roots Millennium School", distance: "2 mins drive", type: "School" },
      { name: "Bahria International Hospital", distance: "4 mins drive", type: "Hospital" },
      { name: "Danzoo Safari Park", distance: "5 mins drive", type: "Park" },
      { name: "M9 Karachi-Hyderabad Motorway", distance: "3 mins drive", type: "Highway" },
    ],
    financials: {
      maintenanceFee: "PKR 5,000/mo (Bahria Town Maintenance)",
      estimatedMortgage: "PKR 365,000/mo (based on 30% down payment @ 14% tenure)",
    },
  },
  {
    id: "dha-phase-8-emaar-penthouse",
    slug: "dha-phase-8-emaar-penthouse",
    title: "Emaar Oceanfront Sky Penthouse",
    tagline: "Ultra-luxury duplex penthouse with 360-degree panoramic ocean and skyline views",
    purpose: "buy",
    propertyType: "Penthouse",
    price: "PKR 14.50 Cr",
    priceNumeric: 145000000,
    location: {
      area: "DHA Phase 8",
      city: "Karachi",
      fullAddress: "Emaar Oceanfront, Phase 8 Extension, DHA, Karachi",
    },
    bedrooms: 5,
    bathrooms: 6,
    area: "4,800 sq. ft.",
    areaSqFt: 4800,
    yearBuilt: 2024,
    parkingSpaces: 4,
    furnished: "Furnished",
    facing: "Direct Sea-Facing + Harbor Skyline",
    badge: "Exclusive",
    coverImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "A rare opportunity to acquire a flagship duplex penthouse atop Emaar Oceanfront in DHA Phase 8. Offering front-row seats to the open Arabian Sea and Karachi's shimmering skyline, this property is the pinnacle of coastal luxury in Pakistan.",
      "The double-height great room boasts 22-foot glass walls, imported Italian marble slabs, and an open designer show kitchen with Gaggenau appliances. The upper level is dedicated to a sprawling presidential master suite with private Jacuzzi and expansive wraparound sun terrace.",
      "Comes with 4 dedicated private basement parking spaces, private elevator foyer, 24-hour valet concierge, and access to infinity pools, gym, and private beach access.",
    ],
    features: [
      "Duplex Penthouse on 32nd & 33rd Floors",
      "Direct Private Beach Access",
      "22-Ft Double Height Ceiling in Grand Salon",
      "Wraparound Sunset Terrace with Private Jacuzzi",
      "Dedicated Private Elevator Access",
      "4 Reserved Covered Parking Bays",
      "Infinity Swimming Pool & Wellness Spa",
      "Comprehensive Smart Home Automation",
    ],
    amenities: [
      {
        category: "Building & Lifestyle",
        items: ["Private Residents Beach", "Infinity Ocean Pool", "Valet Parking & Concierge", "Business Lounge & Boardroom"],
      },
      {
        category: "Safety & Privacy",
        items: ["Biometric Lift Calling", "24/7 Armed Security & CCTV", "Full Redundant Power Generators", "Advanced Fire Suppression"],
      },
    ],
    agent: {
      name: "Taimoor Shah",
      role: "Senior Property Partner (DHA & Clifton)",
      phone: "+92 300 8214590",
      whatsapp: "923008214590",
      email: "taimoor.shah@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      rating: 4.9,
      reviewsCount: 48,
      experienceYears: 12,
    },
    nearbyLandmarks: [
      { name: "Do Darya Waterfront Dining", distance: "4 mins drive", type: "Park" },
      { name: "DHA Golf & Country Club", distance: "7 mins drive", type: "Park" },
      { name: "Creek Vistas DHA", distance: "8 mins drive", type: "Mall" },
      { name: "South City Hospital", distance: "14 mins drive", type: "Hospital" },
    ],
    financials: {
      maintenanceFee: "PKR 45,000/mo (Emaar Oceanfront Management)",
      estimatedMortgage: "PKR 1,020,000/mo (based on 30% down payment @ 14% tenure)",
    },
  },
  {
    id: "dha-phase-5-designer-house-rent",
    slug: "dha-phase-5-designer-house-rent",
    title: "Brand New 500 Sq. Yd Designer House for Rent",
    tagline: "Full residential luxury house with solar power, basement theater, and lush garden",
    purpose: "rent",
    propertyType: "House",
    price: "PKR 6.5 Lakh",
    priceNumeric: 650000,
    rentFrequency: "month",
    location: {
      area: "DHA Phase 5",
      city: "Karachi",
      fullAddress: "Khayaban-e-Shamsheer, Phase 5, DHA, Karachi",
    },
    bedrooms: 5,
    bathrooms: 6,
    area: "500 sq. yd.",
    areaSqFt: 5200,
    plotSize: "500 Sq. Yards",
    yearBuilt: 2024,
    parkingSpaces: 4,
    furnished: "Semi-Furnished",
    facing: "East Facing",
    badge: "New Today",
    coverImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "Situated in the quiet, secure, and prestigious Khayaban-e-Shamsheer precinct in DHA Phase 5, this 500 sq. yd standalone house is ideal for embassies, multinational executives, or discerning families.",
      "The home features a dedicated finished basement with a media/entertainment lounge, 5 spacious suites with custom solid ash-wood closets, two modern kitchens with imported quartz counter tops, and a standby 15KW solar backup system.",
    ],
    features: [
      "5 Luxurious Ensuite Bedrooms",
      "Finished Basement Lounge / Home Cinema",
      "15KW Solar Grid-Tied System",
      "Lush Front Garden with Sprinklers",
      "Dual Fully-Equipped Kitchens",
      "2 Servant Quarters with Private Bathrooms",
      "4-Car Gated Parking Driveway",
    ],
    amenities: [
      {
        category: "Utilities & Backup",
        items: ["15KW Solar Backup", "Direct Gas & 3-Phase Electric", "Huge Underground & Overhead Water Tanks"],
      },
      {
        category: "Security & Access",
        items: ["CCTV Surveillance System", "Automated Remote Gate", "Secure Perimeter Wall & Guard Sentry Post"],
      },
    ],
    agent: {
      name: "Zainab Alvi",
      role: "Clifton & Luxury Rental Advisor",
      phone: "+92 321 9081234",
      whatsapp: "923219081234",
      email: "zainab.alvi@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      rating: 5.0,
      reviewsCount: 39,
      experienceYears: 9,
    },
    nearbyLandmarks: [
      { name: "Zamzama Commercial Area", distance: "3 mins drive", type: "Mall" },
      { name: "Sultan Masjid DHA", distance: "4 mins drive", type: "Park" },
      { name: "Clifton Beach", distance: "6 mins drive", type: "Beach" },
      { name: "St. Michael's Convent School", distance: "7 mins drive", type: "School" },
    ],
    financials: {
      securityDeposit: "PKR 1,950,000 (3 Months Refundable)",
      advanceRent: "PKR 3,900,000 (6 Months Advance Rent)",
    },
  },
  {
    id: "gulshan-block-13d-modern-apartment",
    slug: "gulshan-block-13d-modern-apartment",
    title: "Spacious 4-Room Family Apartment",
    tagline: "Prime central Karachi location with lift, standby generator & dedicated parking",
    purpose: "buy",
    propertyType: "Apartment",
    price: "PKR 2.45 Cr",
    priceNumeric: 24500000,
    location: {
      area: "Gulshan-e-Iqbal",
      city: "Karachi",
      fullAddress: "Block 13-D/2, Main University Road, Gulshan-e-Iqbal, Karachi",
    },
    bedrooms: 3,
    bathrooms: 3,
    area: "1,750 sq. ft.",
    areaSqFt: 1750,
    yearBuilt: 2022,
    parkingSpaces: 1,
    furnished: "Unfurnished",
    facing: "West Open (Corner)",
    badge: "Price Drop",
    coverImage:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "A prime opportunity for families seeking central Karachi convenience in Gulshan-e-Iqbal Block 13-D. Located minutes from University of Karachi, NED University, and the Green Line BRT corridor.",
      "Features 3 bright bedrooms with attached baths, drawing room, spacious family lounge, tiled kitchen, and corner ventilation with abundant airflow.",
    ],
    features: [
      "Corner Unit with Optimal Sunlight",
      "Standby Generator for Lifts & Corridor Lighting",
      "Sweet Water Connection 24/7",
      "Gated Complex with Intercom",
      "Covered Basement Reserved Car Parking",
    ],
    amenities: [
      {
        category: "Building Features",
        items: ["Standby Generator", "High-Speed Elevators", "CCTV Surveillance", "Guard Room"],
      },
    ],
    agent: {
      name: "Fahad Malik",
      role: "Central Karachi Property Specialist",
      phone: "+92 333 4519800",
      whatsapp: "923334519800",
      email: "fahad.malik@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      rating: 4.8,
      reviewsCount: 62,
      experienceYears: 10,
    },
    nearbyLandmarks: [
      { name: "University of Karachi", distance: "4 mins drive", type: "School" },
      { name: "Aga Khan University Hospital", distance: "10 mins drive", type: "Hospital" },
      { name: "LuckyOne Mall", distance: "8 mins drive", type: "Mall" },
      { name: "Aladin / Pavilion End Club", distance: "5 mins drive", type: "Park" },
    ],
    financials: {
      maintenanceFee: "PKR 5,500/mo",
      estimatedMortgage: "PKR 170,000/mo (based on 30% down payment @ 14% tenure)",
    },
  },
  {
    id: "clifton-block-2-townhouse-rent",
    slug: "clifton-block-2-townhouse-rent",
    title: "Furnished Modern Townhouse in Clifton Block 2",
    tagline: "Charming 3-bedroom renovated duplex townhouse in a serene, quiet street",
    purpose: "rent",
    propertyType: "Townhouse",
    price: "PKR 3.5 Lakh",
    priceNumeric: 350000,
    rentFrequency: "month",
    location: {
      area: "Clifton Block 2",
      city: "Karachi",
      fullAddress: "Near Bilawal House, Block 2, Clifton, Karachi",
    },
    bedrooms: 3,
    bathrooms: 4,
    area: "250 sq. yd.",
    areaSqFt: 2700,
    plotSize: "250 Sq. Yards",
    yearBuilt: 2022,
    parkingSpaces: 2,
    furnished: "Furnished",
    facing: "West Open",
    badge: "Verified",
    coverImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    ],
    description: [
      "This fully furnished townhouse in Clifton Block 2 offers an oasis of tranquility right in the heart of Karachi's most sought-after neighborhood.",
      "Renovated with bespoke mid-century furnishings, a private patio terrace, open-concept kitchen, and modern security provisions. Walkable to boutique cafes, art galleries, and Clifton beach.",
    ],
    features: [
      "3 Luxurious Ensuite Bedrooms",
      "Private Landscaped Patio",
      "Fully Furnished with Scandinavian Interiors",
      "Standby Inverter Power Backup",
      "2-Car Gated Parking",
    ],
    amenities: [
      {
        category: "Convenience",
        items: ["Inverter Solar & Generator Backup", "Fast Optical Fiber Wi-Fi", "Fully Equipped Modern Kitchen"],
      },
    ],
    agent: {
      name: "Zainab Alvi",
      role: "Clifton & Luxury Rental Advisor",
      phone: "+92 321 9081234",
      whatsapp: "923219081234",
      email: "zainab.alvi@karachiestate.pk",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      rating: 5.0,
      reviewsCount: 39,
      experienceYears: 9,
    },
    nearbyLandmarks: [
      { name: "Boat Basin Food Street", distance: "3 mins walk", type: "Park" },
      { name: "Mohatta Palace Museum", distance: "4 mins drive", type: "Park" },
      { name: "South City Hospital", distance: "5 mins drive", type: "Hospital" },
    ],
    financials: {
      securityDeposit: "PKR 1,050,000 (3 Months Refundable)",
      advanceRent: "PKR 1,050,000 (Quarterly in advance)",
    },
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
