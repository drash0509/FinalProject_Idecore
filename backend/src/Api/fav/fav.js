const express = require("express");
const router = express.Router();
const userModel = require("../User/schema");
const productModel = require("../product/schema");
const auth = require("../authorization/user_auth");

router.post("/fav/", auth, async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.id;
    const user = req.user;
    // console.log(user);

    if (!user) {
      return res
        .status(400)
        .send({ data: null, status: 400, message: "user not found" });
    }

    const isFavorite = user.favData.some(
      (item) => item.product.toString() === id
    );
    console.log("isFavorite :");

    if (isFavorite) {
      // Remove the product ID from favorites
      user.favData = user.favData.filter(
        (item) => item.product.toString() !== id
      );
    } else {
      // Add the product ID to favorites
      user.favData.push({ product: id });
    }

    await user.save();

    console.log(user);

    return res.status(200).send({
      status: 200,
      message: "Product added to favorites successfully",
      data: user,
    });
  } catch (e) {
    return res.status(404).send({
      data: e,
      status: 404,
      message: "error",
    });
  }
});

router.get("/fav", auth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(200).send({
        data: null,
        status: 400,
        message: "first log in",
      });
    }

    const favoriteProducts = await Promise.all(
      user.favData.map(async (item) => {
        const productData = await productModel.findById(item.product);
        return productData;
      })
    );

    console.log("favoriteProducts : ", favoriteProducts);

    return res.status(200).send({
      data: favoriteProducts,
      status: 200,
      message: "favrouite data",
    });
  } catch (e) {
    return res.status(200).send({
      data: null,
      status: 404,
      message: "error",
    });
  }
});

router.delete("/fav/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { $pull: { favData: { product: id } } },
      { new: true }
    );

    const data = updatedUser.save();

    return res.status(200).send({
      status: 200,
      message: "Product removed from favorites successfully",
      data: data,
    });
  } catch (e) {
    return res.status(404).send({
      data: e,
      status: 404,
      message: "Error",
    });
  }
});

module.exports = router;
