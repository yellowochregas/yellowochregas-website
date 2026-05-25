export const quoteTypes = [
  {
    id: "boiler",
    title: "Boiler Installation",
    eyebrow: "Gas Safe Registered",
    summary: "Fast, professional boiler installation quotes with warranty support.",
    image: "/images/gas-safe-engineer-2.jpg"
  },
  {
    id: "bathroom",
    title: "Bathroom Installation",
    eyebrow: "Premium finish",
    summary: "Plan a bathroom renovation with clear pricing and trade-quality workmanship.",
    image: "/images/Gas-engineer-at-work-in-kitchen.png"
  }
];

export const quoteSteps = {
  boiler: [
    {
      id: "personal",
      title: "Personal details",
      fields: ["fullName", "email", "phone", "postcode", "address"]
    },
    {
      id: "property",
      title: "Property details",
      fields: ["propertyType", "bedrooms", "existingBoilerLocation", "currentHeatingSystem"]
    },
    {
      id: "currentBoiler",
      title: "Current boiler",
      fields: ["boilerType", "boilerAge", "fuelType", "radiators", "waterPressureIssues", "smartThermostat"]
    },
    {
      id: "preferences",
      title: "New boiler preferences",
      fields: ["preferredBoilerType", "preferredBrand", "budgetRange", "warrantyPreference", "smartThermostatInterest"]
    },
    {
      id: "installation",
      title: "Installation details",
      fields: ["timeframe", "accessLimitations", "parkingAvailability", "occupancyDuringWork"]
    },
    {
      id: "additional",
      title: "Additional information",
      fields: ["existingIssues", "specialRequirements", "photoNotes", "optionalNotes"]
    },
    {
      id: "review",
      title: "Review and submit",
      fields: ["gdprConsent"]
    }
  ],
  bathroom: [
    {
      id: "personal",
      title: "Personal details",
      fields: ["fullName", "email", "phone", "postcode", "address"]
    },
    {
      id: "bathroomDetails",
      title: "Bathroom details",
      fields: ["bathroomLocation", "bathroomType", "bathroomSize", "existingBathroomStatus", "bathroomCount"]
    },
    {
      id: "design",
      title: "Design preferences",
      fields: ["preferredStyle", "preferredColours", "budgetRange", "inspirationNotes", "designNotes"]
    },
    {
      id: "fixtures",
      title: "Fixtures and fittings",
      fields: ["fixtures"]
    },
    {
      id: "planning",
      title: "Installation planning",
      fields: ["startTimeframe", "projectDuration", "structuralWork", "plumbingChanges", "electricalWork"]
    },
    {
      id: "additional",
      title: "Additional notes",
      fields: ["accessibilityRequirements", "existingIssues", "photoNotes", "otherRequests"]
    },
    {
      id: "review",
      title: "Review and submit",
      fields: ["gdprConsent"]
    }
  ]
};

export const defaultQuoteValues = {
  quoteType: "",
  fullName: "",
  email: "",
  phone: "",
  postcode: "",
  address: "",
  propertyType: "",
  bedrooms: "",
  existingBoilerLocation: "",
  currentHeatingSystem: "",
  boilerType: "",
  boilerAge: "",
  fuelType: "",
  radiators: "",
  waterPressureIssues: "",
  smartThermostat: "",
  preferredBoilerType: "",
  preferredBrand: "",
  budgetRange: "",
  warrantyPreference: "",
  smartThermostatInterest: "",
  timeframe: "",
  accessLimitations: "",
  parkingAvailability: "",
  occupancyDuringWork: "",
  bathroomLocation: "",
  bathroomType: "",
  bathroomSize: "",
  existingBathroomStatus: "",
  bathroomCount: "",
  preferredStyle: "",
  preferredColours: "",
  inspirationNotes: "",
  designNotes: "",
  fixtures: [],
  startTimeframe: "",
  projectDuration: "",
  structuralWork: "",
  plumbingChanges: "",
  electricalWork: "",
  accessibilityRequirements: "",
  existingIssues: "",
  specialRequirements: "",
  photoNotes: "",
  optionalNotes: "",
  otherRequests: "",
  gdprConsent: false
};

export const fieldConfig = {
  fullName: { label: "Full name", type: "text", placeholder: "Your full name", autoComplete: "name" },
  email: { label: "Email address", type: "email", placeholder: "you@example.com", autoComplete: "email" },
  phone: { label: "Phone number", type: "tel", placeholder: "Best number to call", autoComplete: "tel" },
  postcode: { label: "Postcode", type: "text", placeholder: "For example CM7 3DP", autoComplete: "postal-code" },
  address: { label: "Address lookup", type: "text", placeholder: "Start typing your address" },
  propertyType: { label: "Property type", type: "select", options: ["House", "Flat", "Bungalow", "Rental property", "Commercial property"] },
  bedrooms: { label: "Number of bedrooms", type: "select", options: ["1", "2", "3", "4", "5+"] },
  existingBoilerLocation: { label: "Existing boiler location", type: "select", options: ["Kitchen", "Utility room", "Airing cupboard", "Loft", "Garage", "Not sure"] },
  currentHeatingSystem: { label: "Current heating system", type: "select", options: ["Combi boiler", "System boiler", "Regular boiler", "Electric heating", "Not sure"] },
  boilerType: { label: "Current boiler type", type: "select", options: ["Combi", "System", "Regular", "Back boiler", "Not sure"] },
  boilerAge: { label: "Boiler age", type: "select", options: ["Under 5 years", "5-10 years", "10-15 years", "Over 15 years", "Not sure"] },
  fuelType: { label: "Fuel type", type: "select", options: ["Mains gas", "LPG", "Oil", "Electric", "Not sure"] },
  radiators: { label: "Number of radiators", type: "select", options: ["1-5", "6-10", "11-15", "16+", "Not sure"] },
  waterPressureIssues: { label: "Water pressure issues", type: "select", options: ["No", "Sometimes", "Yes", "Not sure"] },
  smartThermostat: { label: "Existing smart thermostat", type: "select", options: ["Yes", "No", "Not sure"] },
  preferredBoilerType: { label: "Preferred boiler type", type: "select", options: ["Combi boiler", "System boiler", "Regular boiler", "Please recommend"] },
  preferredBrand: { label: "Preferred brand", type: "select", options: ["Worcester Bosch", "Vaillant", "Ideal", "Baxi", "Please recommend"] },
  budgetRange: { label: "Budget range", type: "select", options: ["Under GBP 2,000", "GBP 2,000-GBP 3,500", "GBP 3,500-GBP 5,000", "GBP 5,000+", "Not sure"] },
  warrantyPreference: { label: "Warranty preference", type: "select", options: ["Standard", "Extended warranty", "Best value recommendation"] },
  smartThermostatInterest: { label: "Smart thermostat interest", type: "select", options: ["Yes", "Maybe", "No"] },
  timeframe: { label: "Preferred installation timeframe", type: "select", options: ["Emergency", "This week", "This month", "Flexible"] },
  accessLimitations: { label: "Access limitations", type: "textarea", placeholder: "Narrow stairs, loft access, building rules, pets, or other details" },
  parkingAvailability: { label: "Parking availability", type: "select", options: ["Driveway", "Street parking", "Permit needed", "Limited parking", "Not sure"] },
  occupancyDuringWork: { label: "Occupancy during work", type: "select", options: ["Occupied", "Vacant", "Tenant occupied", "Commercial premises"] },
  bathroomLocation: { label: "Bathroom location", type: "select", options: ["Ground floor", "First floor", "En-suite", "Loft", "Basement", "Other"] },
  bathroomType: { label: "Bathroom type", type: "select", options: ["Main bathroom", "En-suite", "Cloakroom", "Wet room", "Full renovation"] },
  bathroomSize: { label: "Approximate size", type: "select", options: ["Small", "Medium", "Large", "Not sure"] },
  existingBathroomStatus: { label: "Existing bathroom status", type: "select", options: ["Usable", "Needs repair", "Full strip-out needed", "New room"] },
  bathroomCount: { label: "Number of bathrooms", type: "select", options: ["1", "2", "3+"] },
  preferredStyle: { label: "Preferred style", type: "select", options: ["Modern", "Classic", "Luxury hotel", "Family practical", "Accessible", "Not sure"] },
  preferredColours: { label: "Preferred colours", type: "text", placeholder: "For example white, black brass, warm neutral" },
  inspirationNotes: { label: "Inspiration upload notes", type: "textarea", placeholder: "Describe any images you would upload" },
  designNotes: { label: "Design notes", type: "textarea", placeholder: "Tell us the look and feel you want" },
  fixtures: { label: "Fixtures and fittings", type: "checkboxes", options: ["Bath", "Walk-in shower", "Vanity unit", "Toilet", "Underfloor heating", "Towel radiator", "Storage units", "Mirror cabinets"] },
  startTimeframe: { label: "Start timeframe", type: "select", options: ["As soon as possible", "This month", "1-3 months", "Planning ahead"] },
  projectDuration: { label: "Expected project duration", type: "select", options: ["Fast refresh", "1 week", "2 weeks", "Flexible"] },
  structuralWork: { label: "Structural work required", type: "select", options: ["No", "Maybe", "Yes", "Not sure"] },
  plumbingChanges: { label: "Plumbing changes", type: "select", options: ["No", "Some changes", "Major changes", "Not sure"] },
  electricalWork: { label: "Electrical work needed", type: "select", options: ["No", "Lighting", "Shaver socket", "Underfloor heating", "Not sure"] },
  accessibilityRequirements: { label: "Accessibility requirements", type: "textarea", placeholder: "Walk-in shower, grab rails, lower fixtures, or mobility needs" },
  existingIssues: { label: "Existing issues", type: "textarea", placeholder: "No heating, water leak, damp, weak pressure, gas leak, or other concern" },
  specialRequirements: { label: "Special requirements", type: "textarea", placeholder: "Brand preferences, access needs, landlord deadlines, or other notes" },
  photoNotes: { label: "Upload photos option", type: "textarea", placeholder: "Describe the photos you can share, such as boiler, bathroom, pipework, or access" },
  optionalNotes: { label: "Optional notes", type: "textarea", placeholder: "Anything else we should know" },
  otherRequests: { label: "Other requests", type: "textarea", placeholder: "Anything else you want included" }
};
