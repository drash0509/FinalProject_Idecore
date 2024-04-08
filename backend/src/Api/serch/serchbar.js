const express = require("express");
const router = express.Router();
const productModel = require("../product/schema");
const categoryModel = require("../Category/schema");

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log(query);

    const productData = await productModel.find({
      title: { $regex: query, $options: "i" },
    });

    console.log(productData);
    const categoryId = await categoryModel.find({
      name: { $regex: query, $options: "i" },
    });

    console.log(categoryId);
    const categoryData = await productModel.find({
      categoryId: categoryId[0]._id,
    });
    console.log("categoryData: ", categoryData);

    const combinedData = [...productData];
    categoryData.forEach((category) => {
      const isDuplicate = combinedData.some(
        (item) => item._id.toString() === category._id.toString()
      );
      if (!isDuplicate) {
        combinedData.push(category);
      }
    });

    if (!productData && !categoryData) {
      return res.send({
        data: [],
        status: 200,
        message: "No product available",
      });
    }
    if (productData && !categoryData) {
      return res.send({
        data: productData,
        status: 200,
        message: "Serch product",
      });
    }
    if (!productData && categoryData) {
      return res.send({
        data: categoryData,
        status: 200,
        message: "Serch product",
      });
    }
    if (productData && categoryData) {
      return res.send({
        data: combinedData,
        status: 200,
        message: "Serch product",
      });
    }
  } catch (e) {
    return res.send({
      data: e,
      status: 404,
      message: "Error",
    });
  }
});
module.exports = router;
