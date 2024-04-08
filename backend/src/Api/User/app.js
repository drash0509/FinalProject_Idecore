const express = require("express");
const router = express.Router();
const userModel = require("./schema");
const bcrypt = require("bcryptjs");
const auth = require("../authorization/user_auth");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const cartModel = require("../Cart/schema");

router.use(express.json());
// router.use(cookieParser());

router.post(
  "/register",
  [
    body("name", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("email", "Invalid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const password = req.body.password;
      const cpassword = req.body.confirm_password;
      const username = req.body.username;
      const isPresent = await userModel.findOne({ username: username });
      if (isPresent) {
        res.status(404).send({ message: "User already exists" });
      } else {
        if (cpassword === password) {
          const userData = new userModel({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: password,
          });
          console.log("userData : ", userData);
          const registerd = await userData.save();
          console.log("registerd : ", registerd);
          if (registerd) {
            res.status(201).send(registerd);
          } else {
            res.status(404).send("Enter a data");
          }
        }
      }
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

// router.get(
//   "/login",
//   // [
//   //   body("username", "Enter a user name").exists(),
//   //   body("password", "Password is required").exists(),
//   // ],
//   async (req, res) => {
//     try {
//       // const errors = validationResult(req);
//       // if (!errors.isEmpty()) {
//       //   console.log(errors);
//       //   return res.status(400).json({ errors: errors.array() });
//       // }
//       // console.log(req.query.data);
//       res.cookie("user", "Ayushi");
//       console.log("gmbmkjgn");
//       res.send("hbfvyufr");
//     } catch (e) {
//       res.status(400).send(e);
//     }
//   }
// );

router.post(
  "/login",
  [
    body("username", "Enter a user name").exists(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ errors: errors.array() });
      }
      const username = req.body.username;
      const password = req.body.password;

      console.log(username + " " + password);
      const user = await userModel.findOne({ username: username });

      if (!user) {
        return res.send({ code: 404, message: "Enter valid user" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch) {
        return res.send({ code: 404, message: "Enter valid password" });
      }
      const token1 = await user.genrateAuthToken();
      console.log("token1 : ", token1);

      if (isMatch === true && user !== null) {
        return res.send({
          status: 200,
          message: "Login succesful",
          token: token1,
        });
      }
    } catch (e) {
      res.status(400).send(e);
    }
  }
);

router.get(
  "/register",
  [
    body("username", "Enter a valid user name").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const userData = await userModel.find();
      if (userData) {
        res.status(200).send(userData);
      } else {
        res.status(400).send();
      }
    } catch (e) {
      res.status(404).send(e);
    }
  }
);

router.delete("/logout", auth, async (req, res) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1]; // Split by space and get the second part
    }
    const user = req.user;
    user.tokens = user.tokens.filter(
      (tokens) => tokens.token.toString() !== token.toString()
    );
    await user.save();

    res.send({
      data: null,
      status: 200,
      message: "logout successfully",
    });
  } catch (error) {
    return res.send({
      data: e,
      status: 404,
      message: "error",
    });
  }
});

router.delete("/delete_account", auth, async (req, res) => {
  try {
    // console.log(req.user._id);
    const user = await userModel.findByIdAndDelete(req.user._id);
    const cartData = await cartModel.find({ user: req.user._id });
    const deleteCart = await cartModel.findByIdAndDelete(cartData[0]._id);

    return res.send({
      data: null,
      status: 200,
      message: "delete account successfully",
    });
  } catch (error) {
    res.send({
      data: e,
      status: 404,
      message: "error",
    });
  }
});

router.put("/payment_details", auth, async (req, res) => {
  try {
    console.log("hii");
    console.log(req.body);
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.send("not a valid user");
    }

    console.log("req.body.address : ", req.body.address);

    user.address = req.body.address;

    user.number = req.body.number;
    console.log(user);
    await user.save();

    return res.send({
      data: user,
      stats: 200,
      message: "update succesfully",
    });
  } catch (e) {
    return res.send({
      data: e,
      status: 404,
      message: "error",
    });
  }
});

module.exports = router;
