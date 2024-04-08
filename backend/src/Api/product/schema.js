const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const UserModel = require("../User/schema");

const productSchema = new mongoose.Schema({
  categoryName: { type: String },
  title: { type: String },
  description: { type: String, minlength: 5 },
  image_url: [{ type: String }],
  price: {
    type: Number,
    validate: {
      validator: (value) => value > 0,
      message: "price can not be negative",
    },
  },
  reviews: [
    {
      name: {
        type: String,
      },
      review: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
      },
    },
  ],
  ratings: [
    {
      name: {
        type: String,
      },
      rating: {
        type: Number,
        default: 5,
        validate: {
          validator: (value) => value > 0 && value < 6,
          message: "Rating should be between 1 and 5",
        },
      },
    },
  ],
  stocks: {
    type: Number,
    validate: {
      validator: (value) => value > 0,
      message: "stocks can not be negative",
    },
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true, // Reference to the User model (registration collection)
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = new mongoose.model("Product", productSchema);

module.exports = ProductModel;

// const productSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   description: {
//     type: String,
//     trim: true,
//     minlength: 5,
//   },

//   img_url: {
//     type: String,
//     required: true,
//     validate: {
//       validator: function (value) {
//         return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
//       },
//       message: "Invalid URL format",
//     },
//   },

//   price: {
//     type: Number,
//     required: true,
//     validate: {
//       validator: (value) => value > 0,
//       message: "price can not be negative",
//     },
//   },

//   category: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   stock_quantity: {
//     type: String,
//     required: true,
//     validate: {
//       validator: (value) => value > 0,
//       message: "stock quantity can not be negative",
//     },
//   },

//   brand: {
//     type: String,
//     required: true,
//     trim: true,
//   },

//   // reviews: {
//   //   type: String,
//   //   trim: true,
//   //   minlength: 5,
//   //   maxlength: 100,
//   // },

//   // reviews: [
//   //   {
//   review: {
//     type: String,
//     trim: true,
//     minlength: 5,
//     maxlength: 100,
//   },

//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Registration",
//     required: true, // Reference to the User model (registration collection)
//   },
//   // },
//   // ],

//   rating: {
//     type: Number,
//     validate: {
//       validator: (value) => value > 0 && value < 6,
//       message: "Rating should be between 1 and 5",
//     },
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now, // Set the default value to the current date and time
//   },

//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },

//   // tokens: [
//   //   {
//   //     token: {
//   //       type: String,
//   //       required: true,
//   //     },
//   //   },
//   // ],
// });

// // productSchema.pre("save", async function (next) {
// //   if (this.isModified("password")) {
// //     this.password = await bcrypt.hash(this.password, 10);
// //     // this.confirm_password = await bcrypt.hash(this.confirm_password, 10);

// //     this.confirm_password = undefined;
// //   }
// //   next();
// // });

// productSchema.methods.generateAuthToken = async function () {
//   try {
//     const token = jwt.sign(
//       { _id: this._id.toString() },
//       "atuhjiokbvdftghyujgdefghyjbcfhhgds"
//     );
//     this.tokens = this.tokens.concat(token);
//     // this.tokens.push({ token });

//     await this.save();
//     return token;
//   } catch (e) {
//     console.log(e);
//     res.send(e);
//   }
// };

// productSchema.pre("findOneAndUpdate", function (next) {
//   console.log("pre check ---", this._update);
//   this._update.updatedAt = Date.now();
//   console.log("nkbekjjn");
//   next();
// });

// productSchema.pre("findOneAndUpdate", function (next) {
//   this._update.updatedAt = Date.now();
//   next();
// });
