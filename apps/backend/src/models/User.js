import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      validate: {
        validator: (v) => {
          // Allow null/undefined (sparse) or non-empty strings
          return v === null || v === undefined || v.trim().length > 0;
        },
        message: 'Username cannot be empty. Use null/undefined to remove username.'
      }
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => {
          // Allow null/undefined or non-empty strings
          return v === null || v === undefined || v.trim().length > 0;
        },
        message: 'Phone number cannot be empty. Use null/undefined to remove phone number.'
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

// Password hashing before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  
  // Convert empty strings to null for sparse fields
  if (this.phone === "") {
    this.phone = null;
  }
  if (this.username === "") {
    this.username = null;
  }
  
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Pre-update hook to handle empty strings for sparse fields
userSchema.pre("findOneAndUpdate", function(next) {
  const update = this.getUpdate();
  
  if (update.phone === "") {
    update.phone = null;
  }
  if (update.username === "") {
    update.username = null;
  }
  
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
