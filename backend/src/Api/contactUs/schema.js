const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const contactUsModel = mongoose.model("ContactUs", contactUsSchema);

module.exports = contactUsModel;
