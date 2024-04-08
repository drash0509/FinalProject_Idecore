const mongoose = require("mongoose");
const Razorpay = require("razorpay");

require("dotenv").config({ path: "./Api/config/config.env" });

mongoose
  .connect("mongodb://127.0.0.1:27017/idecore")
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// console.log("RAZOR_PAY_KEY:", process.env.RAZOR_PAY_KEY); // Log RAZOR_PAY_KEY value

const instance = new Razorpay({
  key_id: "rzp_test_SAgvhvFFYMzPAp",
  key_secret: "yE8s1lQinqDsAp3NgvEfak7a",
});

module.exports = instance;
