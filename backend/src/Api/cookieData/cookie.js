const express = require("express");
const router = express.Router();
const auth = require("../authorization/user_auth");
const userModel = require("../User/schema");
const cartModel = require("../Cart/schema");
const mongoose = require("mongoose"); // Import mongoose

router.post("/cookieData", auth, async (req, res) => {
  try {
    console.log("hiii");
    const user = req.user;
    console.log(req.body);
    const cartCookie = req.body.cartCookie;
    const favCookie = req.body.favCookie;

    if (favCookie) {
      favCookie.forEach((item) => {
        if (!user.favData.some((favItem) => favItem.product.equals(item._id))) {
          user.favData.push({ product: new mongoose.Types.ObjectId(item._id) });
        }
      });
      await user.save();
    }

    if (cartCookie) {
      // Check if the user already has a cart
      let userCart = await cartModel.findOne({ user: user._id });

      if (!userCart) {
        // If the user doesn't have a cart, create a new one
        userCart = new cartModel({
          user: user._id,
          items: [],
          total: 0,
        });
      }
      console.log("userCart : ", userCart);

      // Loop through cartCookie items
      for (const item of cartCookie) {
        const subtotal = item.quantity * item.price;

        // Check if the item already exists in the cart
        const existingItemIndex = userCart.items.findIndex(
          (cartItem) => cartItem.productId === item._id
        );

        if (existingItemIndex !== -1) {
          // If the item exists, update its quantity and subtotal
          userCart.items[existingItemIndex].quantity += item.quantity;
          userCart.items[existingItemIndex].subTotal += subtotal;
        } else {
          // If the item is new, add it to the cart
          userCart.items.push({
            image_url: item.image_url[0],
            productId: item._id,
            product: item.title,
            quantity: item.quantity,
            price: item.price,
            subTotal: subtotal,
          });
        }
      }

      // Calculate the total price of the cart
      userCart.total = userCart.items.reduce(
        (total, item) => total + item.subTotal,
        0
      );
      const asd = await userCart.save();
    }

    return res.send({
      data: "done",
      status: 200,
      message: "done",
    });
  } catch (e) {
    console.error("Error saving userCart:", e);
    return res.send({
      data: e,
      status: 200,
      message: "done",
    });
    // Log any errors that occur during the save operation
    // return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
