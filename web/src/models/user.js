const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");
const { encryptionPlugin } = require("../utils/encryption");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
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
  // remember to set up service to validate hometown, currency, country
  hometown: {
    type: String,
    required: true,
  },
  currentCity: { 
    type: String,
    required: true,
  },
  country:{
    type: String,
    required: true,
  }
  ,
  hashedEmail: {
    type: String,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
  address: {
    type: String,
  },
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
    type: Schema.Types.ObjectId,
    ref: "UserType",
    required: true,
  },
});

userSchema.plugin(encryptionPlugin, {
  fields: ["username", "name", "phone", "firstName", "lastName"],
});

// Password hashing before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchema);

module.exports = User;
