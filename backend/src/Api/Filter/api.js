const express = require("express");
const router = express.Router();
const productModel = require("../product/schema");
const categoryModel = require("../Category/schema");

router.use(express.json());

router.post("/filterByCategory", async (req, res) => {
  try {
    // console.log("hiii");
    // console.log("req.body.categoryFilter : ", req.body.categoryFilter);
    const categoryData = await categoryModel.findOne({
      name: req.body.categoryFilter,
    });
    let filterData = [];
    // console.log("categoryData : ", categoryData);
    if (categoryData) {
      filterData = await productModel.find({
        categoryId: categoryData._id,
      });
      console.log(filterData.length);
    } else {
      filterData = await productModel.find();
    }
    return res.send({
      data: filterData,
      status: 200,
      message: "filter By category",
    });
  } catch (e) {
    return res.send({
      data: e,
      status: 400,
      message: "error",
    });
  }
});

router.post("/filterByRating", async (req, res) => {
  try {
    // console.log("hiii");
    const filterData = await productModel.find({
      rating: { $gte: req.body.ratingFilter },
    });

    return res.send({
      data: filterData,
      status: 200,
      message: "filter By rating",
    });
  } catch (e) {
    return res.send({
      data: e,
      status: 400,
      message: "error",
    });
  }
});

router.post("/filterByPrice", async (req, res) => {
  try {
    console.log(req.body.sortPrice);
    if (req.body.sortPrice === "low-to-high") {
      console.log("hoiii");
      const products = await productModel.find().sort({ price: 1 });
      // console.log(products);
      return res.send({
        data: products,
        status: 200,
        message: "filter By rating",
      });
    } else if (req.body.sortPrice === "high-to-low") {
      console.log("hoiii");
      const products = await productModel.find().sort({ price: -1 });
      // console.log(products);
      return res.send({
        data: products,
        status: 200,
        message: "filter By rating",
      });
    } else {
      return res.send({
        data: null,
        status: 400,
        message: "error in filter By rating",
      });
    }
  } catch (e) {
    return res.send({
      data: e,
      status: 404,
      message: "error",
    });
  }
});

module.exports = router;
