import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

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
  ownerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
    trim: true,
  },
  cuisine: {
    type: [String],
  },
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
  },
  meta: {
    type: Object,
  },
});

export default mongoose.models.RestaurantData || model("RestaurantData", restaurantData);
