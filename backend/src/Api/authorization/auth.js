const jwt = require("jsonwebtoken");
const sellerModel = require("../Seller_user/schema");
const { json } = require("express");
const { log } = require("console");
// hii drashti

const auth = async (req, res, next) => {
  try {
    // const token = req.cookies.jwt;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send("Unauthorized: Token not provided");
    }

    // const secretKey = "atuhjiokbvdftghyujgdefghyjbcfhhgds";
    const verifyUser = jwt.verify(
      token.replace("Bearer ", ""),
      "atuhjiokbvdftghyujgdefghyjbcfhhgds"
    );
    // console.log("verifyUser : ", verifyUser);

    const user = await sellerModel.findByIdAndUpdate({ _id: verifyUser._id });
    // console.log("user : ", user);
    if (!user) {
      res.status(400).send("you are not authenticate");
    }
    // console.log("vrfcd");
    req.token = token;
    req.user = user;
    next();
    // console.log("vrfcd");
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = auth;
