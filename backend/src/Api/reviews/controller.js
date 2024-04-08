const ProductModel = require("../product/schema");
const service = require("./service");

async function createReview(req, res, next) {
  try {
    const user = req.user;
    const productId = req.params.id;

    const userData = await service.findUser(user._id);

    const productData = await service.findProduct(productId);

    const review = {
      name: userData.name,
      review: req.body.review,
    };

    productData.reviews.unshift(review);
    await productData.save();
  } catch (e) {
    next(e);
  }
}

async function createRating(req, res, next) {
  try {
    const user = req.user;
    const productId = req.params.id;

    const userData = await service.findUser(user._id);
    if(!userData){return res.send({status : 400, message: "login firs"})}

    const productData = await service.findProduct(productId);

    const rating = {
      name: userData.name,
      rating: req.body.review,
    };

    productData.ratings.unshift(rating);
    console.log(productData);
  } catch (e) {
    next(e);
  }
}

module.exports = { createRating, createReview };
