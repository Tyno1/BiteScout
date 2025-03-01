import mongoose from "mongoose";

const allergenSchema = new mongoose.Schema({
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

export default mongoose.models.Allergen ||
  mongoose.model("Allergen", allergenSchema);
