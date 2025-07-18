import mongoose, { Schema, model } from "mongoose";

const PriceSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    enum: [
      "USD",
      "EUR",
      "GBP",
      "CAD",
      "AUD",
      "JPY",
      "CNY",
      "KRW",
      "MYR",
      "TWD",
      "VND",
      "THB",
      "ZAR",
    ],
  },
});

const foodCatalogue = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  cuisineType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CuisineType",
    required: true,
  },
  allergens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Allergen",
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  price: {
    type: PriceSchema,
    required: true,
  },
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurantData",
    required: true,
  },
  // Analytics fields
  analytics: {
    totalMentions: {
      type: Number,
      default: 0,
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    trendingScore: {
      type: Number,
      default: 0,
    },
    lastMentioned: {
      type: Date,
    },
  },
});

export default mongoose.models.FoodCatalogue ||
  model("FoodCatalogue", foodCatalogue);
