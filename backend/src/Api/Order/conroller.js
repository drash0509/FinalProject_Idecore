const axios = require("axios");
const auth = require("../authorization/user_auth");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const instance = require("../../conn");
const orederService = require("./service");

async function checkout(req, res, next) {
  console.log("in checkout ---- : ", req.body);
  try {
    const options = {
      amount: Number(req.body.calculateTotal * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: "Receipt no. 1",
      notes: {
        notes_key_1: "Tea, Earl Grey, Hot",
        notes_key_2: "Tea, Earl Grey… decaf.",
      },
    };
    // console.log("options : ", options);
    const order = await instance.orders.create(options);
    console.log("order : ", order);

    return res.send({
      data: order,
      status: 200,
      messge: "order created",
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function payment_verfication(req, res, next) {
  try {
    console.log(req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body.body.response;

    const verifyPayment = orederService.verify(
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature
    );

    const paymentDetails = await orederService.paymentDetails(
      razorpay_payment_id
    );
    console.log("paymentDetails : ", paymentDetails);

    const updateData = orederService.updateData(
      req.body.data,
      paymentDetails,
      razorpay_payment_id
    );

    if (updateData) {
      return res.status(200).json({
        message: "Payment verification successful",
        orderid: razorpay_order_id,
        paymentId: razorpay_payment_id,
      });
    } else {
      return res.status(400).json({
        message: "Payment verification was unsuccessful",
      });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = { checkout, payment_verfication };
