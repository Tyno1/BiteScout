import { IconButton, Select } from "@/components/atoms";
import type { Restaurant, RestaurantFeature } from "@shared/types/api/schemas";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { useState } from "react";

// Get the type of a single feature from the Restaurant type

// Create a flat list of all available features for the dropdown
const ALL_FEATURES: RestaurantFeature[] = [
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
  "Wheelchair accessible",
  "Accessible parking",
  "Accessible restrooms",
  "Braille menus",
  "Service animal friendly",
  "Elevator access",
  "Ramp access",
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
  "Free parking",
  "Valet parking",
  "Street parking",
  "Parking garage",
  "Bike parking",
  "Near public transit",
  "Uber/Lyft friendly",
  "Kid-friendly",
  "High chairs",
  "Kids menu",
  "Play area",
  "Changing tables",
  "Family restrooms",
  "Birthday parties",
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
  "Credit cards accepted",
  "Cash only",
  "Digital payments",
  "Split bills",
  "Gratuity included",
  "Tipping accepted",
  "Corporate billing",
  "Invoice available",
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
];

// Define all available features organized by category
const FEATURE_CATEGORIES: Record<string, RestaurantFeature[]> = {
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

type RestaurantProfileFeaturesProps = {
  isEditing: boolean;
  newFeature: RestaurantFeature | null;
  setNewFeature: (value: RestaurantFeature) => void;
  addFeature: (feature: RestaurantFeature) => void;
  displayData: { features?: RestaurantFeature[] };
  handleInputChange?: (
    field: keyof Restaurant,
    value: Restaurant[keyof Restaurant]
  ) => void;
};

export function RestaurantProfileFeatures({
  isEditing,
  newFeature,
  setNewFeature,
  addFeature,
  displayData,
  handleInputChange,
}: RestaurantProfileFeaturesProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );
  const [viewMode, setViewMode] = useState<"categorized" | "list">(
    "categorized"
  );

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleFeature = (feature: RestaurantFeature) => {
    if (!handleInputChange) return;

    const currentFeatures = displayData.features || [];
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f: string) => f !== feature)
      : [...currentFeatures, feature];

    handleInputChange("features", newFeatures);
  };

  const isFeatureSelected = (feature: RestaurantFeature) => {
    return displayData.features?.includes(feature) || false;
  };

  const getSelectedCount = () => {
    return displayData.features?.length || 0;
  };

  return (
    <section
      className="bg-white rounded-lg border border-1 border-gray-100 p-6"
      aria-labelledby="features-heading"
    >
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 id="features-heading" className="text-lg font-semibold">
            Restaurant Features
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {getSelectedCount()} features selected
          </p>
        </div>
        {isEditing && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setViewMode("categorized")}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === "categorized"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Categorized
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              List
            </button>
          </div>
        )}
      </div>

      {isEditing && viewMode === "categorized" && (
        <div className="space-y-4">
          {Object.entries(FEATURE_CATEGORIES).map(([category, features]) => (
            <div key={category} className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleCategory(category)}
                className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100 rounded-t-lg"
              >
                <span className="font-medium text-gray-900">{category}</span>
                {expandedCategories.has(category) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {expandedCategories.has(category) && (
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {features.map((feature) => (
                    <label
                      key={feature}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={isFeatureSelected(feature)}
                        onChange={() => toggleFeature(feature)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isEditing && viewMode === "list" && (
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <Select
              fullWidth
              outlineType="round"
              label="Add feature"
              name="new-feature"
              options={ALL_FEATURES.map((feature) => ({
                value: feature,
                label: feature,
              }))}
              value={newFeature || ""}
              onChange={(e) =>
                setNewFeature((e.target.value as RestaurantFeature) || null)
              }
              placeholder="Select a feature to add"
            />
            <IconButton
              variant="solid"
              icon={<Plus />}
              onClick={() => newFeature && addFeature(newFeature)}
              aria-label="Add Feature"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.values(FEATURE_CATEGORIES)
              .flat()
              .map((feature) => (
                <label
                  key={feature}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={isFeatureSelected(feature)}
                    onChange={() => toggleFeature(feature)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </label>
              ))}
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="flex flex-wrap gap-2">
          {displayData.features?.map((feature: string) => (
            <div
              key={feature}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {feature}
            </div>
          ))}
          {displayData.features?.length === 0 && (
            <p className="text-gray-500 italic">No features added yet</p>
          )}
        </div>
      )}
    </section>
  );
}
