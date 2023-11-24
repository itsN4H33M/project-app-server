const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  languages: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  projectImage: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
});

// creating a model
const projects = mongoose.model("projects", projectSchema);

module.exports = projects;
