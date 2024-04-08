const jwt = require("jsonwebtoken");
const UserModel = require("../User/schema");
const { json } = require("express");
const { log } = require("console");

const user_auth = async (req, res, next) => {
  try {
    console.log("welcome");
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      return res.status(401).send("Unauthorized: Token not provided");
    }
    // console.log("token : ", token);

    const secretKey = "atuhjiokbvdftghyujgdefghyjbcfhhgds";
    const verifyUser = jwt.verify(
      token.replace("Bearer ", ""),
      "atuhjiokbvdftghyujgdefghyjbcfhhgds"
    );

    const user = await UserModel.findById(verifyUser._id);
    // console.log(user);
    if (!user) {
      res.status(400).send("First log in");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports = user_auth;
