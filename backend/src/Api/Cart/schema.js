const mongoose = require("mongoose");
const validator = require("validator");
const ProductModel = require("../product/schema");
const registrationModel = require("../User/schema");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      image_url: { type: String },
      productId: {
        type: String,
        ref: ProductModel,
        // required: true,
      },

      product: {
        type: mongoose.Schema.Types.Mixed,
        ref: "Product",
        // required: true,
      },

      quantity: {
        type: Number,
        default: 1,
        required: true,
        validate: {
          validator: (value) => value > 0,
          message: "Quantity can not be negative",
        },
      },

      price: {
        type: Number,
        default: 1,
        required: true,
        validate: {
          validator: (value) => value > 0,
          message: "price can not be negative",
        },
      },

      subTotal: {
        type: Number,
        // ref: ProductModel,
        // required: true,
      },
    },
  ],

  total: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const cartModel = new mongoose.model("Cart", cartSchema);

module.exports = cartModel;
