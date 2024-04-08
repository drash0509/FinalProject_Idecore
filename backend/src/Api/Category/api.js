const categoryModel = require("./schema");
const express = require("express");
const router = express.Router();

router.post("/category", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await categoryModel(req.body);
    const creatUser = await user.save();
    return res.send({
      data: user,
      code: 200,
      message: "saved succesfully",
    });
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});
router.get("/category", async (req, res) => {
  try {
    // console.log(req.query);
    // console.log("hiii");
    const categories = await categoryModel.find();
    // console.log(categories);
    return res.send({
      data: categories,
      code: 200,
      message: "get successfully",
    });
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});

router.get("/category/:categoryId", async (req, res) => {
  try {
    console.log(req.params.categoryId);
    const user = await categoryModel.findById(req.params.categoryId);
    console.log(user);
    return res.send({
      data: user,
      code: 200,
      message: "get succesfully",
    });
    op;
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});

router.patch("/category/:id", async (req, res) => {
  try {
    const user = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send({
      data: user,
      code: 200,
      message: "update succesfully",
    });
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});

router.delete("/category/:id", async (req, res) => {
  try {
    const user = await categoryModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.send({
        data: user,
        code: 400,
        message: "category not found",
      });
    } else {
      return res.send({
        data: user,
        code: 200,
        message: "delete succesfully",
      });
    }
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});
module.exports = router;
