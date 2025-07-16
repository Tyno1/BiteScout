import type { Restaurant } from "@shared/types/api/schemas";

// RestaurantFeature is a union type of all possible restaurant features
export type RestaurantFeature = NonNullable<Restaurant["features"]>[number];

// Simple categorized feature structure for UI display only
export interface CategorizedFeature {
  category: string;
  features: RestaurantFeature[];
}

// Feature categories for UI display - this is the single source of truth
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
  "Accessibility": [
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

// All available features (flattened)
export const ALL_FEATURES: RestaurantFeature[] = Object.values(FEATURE_CATEGORIES).flat();

/**
 * Convert flat features array to categorized structure for UI display
 */
export function categorizeFeatures(features: RestaurantFeature[]): CategorizedFeature[] {
  const categorized: Record<string, RestaurantFeature[]> = {};
  
  // Initialize all categories
  Object.keys(FEATURE_CATEGORIES).forEach(category => {
    categorized[category] = [];
  });
  
  // Group features by category
  features.forEach(feature => {
    for (const [category, categoryFeatures] of Object.entries(FEATURE_CATEGORIES)) {
      if (categoryFeatures.includes(feature)) {
        categorized[category].push(feature);
        break;
      }
    }
  });
  
  // Convert to array format and filter out empty categories
  return Object.entries(categorized)
    .filter(([_, features]) => features.length > 0)
    .map(([category, features]) => ({
      category,
      features
    }));
}

/**
 * Get category for a specific feature
 */
export function getCategoryForFeature(feature: RestaurantFeature): string | null {
  for (const [category, features] of Object.entries(FEATURE_CATEGORIES)) {
    if (features.includes(feature)) {
      return category;
    }
  }
  return null;
}

/**
 * Check if a feature is valid
 */
export function isValidFeature(feature: string): feature is RestaurantFeature {
  return ALL_FEATURES.includes(feature as RestaurantFeature);
} 