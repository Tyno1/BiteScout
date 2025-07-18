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
  // Search optimization fields
  searchKeywords: {
    type: [String],
    default: [],
    description: "Keywords for better search matching (auto-generated from name, ingredients, etc.)"
  },
  isAvailable: {
    type: Boolean,
    default: true,
    description: "Whether the food item is currently available"
  },
  isFeatured: {
    type: Boolean,
    default: false,
    description: "Whether the food item is featured/promoted"
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
    // Search-specific analytics
    searchViews: {
      type: Number,
      default: 0,
      description: "Number of times this item appeared in search results"
    },
    searchClicks: {
      type: Number,
      default: 0,
      description: "Number of times this item was clicked from search"
    },
    popularityScore: {
      type: Number,
      default: 0,
      description: "Calculated popularity score based on various metrics"
    }
  },
}, { 
  timestamps: true,
  // Add text index for full-text search
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create text index for search optimization
foodCatalogue.index({ 
  name: 'text', 
  ingredients: 'text',
  searchKeywords: 'text'
});

// Create compound indexes for efficient filtering
foodCatalogue.index({ cuisineType: 1, isAvailable: 1 });
foodCatalogue.index({ restaurant: 1, isAvailable: 1 });
foodCatalogue.index({ 'price.amount': 1, 'price.currency': 1 });
foodCatalogue.index({ 'analytics.popularityScore': -1 });
foodCatalogue.index({ isFeatured: 1, 'analytics.popularityScore': -1 });

// Virtual for price range calculation
foodCatalogue.virtual('priceRange').get(function() {
  const amount = this.price?.amount || 0;
  if (amount <= 10) return '$';
  if (amount <= 25) return '$$';
  if (amount <= 50) return '$$$';
  return '$$$$';
});

// Pre-save middleware to auto-generate search keywords
foodCatalogue.pre('save', function(next) {
  if (this.isModified('name') || this.isModified('ingredients')) {
    const keywords = new Set();
    
    // Add name keywords
    if (this.name) {
      keywords.add(this.name.toLowerCase());
      // Add individual words from name
      this.name.toLowerCase().split(/\s+/).forEach(word => {
        if (word.length > 2) keywords.add(word);
      });
    }
    
    // Add ingredient keywords
    if (this.ingredients) {
      this.ingredients.forEach(ingredient => {
        keywords.add(ingredient.toLowerCase());
        ingredient.toLowerCase().split(/\s+/).forEach(word => {
          if (word.length > 2) keywords.add(word);
        });
      });
    }
    
    this.searchKeywords = Array.from(keywords);
  }
  next();
});

export default mongoose.models.FoodCatalogue ||
  model("FoodCatalogue", foodCatalogue);
