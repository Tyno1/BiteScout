// Restaurant feature types and utilities
export type RestaurantFeature =
  // Seating & Dining
  | "Outdoor seating"
  | "Indoor dining"
  | "Private dining rooms"
  | "Bar seating"
  | "Counter seating"
  | "Rooftop dining"
  | "Garden dining"
  | "Waterfront dining"
  | "Street-side dining"
  | "Patio dining"
  // Service Types
  | "Take-out"
  | "Delivery"
  | "Drive-through"
  | "Curbside pickup"
  | "Catering"
  | "Private events"
  | "Corporate events"
  | "Wedding catering"
  | "Party catering"
  | "Food trucks"
  // Technology & Convenience
  | "Free WiFi"
  | "Mobile ordering"
  | "Online reservations"
  | "Contactless payment"
  | "Digital menus"
  | "QR code menus"
  | "Self-service kiosks"
  | "Table service"
  | "Counter service"
  | "Buffet service"
  // Accessibility
  | "Wheelchair accessible"
  | "Accessible parking"
  | "Accessible restrooms"
  | "Braille menus"
  | "Service animal friendly"
  | "Elevator access"
  | "Ramp access"
  // Entertainment & Atmosphere
  | "Live music"
  | "Sports on TV"
  | "Background music"
  | "Dance floor"
  | "Karaoke"
  | "Trivia nights"
  | "Comedy nights"
  | "Wine tastings"
  | "Cooking classes"
  | "Chef's table"
  // Parking & Transportation
  | "Free parking"
  | "Valet parking"
  | "Street parking"
  | "Parking garage"
  | "Bike parking"
  | "Near public transit"
  | "Uber/Lyft friendly"
  // Family & Kids
  | "Kid-friendly"
  | "High chairs"
  | "Kids menu"
  | "Play area"
  | "Changing tables"
  | "Family restrooms"
  | "Birthday parties"
  // Dietary Accommodations
  | "Vegetarian options"
  | "Vegan options"
  | "Gluten-free options"
  | "Halal options"
  | "Kosher options"
  | "Dairy-free options"
  | "Nut-free options"
  | "Low-sodium options"
  | "Organic ingredients"
  | "Local ingredients"
  // Beverages & Bar
  | "Full bar"
  | "Wine list"
  | "Craft beer"
  | "Cocktails"
  | "Happy hour"
  | "BYOB"
  | "Coffee service"
  | "Tea service"
  | "Juice bar"
  | "Smoothies"
  // Special Services
  | "Gift cards"
  | "Loyalty program"
  | "Rewards program"
  | "Group discounts"
  | "Student discounts"
  | "Senior discounts"
  | "Military discounts"
  | "Corporate accounts"
  | "Catering delivery"
  | "Event planning"
  // Health & Safety
  | "Contactless delivery"
  | "Sanitized surfaces"
  | "Staff wearing masks"
  | "Temperature checks"
  | "Social distancing"
  | "Air purification"
  | "UV sanitization"
  | "Health inspections"
  | "Food safety certified"
  | "Allergen information"
  // Payment & Financial
  | "Credit cards accepted"
  | "Cash only"
  | "Digital payments"
  | "Split bills"
  | "Gratuity included"
  | "Tipping accepted"
  | "Corporate billing"
  | "Invoice available"
  // Hours & Availability
  | "24/7 service"
  | "Late night dining"
  | "Breakfast service"
  | "Lunch service"
  | "Dinner service"
  | "Brunch service"
  | "Holiday hours"
  | "Seasonal hours"
  | "Reservations required"
  | "Walk-ins welcome"
  // Special Occasions
  | "Romantic dining"
  | "Anniversary specials"
  | "Birthday celebrations"
  | "Date night"
  | "Business meetings"
  | "Networking events"
  | "Graduation parties"
  | "Holiday parties"
  | "Corporate lunches"
  | "Team building";

export type CategorizedFeature = {
  category: string;
  features: RestaurantFeature[];
};

export const FEATURE_CATEGORIES: Record<string, RestaurantFeature[]> = {
  "Seating & Dining": [
    "Outdoor seating",
    "Indoor dining",
    "Private dining rooms",
    "Bar seating",
    "Counter seating",
    "Rooftop dining",
    "Garden dining",
    "Waterfront dining",
    "Street-side dining",
    "Patio dining",
  ],
  "Service Types": [
    "Take-out",
    "Delivery",
    "Drive-through",
    "Curbside pickup",
    "Catering",
    "Private events",
    "Corporate events",
    "Wedding catering",
    "Party catering",
    "Food trucks",
  ],
  "Technology & Convenience": [
    "Free WiFi",
    "Mobile ordering",
    "Online reservations",
    "Contactless payment",
    "Digital menus",
    "QR code menus",
    "Self-service kiosks",
    "Table service",
    "Counter service",
    "Buffet service",
  ],
  Accessibility: [
    "Wheelchair accessible",
    "Accessible parking",
    "Accessible restrooms",
    "Braille menus",
    "Service animal friendly",
    "Elevator access",
    "Ramp access",
  ],
  "Entertainment & Atmosphere": [
    "Live music",
    "Sports on TV",
    "Background music",
    "Dance floor",
    "Karaoke",
    "Trivia nights",
    "Comedy nights",
    "Wine tastings",
    "Cooking classes",
    "Chef's table",
  ],
  "Parking & Transportation": [
    "Free parking",
    "Valet parking",
    "Street parking",
    "Parking garage",
    "Bike parking",
    "Near public transit",
    "Uber/Lyft friendly",
  ],
  "Family & Kids": [
    "Kid-friendly",
    "High chairs",
    "Kids menu",
    "Play area",
    "Changing tables",
    "Family restrooms",
    "Birthday parties",
  ],
  "Dietary Accommodations": [
    "Vegetarian options",
    "Vegan options",
    "Gluten-free options",
    "Halal options",
    "Kosher options",
    "Dairy-free options",
    "Nut-free options",
    "Low-sodium options",
    "Organic ingredients",
    "Local ingredients",
  ],
  "Beverages & Bar": [
    "Full bar",
    "Wine list",
    "Craft beer",
    "Cocktails",
    "Happy hour",
    "BYOB",
    "Coffee service",
    "Tea service",
    "Juice bar",
    "Smoothies",
  ],
  "Special Services": [
    "Gift cards",
    "Loyalty program",
    "Rewards program",
    "Group discounts",
    "Student discounts",
    "Senior discounts",
    "Military discounts",
    "Corporate accounts",
    "Catering delivery",
    "Event planning",
  ],
  "Health & Safety": [
    "Contactless delivery",
    "Sanitized surfaces",
    "Staff wearing masks",
    "Temperature checks",
    "Social distancing",
    "Air purification",
    "UV sanitization",
    "Health inspections",
    "Food safety certified",
    "Allergen information",
  ],
  "Payment & Financial": [
    "Credit cards accepted",
    "Cash only",
    "Digital payments",
    "Split bills",
    "Gratuity included",
    "Tipping accepted",
    "Corporate billing",
    "Invoice available",
  ],
  "Hours & Availability": [
    "24/7 service",
    "Late night dining",
    "Breakfast service",
    "Lunch service",
    "Dinner service",
    "Brunch service",
    "Holiday hours",
    "Seasonal hours",
    "Reservations required",
    "Walk-ins welcome",
  ],
  "Special Occasions": [
    "Romantic dining",
    "Anniversary specials",
    "Birthday celebrations",
    "Date night",
    "Business meetings",
    "Networking events",
    "Graduation parties",
    "Holiday parties",
    "Corporate lunches",
    "Team building",
  ],
};

export const ALL_FEATURES: RestaurantFeature[] = Object.values(FEATURE_CATEGORIES).flat();

/**
 * Categorizes a flat array of features into their respective categories
 * @param features - Flat array of feature strings
 * @returns Array of categorized features
 */
export const categorizeFeatures = (features: RestaurantFeature[]): CategorizedFeature[] => {
  const categorized: CategorizedFeature[] = [];

  Object.entries(FEATURE_CATEGORIES).forEach(([category, availableFeatures]) => {
    const categoryFeatures = features.filter((feature) => availableFeatures.includes(feature));
    if (categoryFeatures.length > 0) {
      categorized.push({
        category,
        features: categoryFeatures,
      });
    }
  });

  return categorized;
};

/**
 * Validates if a feature string is a valid restaurant feature
 * @param feature - Feature string to validate
 * @returns True if valid, false otherwise
 */
export const isValidFeature = (feature: string): feature is RestaurantFeature => {
  return ALL_FEATURES.includes(feature as RestaurantFeature);
};

/**
 * Gets all features for a specific category
 * @param category - Category name
 * @returns Array of features for the category, or empty array if category doesn't exist
 */
export const getFeaturesByCategory = (category: string): RestaurantFeature[] => {
  return FEATURE_CATEGORIES[category] || [];
};

/**
 * Gets all available category names
 * @returns Array of category names
 */
export const getCategoryNames = (): string[] => {
  return Object.keys(FEATURE_CATEGORIES);
};
