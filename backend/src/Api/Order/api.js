const express = require("express");
const router = new express.Router();
const orderModel = require("./schema");
const auth = require("../authorization/user_auth");
const seller_auth = require("../authorization/auth");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const orderController = require("./conroller");

router.route("/checkout").post(auth, orderController.checkout);

router.route("/paymentVerification").post(orderController.payment_verfication);

router.route("/get_user_order").get(auth, orderController.get_user_order);

router
  .route("/get_seller_order")
  .get(seller_auth, orderController.get_seller_order);

module.exports = router;
