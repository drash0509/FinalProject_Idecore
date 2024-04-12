const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/contactUs", (req, res) => {
  console.log(req.body);
});

module.exports = router;
