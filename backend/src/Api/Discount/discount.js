const express = require("express");
const router = express.Router();
const discountModel = require("./schema");

router.post("/discount", async (req, res) => {
  try {
    const dicountData = await discountModel({
      cuponName: req.body.cuponName,
      price_limit: req.body.price_limit,
      discount_limit: req.body.discount_limit,
      description: req.body.description,
    });

    console.log("dicountData : ", dicountData);
    await dicountData.save();

    return res.send({
      data: null,
      status: 200,
      massage: "discount cupon added",
    });
  } catch (e) {
    return res.send({
      data: e,
      status: 400,
      massage: "error",
    });
  }
});

router.get("/discount", async (req, res) => {
  try {
    const dicountData = await discountModel.find();
    console.log("dicountData : ", dicountData);

    return res.send({
      data: dicountData,
      status: 200,
      message: "discount data",
    });
  } catch (e) {
    return res.send({
      data: e,
      status: 200,
      message: "Error",
    });
  }
});

module.exports = router;
