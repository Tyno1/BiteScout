import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    imageUrl: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: 200,
    },
    dietaryPreferences: {
      type: [String], // e.g., ['vegan', 'gluten-free']
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userType: {
      type: String,
      enum: ["guest", "user", "admin", "moderator", "root"],
      default: "user",
      required: true,
    },
    location: {
      city: String,
      country: String,
      geo: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          default: [0, 0],
        },
      },
    },
    savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followedRestaurants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    ],
    notificationSettings: {
      likes: { type: Boolean, default: true },
      follows: { type: Boolean, default: true },
      restaurantUpdates: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

userSchema.index({ "location.geo": "2dsphere" }); // for location-based queries, e.g near me

// Password hashing before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
