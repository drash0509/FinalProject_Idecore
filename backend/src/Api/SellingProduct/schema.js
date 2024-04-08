const mongoose = require("mongoose");
const sellerModel = require("../Seller_user/schema");
const productModel = require("../product/schema");

const sellingProductSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller_registration",
  },

  sellingProduct: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },

      quantity_sold: {
        type: Number,
      },

      saleDate: {
        type: Date, // Correct type for date field
        default: Date.now,
      },
    },
  ],

  // totalQuantity: Number,
});

const sellingProductModel = mongoose.model(
  "Selling_product",
  sellingProductSchema
);

module.exports = sellingProductModel;
