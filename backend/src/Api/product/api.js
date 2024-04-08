const express = require("express");
const router = new express.Router();
const ProductModel = require("./schema");
const auth = require("../authorization/auth");
const categoryModel = require("../Category/schema");
const userModel = require("../User/schema");
const sellerModel = require("../Seller_user/schema");
const cartModel = require("../Cart/schema");
const jwt = require("jsonwebtoken");
const uploadMultiple = require("../../helper/multer");
const { default: mongoose } = require("mongoose");

// router.use(auth);

router.post(
  "/product",
  auth,
  uploadMultiple,
  // multer.multiple("image_url"),
  async (req, res) => {
    try {
      console.log(req.body);
      console.log("image  : ", req.user, req.body.category);
      const categoryData = await categoryModel.findOne({
        name: req.body.category,
      });
      console.log("categoryData : ", categoryData);
      console.log("imagdsdse : ", req, req.file, req.files);
      const product = await ProductModel({
        // categoryName: req.body.category,
        title: req.body.title,
        description: req.body.description,
        image_url: req.files.map((item) => item.filename),
        price: req.body.price,
        stocks: req.body.stocks,
        categoryId: categoryData._id,
        userId: req.user._id,
      });

      const productData = await product.save();
      console.log("productData : ", productData);
      return res.status(201).send({
        data: null,
        status: 200,
        message: "product saved successfully.",
      });
    } catch (e) {
      console.log("error : ", e.message);
      return res.status(401).send(e);
    }
  }
);

router.get("/seller_product", auth, async (req, res) => {
  // console.log(req.user);

  const productData = await ProductModel.find({ userId: req.user._id });
  // console.log(productData);

  if (!productData) {
    return res.send({
      data: null,
      status: 200,
      message: "No products available",
    });
  }

  return res.send({
    data: productData,
    status: 200,
    message: "products",
  });
});

router.get("/product", async (req, res) => {
  try {
    console.log("test ");
    const productData = await ProductModel.find();
    if (productData) {
      return res.status(200).send({
        data: productData,
        status: 200,
        message: "product found successfully.",
      });
    } else {
      return res.status(400).send({
        data: null,
        status: 400,
        message: "product is not exist.",
      });
    }
  } catch (e) {
    return res.status(401).send(e);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log("_id : " + _id);

    const productData = await ProductModel.findById(_id);
    console.log("productData : ", productData);

    if (!productData) {
      return res.status(400).send({
        data: null,
        status: 400,
        message: "product is not exist.",
      });
    }

    const token = req.headers.authorization;
    console.log(token);

    if (!token || token === "Bearer undefined") {
      const responseData = {
        productData: productData,
        isitemExists: false, // Add any additional values you need
      };
      return res.status(200).send({
        data: responseData,
        status: 200,
        message: "product found successfully.",
      });
    } else {
      const verifyUser = jwt.verify(
        token.replace("Bearer ", ""),
        "atuhjiokbvdftghyujgdefghyjbcfhhgds"
      );

      // console.log("verifyUser : ", verifyUser);

      const userData = await userModel.findById(verifyUser._id);
      // console.log("userData : ", userData);

      const itemExists = userData.favData.some(
        (item) => item.product.toString() === _id
      );

      console.log(itemExists);

      if (productData && itemExists === true) {
        const responseData = {
          productData: productData,
          isitemExists: true, // Add any additional values you need
        };
        return res.status(200).send({
          data: responseData,
          status: 200,
          message: "product found successfully.",
        });
      } else {
        const responseData = {
          productData: productData,
          isitemExists: false, // Add any additional values you need
        };

        return res.status(200).send({
          data: responseData,
          status: 200,
          message: "product found successfully.",
        });
      }

      // if (productData && itemExists) {

      // }
    }
  } catch (e) {
    res.status(401).send(e);
  }
});

router.put("/product/:id", auth, uploadMultiple, async (req, res) => {
  try {
    // console.log("req.body : ", req.body);
    const cName = await categoryModel.findOne({ name: req.body.category });

    if (!cName) {
      return res.status(404).send("Category not found");
    }

    console.log("req.body.image : ", req.body.image);
    const images = req.body.image;

    images.forEach((image, index) => {
      console.log(`Image ${index} path:`, image);
    });

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        $push: { image_url: { $each: req.files.map((file) => file.filename) } },
        price: req.body.price,
        stocks: req.body.stocks,
        categoryId: cName._id,
        userId: req.user._id,
      },
      {
        new: true,
      }
    );

    console.log("updatedProduct : ", updatedProduct);

    // const updatedData = await updatedProduct.save();
    // console.log("updatedData : ,", updatedData);

    if (!updatedProduct) {
      return res.status(400).send({
        data: null,
        status: 400,
        message: "product is not exist.",
      });
    }
    return res.status(200).send({
      data: updatedProduct,
      status: 200,
      message: "product found successfully.",
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/product/:id", auth, async (req, res) => {
  try {
    console.log("_______________________________515");

    console.log(req.params.id);
    const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
    const userData = await userModel.find();

    userData.forEach(async (item) => {
      item.favData = item.favData.filter((data) => {
        return data.product.toString() !== req.params.id.toString();
      });
      await item.save();
    });

    const CartData = await cartModel.find();

    CartData.forEach(async (data) => {
      data.items = data.items.filter((item) => {
        return item.productId.toString() !== req.params.id.toString();
      });

      data.total = data.items.reduce((acc, item) => acc + item.subTotal, 0);
      await data.save();
    });

    // console.log("userData : ", userData);

    console.log("_______________________________");
    if (!deleteProduct) {
      return res.status(400).send({
        data: null,
        status: 400,
        message: "product is not exist.",
      });
    } else {
      return res.status(200).send({
        data: deleteProduct,
        status: 200,
        message: "product found successfully.",
      });
    }
  } catch (e) {
    return res.status(200).send({
      data: deleteProduct,
      status: 200,
      message: "product found successfully.",
    });
  }
});
module.exports = router;
