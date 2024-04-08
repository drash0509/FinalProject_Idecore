const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const sellerSchema = new mongoose.Schema({
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

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

sellerSchema.methods.genrateAuthToken = async function () {
  try {
    console.log("heeee");
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

sellerSchema.pre("save", async function (next) {
  // console.log("hiiii");
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const sellerModel = mongoose.model("Seller_registration", sellerSchema);

module.exports = sellerModel;
