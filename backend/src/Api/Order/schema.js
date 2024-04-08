const mongoose = require("mongoose");
const validator = require("validator");
const cron = require("node-cron");
const UserModel = require("../User/schema");

// Define the order schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User schema for user information
    // required: true,
  },
  address: {
    type: String,
  },
  contact_no: {
    type: String,
    validate: {
      validator: function (value) {
        // Using validator library to check if it's a valid phone number
        return validator.isMobilePhone(value, "any", { strictMode: false });
      },
    },
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
      },
      quantity: {
        type: Number,
      },
    },
  ],
  order_id: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  card_id: { type: String },
  bank: { type: String },
  wallet: { type: String },
  vpa: { type: String },
  payment_id: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  payment_method: { type: String, required: true },
  departure_time: {
    type: Date,
    required: true,
    default: function () {
      // Get the current date
      const currentDate = new Date();

      // Add one minute to the current date
      const departureDate = new Date(currentDate);
      departureDate.setMinutes(currentDate.getMinutes() + 1);

      // Return the departure date
      return departureDate;
    },
  },
});

// Define a function to update order statuses to "completed" after 1 minute
const updateOrderStatuses = async () => {
  try {
    const currentTime = new Date();
    const ordersToUpdate = await orderModel.find({
      status: "pending", // Only update orders with status "pending"
      departure_time: { $lte: currentTime }, // Departure time should be less than or equal to current time
    });

    for (const order of ordersToUpdate) {
      order.status = "completed";
      await order.save();
    }
  } catch (error) {
    console.error("Error updating order statuses:", error);
  }
};

// Schedule the update function to run every minute
cron.schedule("* * * * *", updateOrderStatuses); // Runs every minute

// Create the Order model
const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
