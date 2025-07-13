import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const BusinessHourSchema = new Schema({
  day: {
    type: String,
    required: true,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  open: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  close: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },
  closed: {
    type: Boolean,
    default: false,
  },
});

const restaurantData = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  owner: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  logo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Media",
  },
  description: {
    type: String,
    trim: true,
  },
  cuisine: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CuisineType",
    },
  ],
  priceRange: {
    type: String,
    enum: ["$", "$$", "$$$", "$$$$"],
  },
  address: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    match: /^\+?[\d\s-()]+$/,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  website: {
    type: String,
  },
  businessHours: {
    type: [BusinessHourSchema],
  },
  features: {
    type: [String],
    enum: [
      // Seating & Dining
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
      
      // Service Types
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
      
      // Technology & Convenience
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
      
      // Accessibility
      "Wheelchair accessible",
      "Accessible parking",
      "Accessible restrooms",
      "Braille menus",
      "Service animal friendly",
      "Elevator access",
      "Ramp access",
      
      // Entertainment & Atmosphere
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
      
      // Parking & Transportation
      "Free parking",
      "Valet parking",
      "Street parking",
      "Parking garage",
      "Bike parking",
      "Near public transit",
      "Uber/Lyft friendly",
      
      // Family & Kids
      "Kid-friendly",
      "High chairs",
      "Kids menu",
      "Play area",
      "Changing tables",
      "Family restrooms",
      "Birthday parties",
      
      // Dietary Accommodations
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
      
      // Beverages & Bar
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
      
      // Special Services
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
      
      // Health & Safety
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
      
      // Payment & Financial
      "Credit cards accepted",
      "Cash only",
      "Digital payments",
      "Split bills",
      "Gratuity included",
      "Tipping accepted",
      "Corporate billing",
      "Invoice available",
      
      // Hours & Availability
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
      
      // Special Occasions
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
  },
  gallery: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
  meta: {
    type: Object,
  },
});

export default mongoose.models.RestaurantData ||
  model("RestaurantData", restaurantData);
