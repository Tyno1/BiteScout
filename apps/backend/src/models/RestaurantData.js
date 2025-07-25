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

const DeliveryLinkSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  platform: {
    type: String,
    required: true,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });



const restaurantData = new Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    trim: true,
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
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  businessHours: {
    type: [BusinessHourSchema],
  },
  deliveryLinks: {
    type: [DeliveryLinkSchema],
  },
  gallery: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
    },
  ],
  features: {
    type: [String],
  },
}, { timestamps: true });

export default mongoose.models.RestaurantData ||
  model("RestaurantData", restaurantData);
