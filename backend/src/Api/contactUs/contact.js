const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const controler = require("./emailController");

router.route("/contactUs").post(controler.emailsending);

module.exports = router;
