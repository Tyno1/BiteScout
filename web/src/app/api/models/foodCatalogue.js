const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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

const foodCatalogueSchema = new Schema({
  foodName: {
    type: String,
    required: true,
    trim: true,
  },
  ingredents: {
    type: [String],
    required: true,
  },
  cuisineTypes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cuisineType",
    required: true,
  },
  allergens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "allergen",
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },

  price: {
    type: PriceSchema,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

module.exports = model("FoodCatalogue", foodCatalogueSchema);
