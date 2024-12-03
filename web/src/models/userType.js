const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userTypeSchema = new Schema({
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

const UserType = model("UserType", userTypeSchema);

module.exports = UserType;
