const express = require("express");
const router = express.Router();
const auth = require("../authorization/user_auth");
const ratingController = require("./controller");

router.route("/review/:id").post(auth, ratingController.createReview);

router.route("/rating/:id").post(auth, ratingController.createRating);

module.exports = router;
