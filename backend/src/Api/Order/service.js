const axios = require("axios");
const auth = require("../authorization/user_auth");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const orderModel = require("./schema");
const productModel = require("../product/schema");
const jwt = require("jsonwebtoken");
const sellingProductModel = require("../SellingProduct/schema");

async function verify(
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) {
  const hmac = crypto.createHmac("sha256", "yE8s1lQinqDsAp3NgvEfak7a");
  const data = `${razorpay_order_id}|${razorpay_payment_id}`;
  hmac.update(data);
  const calculatedSignature = hmac.digest("hex");
  console.log("calculatedSignature : ", calculatedSignature);

  if (calculatedSignature !== razorpay_signature) {
    console.log("true");
    return res.status(400).json({ error: "Invalid signature" });
  }

  return true;
}

async function paymentDetails(razorpay_payment_id) {
  const apiKey = "rzp_test_SAgvhvFFYMzPAp";
  const apiSecret = "yE8s1lQinqDsAp3NgvEfak7a";

  const url = `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`;
  const authHeader = `Basic ${Buffer.from(apiKey + ":" + apiSecret).toString(
    "base64"
  )}`;

  try {
    const paymentResponse = await axios.get(url, {
      headers: {
        Authorization: authHeader,
      },
    });

    return paymentResponse.data;
  } catch (error) {
    // Handle error
    throw error;
  }
}

async function sellerId(id) {
  const product = await productModel.findById(id);
  console.log("product : ", product.userId);
  return product.userId;
}

const updateSellingProducts = async (mappedItems) => {
  try {
    console.log("mappedItems : ", mappedItems);

    for (const item of mappedItems) {
      console.log("item : ", item);
      const seller_id = await sellerId(item.productId);
      console.log("seller_id : ", seller_id);

      const sellerExists = await sellingProductModel.findOne({
        sellerId: seller_id,
      });
      // console.log("sellerExists : ", sellerExists);

      if (sellerExists) {
        const exisitingProductIndex = sellerExists.sellingProduct.findIndex(
          (data) => data.productId.toString() === item.productId.toString()
        );
        console.log("exisitingProductIndex : ", exisitingProductIndex);

        if (exisitingProductIndex !== -1) {
          sellerExists.sellingProduct[exisitingProductIndex].quantity_sold +=
            item.quantity;
        } else {
          sellerExists.sellingProduct.unshift({
            productId: item.productId,
            quantity_sold: item.quantity,
          });
        }

        console.log("sellerExists : ", sellerExists);

        const updatedUser = await sellerExists.save();
        console.log("updatedUser : ", updatedUser);

        // return updatedUser;
      } else {
        const newData = await sellingProductModel({
          sellerId: seller_id,
          sellingProduct: [
            {
              productId: item.productId,
              quantity_sold: item.quantity,
            },
          ],
        });

        console.log("newData : ", newData);

        const data = await newData.save();
      }
    }

    return true;
  } catch (error) {
    console.error("Error updating selling products:", error);
  }
};

async function updateData(data, paymentDetails, razorpay_payment_id) {
  console.log("data : ", data);
  const verifyUser = jwt.verify(
    data.user.replace("Bearer ", ""),
    "atuhjiokbvdftghyujgdefghyjbcfhhgds"
  );
  console.log("verifyUser : ", verifyUser);
  // console.log("seller : ", sellerId("6606ab999c21afd0289876e8"));
  const updatedData = await orderModel({
    user: verifyUser._id,
    address: data.address,
    contact_no: data.number,
    products: await Promise.all(
      data.mappedItems.map(async (item) => ({
        productId: item.productId,
        sellerId: await sellerId(item.productId), // Assuming you have sellerId in your mappedItems
        quantity: item.quantity,
      }))
    ),
    order_id: paymentDetails.id,
    amount: paymentDetails.amount,
    currency: paymentDetails.currency,
    status: paymentDetails.status,
    card_id: paymentDetails.card_id ? paymentDetails.card_id : null,
    bank: paymentDetails.bank ? paymentDetails.bank : null,
    wallet: paymentDetails.wallet ? paymentDetails.wallet : null,
    vpa: paymentDetails.vpa ? paymentDetails.vpa : null,
    payment_id: razorpay_payment_id,
    payment_method: paymentDetails.method,
  });

  console.log("updatedData : ", updatedData);
  const updateSellingData = await updateSellingProducts(data.mappedItems);

  const update = updatedData.save();
  if (update) {
    return true;
  } else {
    return false;
  }
}

module.exports = { verify, paymentDetails, updateData };
