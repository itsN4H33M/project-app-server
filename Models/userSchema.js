const mongoose = require("mongoose");

// install and import validator
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: [3, "Must be at least 3, got {VALUE}"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  profile: {
    type: String,
  },
});

// creating a model
const users = mongoose.model("users", userSchema);

module.exports = users;
