const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const productModel = require("../product/schema");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is wrong");
      }
    },
  },

  username: {
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  confirm_password: {
    type: String,
    // required: true,
  },

  number: {
    type: String,
  },

  address: {
    type: String,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

  favData: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],
});

userSchema.methods.genrateAuthToken = async function () {
  try {
    // console.log("heeee");
    const token = jwt.sign(
      { _id: this._id.toString() },
      "atuhjiokbvdftghyujgdefghyjbcfhhgds"
    );
    // this.tokens = this.tokens.concat({ token: token });
    this.tokens = this.tokens.concat({ token: token });

    await this.save();
    return token;
  } catch (e) {
    res.send(e);
    console.log(e);
  }
};

userSchema.pre("save", async function (next) {
  // console.log("hiiii");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    // this.confirm_password = await bcrypt.hash(this.confirm_password, 10);

    // this.confirm_password = undefined;
  }
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
