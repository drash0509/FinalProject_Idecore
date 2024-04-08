const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const isValidURL = (url) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  print(urlPattern.test(url));
  return urlPattern.test(url);
};
// function isValidURL(url) {
//     const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
//     return urlPattern.test(url);
//   }

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
    minlength: 5,
  },

  img_url: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
      },
      message: "Invalid URL format",
    },
  },

  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: "price can not be negative",
    },
  },

  catagory: {
    type: String,
    required: true,
    trim: true,
  },

  stock_quantity: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: "stock quantity can not be negative",
    },
  },

  brand: {
    type: String,
    required: true,
    trim: true,
  },

  // reviews: {
  //   type: String,
  //   trim: true,
  //   minlength: 5,
  //   maxlength: 100,
  // },

  reviews: [
    {
      review: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
      },
      userId: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
      },
    },
  ],

  rating: {
    type: Number,
    validate: {
      validator: (value) => value > 0 && value < 6,
      message: "Rating should be between 1 and 5",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },

  updatedAt: {
    type: Date,
    default: Date.now,
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

productSchema.pre("findOneAndUpdate", function (next) {
  console.log("pre check ---", this._update);
  this._update.updatedAt = Date.now();
  next();
});

productSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      "atuhjiokbvdftghyujgdefghyjbcfhhgds"
    );
    // this.tokens = this.tokens.concat(token);
    this.tokens.push({ token });

    await this.save();
    return token;
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

const ProductModel = new mongoose.model("Product", productSchema);

module.exports = ProductModel;
