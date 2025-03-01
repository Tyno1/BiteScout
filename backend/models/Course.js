import mongoose from "mongoose";

const course = new mongoose.Schema({
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

export default mongoose.models.Course || mongoose.model("Course", course);
