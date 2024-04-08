const User = require("../User/schema");
const productModel = require("../product/schema");

async function findUser(id) {
  try {
    return await User.findById(id);
  } catch (e) {
    throw e;
  }
}

async function findProduct(id) {
  try {
    return await productModel.findById(id);
  } catch (e) {
    throw e;
  }
}

module.exports = { findUser, findProduct };
