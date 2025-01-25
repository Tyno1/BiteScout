import mongoose from "mongoose";
// import bcrypt from 'bcrypt';
// import * as argon from 'argon2';
const argon = require("argon2");

const userSchema = new mongoose.Schema(
  {
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
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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
    imageUrl: String,
    address: String,
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    userType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserType",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      // this.password = await argon.hash(this.password);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.method.comparePassword = async function (candidatePassword) {
  try {
    // return await argon.verify(this.password, candidatePassword);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export default mongoose.models?.User || mongoose.model("User", userSchema);
