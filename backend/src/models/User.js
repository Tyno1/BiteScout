import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hometown: {
      type: String,
      // Add custom validator here
    },
    currentCity: {
      type: String,
    },
    country: {
      type: String,
      // Add custom validator here
    },
    picture: String,
    address: String,
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    userType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserType",
      required: true,
    },
    locale: {
      type: String,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    preferences: {
      type: Object,
      default: {},
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
