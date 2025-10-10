import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: (v) => {
          // Allow empty strings or non-empty strings
          return v === "" || v.trim().length > 0;
        },
        message: 'Username cannot be empty. Use empty string to remove username.'
      }
    },
    phone: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: (v) => {
          // Allow empty strings or non-empty strings
          return v === "" || v.trim().length > 0;
        },
        message: 'Phone number cannot be empty. Use empty string to remove phone number.'
      }
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
    // New fields for better user management
    lastLogin: { type: Date, default: null },
    loginCount: { type: Number, default: 0 },
    timezone: { type: String, default: 'UTC' },
    twoFactorEnabled: { type: Boolean, default: false },
    failedLoginAttempts: { type: Number, default: 0 },
    isLocked: { type: Boolean, default: false },
    lastActivity: { type: Date, default: null },
    theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' },
    language: { type: String, default: 'en' },
  },
  { timestamps: true }
);

userSchema.index({ "location.geo": "2dsphere" }); // for location-based queries, e.g near me

// Create a partial unique index for username that only applies to non-empty values
userSchema.index(
  { username: 1 }, 
  { 
    unique: true, 
    partialFilterExpression: { 
      username: { $exists: true, $ne: "" } 
    } 
  }
);

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

// Pre-update hook removed - empty strings are now allowed

export default mongoose.models.User || mongoose.model("User", userSchema);
