const mongoose = require("mongoose");
const validator = require("validator");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, minlength: 5 },
  tags: [{ type: String }],
});

const categoryModel = new mongoose.model("Category", categorySchema);

module.exports = categoryModel;
