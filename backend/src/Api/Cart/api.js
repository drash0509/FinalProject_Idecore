const express = require("express");
const router = new express.Router();
const cartModel = require("./schema");
const ProductModel = require("../product/schema");
const UserModel = require("../User/schema");
// const auth = require("../authorization/user_auth");
const user_auth = require("../authorization/user_auth");

router.use(express.json());

router.post("/cart", user_auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const product = req.body.product;
    const quantity = req.body.quantity;
    const price = req.body.product.price;

    const subTotal = quantity * price;
    console.log("product : ", product);

    const userExists = await cartModel.findOne({ user: userId });
    console.log("userExists : ", userExists);

    if (userExists) {
      const existingItemIndex = userExists.items.findIndex(
        (item) => item.productId === req.body.product._id
      );

      console.log("existingItemIndex : ", existingItemIndex);
      if (existingItemIndex !== -1) {
        // If the product already exists in the cart, update quantity and subtotal
        userExists.items[existingItemIndex].quantity += quantity;
        userExists.items[existingItemIndex].subTotal =
          userExists.items[existingItemIndex].subTotal +
          quantity * req.body.product.price;
      } else {
        // If the product does not exist, add a new item
        userExists.items.unshift({
          image_url: req.body.product.image_url[0],
          productId: req.body.product._id,
          product: req.body.product.title,
          quantity: quantity,
          price: req.body.product.price,
          subTotal: subTotal,
        });
      }

      // Update total based on the updated or newly added item
      userExists.total = userExists.items.reduce((acc, item) => {
        return acc + item.subTotal;
      }, 0);

      const updatedUser = await userExists.save();

      return res.status(200).send({
        data: updatedUser,
        status: 200,
        message: "Cart updated successfully",
      });
    } else {
      // If the user does not exist, create a new entry
      const newCart = await cartModel({
        user: userId,
        items: [
          {
            image_url: req.body.product.image_url[0],
            productId: req.body.product._id,
            product: req.body.product.title,
            quantity: req.body.quantity,
            price: req.body.product.price,
            subTotal: subTotal,
          },
        ],
        total: subTotal, // Initial total based on the new item
      });

      console.log("savedCart : ", newCart);

      const savedCart = await newCart.save();

      return res.status(201).send({
        data: savedCart,
        status: 201,
        message: "Cart created successfully",
      });
    }
  } catch (e) {
    return res.status(500).send({
      data: e,
      status: 500,
      message: "Internal Server Error",
    });
  }
});

router.get("/cart", user_auth, async (req, res) => {
  try {
    const user = req.user;
    console.log("hii");
    console.log(user);

    const cartData = await cartModel.find({ user: user._id });
    console.log("cartData : ", cartData);

    if (user) {
      return res.status(200).send({
        data: cartData,
        status: 200,
        message: "data get succesfully",
      });
    } else {
      return res.status(400).send({
        data: null,
        status: 400,
        message: "user not found",
      });
    }
  } catch (e) {
    return res.status(400).send({
      data: e,
      status: 400,
      message: "erroe",
    });
  }
});

router.put("/cart/:id", user_auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    console.log(userId);
    console.log(productId);
    console.log(quantity);
    console.log(req.body);
    const cartItem = await cartModel.findOne({ user: req.user._id });
    console.log(cartItem.items[0]);

    if (!cartItem) {
      return res.status(404).send({
        data: null,
        status: 404,
        message: "Cart item not found",
      });
    }
    const itemToUpdate = cartItem.items.find(
      (item) => item.productId === productId
    );
    console.log("hiii");
    console.log(itemToUpdate);
    itemToUpdate.quantity = quantity;

    // Recalculate subtotal and total
    cartItem.items.forEach((item) => {
      item.subTotal = item.quantity * item.price;
    });
    cartItem.total = cartItem.items.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );

    console.log("cartItem : ", cartItem);
    // Save the updated cart
    await cartItem.save();
    return res.status(200).send({
      data: cartItem,
      status: 200,
      message: "done",
    });
  } catch (e) {
    return res.status(500).send({
      data: e,
      status: 500,
      message: "Internal Server Error",
    });
  }
});

// router.delete("/cart/:id", user_auth, async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const itemId = req.params.id;

//     const user = req.user;
//     // console.log(user);
//     const user1 = await cartModel.findOne({ user: user._id });
//     console.log(user1);
//     console.log("user1.items._id : ", user1.items[0]._id);
//     if (user1) {
//       const abc = user1.items.findIndex((item) => item._id === itemId);

//       console.log("existingItemIndex : ", abc);
//     }
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

router.delete("/cart/:id", user_auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;

    const userCart = await cartModel.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).send("Cart not found");
    }

    const existingItemIndex = userCart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (existingItemIndex === -1) {
      return res.status(404).send("Item not found in the cart");
    }

    // console.log("Existing item index:", existingItemIndex);

    // Now you can proceed with removing the item from the array and updating the total
    userCart.items.splice(existingItemIndex, 1);
    userCart.total = userCart.items.reduce(
      (acc, item) => acc + item.subTotal,
      0
    );

    // Save the updated cart
    const updatedCart = await userCart.save();

    return res.status(200).send({
      data: updatedCart,
      status: 200,
      message: "Item removed from the cart successfully",
    });
  } catch (e) {
    return res.status(500).send({
      data: e,
      status: 500,
      message: "Internal Server Error",
    });
  }
});

router.delete("/cart", user_auth, async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);

    const cartData = await cartModel.findOne({ user: user._id });
    // console.log(cartData);
    if (cartData) {
      // console.log("hoii");
      const deletionResult = await cartModel.deleteOne({ _id: cartData._id });
      // console.log("deletionResult : ", deletionResult);

      return res.status(200).send({
        status: 200,
        message: "Cart data deleted successfully",
      });
    } else {
      return res.status(404).send({
        status: 404,
        message: "Cart data not found for the user",
      });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
module.exports = router;
