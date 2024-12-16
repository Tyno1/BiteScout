const mongoose = require("mongoose");
const { Schema, model } = mongoose;

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
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  cuisine: {
    type: [String],
    required: true,
  },
  priceRange: {
    type: String,
    required: true,
    enum: ["$", "$$", "$$$", "$$$$"],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^\+?[\d\s-()]+$/,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  website: {
    type: String,
    required: true,
  },
  businessHours: {
    type: [BusinessHourSchema],
    required: true,
  },
  features: {
    type: [String],
    enum: [
      "Outdoor seating",
      "Dining area",
      "Take-out",
      "Delivery",
      "Catering",
      "Wifi",
      "Parking",
    ],
  },
  gallery: {
    type: [String],
    required: true,
  },
  meta: {
    type: Object,
  }, 
});

module.exports = model("RestaurantData", restaurantData);