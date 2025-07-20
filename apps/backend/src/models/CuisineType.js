import mongoose, { Schema, model } from "mongoose";

const cuisineType = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

export default mongoose.models.CuisineType || model("CuisineType", cuisineType);
