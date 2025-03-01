import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    imageUrl: String,
    address: String,
    password: {
      type: String,
      required: function () {
        return this.loginMethod === "credentials";
      },
    },
    loginMethod: {
      type: String,
      enum: ["credentials", "oauth"],
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

// Password hashing before saving the user
userSchema.pre("save", async function (next) {
  if (
    this.loginMethod === "credentials" &&
    (this.isModified("password") || this.isNew)
  ) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
