import mongoose from "mongoose";

const userTypeSchema = new mongoose.Schema({
  name: {
    type: String, // Root, Admin or User
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default  mongoose.models.UserType || mongoose.model("UserType", userTypeSchema);


