import mongoose from "mongoose";

const cuisineType = new mongoose.Schema({
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

export default mongoose.models.CuisineType ||
  mongoose.model("CuisineType", cuisineType);
