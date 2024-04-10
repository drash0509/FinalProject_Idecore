const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  cuponName: { type: mongoose.Schema.Types.Mixed },
  price_limit: { type: Number },
  discount_limit: { type: Number },
  description: { type: String }, // Corrected typo in "description"
});

const discountModel = mongoose.model("Discount", discountSchema); // Removed 'new' keyword

module.exports = discountModel;
