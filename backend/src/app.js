const express = require("express");
const cors = require("cors");
const app = express();
const productRouter = require("./Api/product/api");
const cartRouter = require("./Api/Cart/api");
const orderRouter = require("./Api/Order/api");
require("./conn");
const path = require("path");
const { fileURLToPath } = require("url");
const cookieParser = require("cookie-parser");
const productModel = require("./Api/product/schema");
const cartModel = require("./Api/Cart/schema");
const userRouter = require("./Api/User/app");
const userModel = require("./Api/User/schema");
const orderModel = require("./Api/Order/schema");
const sellerModel = require("./Api/Seller_user/schema");
const sellerRouter = require("./Api/Seller_user/api");
const categoryModel = require("./Api/Category/schema");
const categoryRouter = require("./Api/Category/api");
const filterRouter = require("./Api/Filter/api");
const filterModel = require("./Api/Filter/schema");
const favRouter = require("./Api/fav/fav");
const searchRouter = require("./Api/serch/serchbar");
const CookiDataRouter = require("./Api/cookieData/cookie");
const reviewRouter = require("./Api/reviews/api");
const port = 4001 || process.env.PORT;

app.use(cors());
const __dirname1 = path.resolve();
const imagesPath = path.join(__dirname1, "/src/images");
app.use("/images", express.static(imagesPath));

// app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use(productRouter);
app.use(cartRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(orderRouter);
app.use(sellerRouter);
app.use(filterRouter);
app.use(favRouter);
app.use(searchRouter);
app.use(CookiDataRouter);
app.use(reviewRouter);

app.get("/", (req, res) => {
  res.cookie("jnt", "value");
  res.send("Hello how are you ");
});

app.listen(port, (req, res) => {
  console.log(`server running on port ${port}`);
});
