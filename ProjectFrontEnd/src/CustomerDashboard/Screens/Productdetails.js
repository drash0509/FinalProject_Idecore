import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import back from "../images/back.png";
import fav from "../images/favicon.png";
import favfilled from "../images/favfilled.png";
import Counter from "../components/Counter";
import { useFavorites } from "./FavScreens/FavouriteContext";
import { useCart } from "./Cart/CartContext";
import Bill from "../components/CartBill"; // Importing Bill component
import axios from "axios";
import Cookies from "js-cookie";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] =
    useState();
    // `http://localhost:4001/images/${product.image_url[0]}`
  const [isAddToCartHovered, setIsAddToCartHovered] = useState(false);
  const [isBuyNowHovered, setIsBuyNowHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showBill, setShowBill] = useState(false);
  const [paymentData, setPaymentData] = useState([]);

  const userCookie = Cookies.get("user");

  useEffect(() => {
    console.log("product: ", product);
  }, [product]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4001/product/${id}`);
        const productData = res.data.data.productData;
        const isItemExists = res.data.data.isitemExists;
        console.log("productData : ", productData);
        setProduct(productData);
        setLoading(false);

        console.log("product 123: ", product);

        if (userCookie) {
          setIsFavorite(isItemExists);
        } else {
          setIsFavorite(favorites.some((item) => item._id === productData._id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, userCookie, favorites]); // Make sure to include all necessary dependencies

  const handleBackClick = () => navigate(-1);

  const handleFavoriteToggle = async () => {
    if (userCookie) {
      try {
        const id = product._id;
        const res = await axios.post(
          "http://localhost:4001/fav/",
          { id },
          {
            headers: {
              Authorization: `Bearer ${userCookie}`, //
            },
          }
        );
        console.log("res.data : ", res.data);

        const res1 = await axios.get(`http://localhost:4001/product/${id}`, {
          headers: {
            Authorization: `Bearer ${userCookie}`,
          },
        });
        console.log("product data fav : ", res1.data);
        setProduct(res1.data.data.productData);
        setIsFavorite(res1.data.data.isitemExists);
      } catch (e) {
        console.log(e);
      }
    } else {
      const foundItem = favorites.find((item) => item._id === product._id);
      toggleFavorite(product);
      if (foundItem) {
        setIsFavorite(false);
      } else {
        setIsFavorite(true);
      }
    }
  };

  const cart = async (product, quantity) => {
    console.log("product : ", product);
    console.log("quantity : ", quantity);

    if (userCookie) {
      try {
        const res = await axios.post(
          "http://localhost:4001/cart/",
          { product, quantity },
          {
            headers: {
              Authorization: `Bearer ${userCookie}`, //
            },
          }
        );
        console.log("res.data.data : ", res.data.data);
      } catch (e) {
        console.log(e);
      }
    } else {
      addToCart(product, quantity);
    }
  };

  const handleBuyNowClick = () => {
    if (userCookie) {
      setShowBill(true);
    } else {
      navigate("/LoginScreen");
    }
  };

  console.log("product 1234: ", product);

  useEffect(() => {
    // This effect will be called whenever product or quantity changes
    if (product) {
      // Prepare payment data
      const data = {
        title: product.title,
        price: product.price,
        quantity: quantity,
        productId: product._id,
      };
      setPaymentData([data]);
    }
  }, [product, quantity, showBill]);

  console.log("paymentData : ", paymentData);

  const handleBillClose = () => setShowBill(false);

  return (
    <>
      {product && (
        <>
          {showBill && (
            <Bill
              items={[
                {
                  productId: product._id,
                  quantity: quantity,
                  price: product.price,
                  product: product.title,
                },
              ]}
              mappedItems={paymentData}
              onClose={handleBillClose}
              // onConfirm={() => {
              //   setShowBill(false);
              //   navigate("/payment", {
              //     state: { mappedItems: paymentData },
              //   });
              // }}
            />
          )}
          <img
            src={back}
            alt="Back"
            className="cursor-pointer m-5 mb-0 w-5 h-5"
            onClick={handleBackClick}
          />
          <div className="flex flex-col lg:flex-row items-center md:items-start p-5 gap-6 ">
            {/* Image Gallery */}
            <div className="w-full lg:w-1/2 h-fit flex justify-center items-center overflow-hidden border border-gray-400 rounded-lg p-8">
              <img
                src={selectedImageUrl}
                alt={product.title}
                className="max-w-full max-h-full object-contain block rounded-md"
              />
            </div>
            {/* Image Thumbnails */}
            <div className="flex flex-row lg:flex-col gap-2.5 overflow-y-auto">
              {product.image_url &&
                product.image_url.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="cursor-pointer p-2 border border-gray-400 rounded-lg"
                    onClick={() =>
                      setSelectedImageUrl(
                        `http://localhost:4001/images/${imageUrl}`
                      )
                    }
                    onMouseEnter={() =>
                      setSelectedImageUrl(
                        `http://localhost:4001/images/${imageUrl}`
                      )
                    }
                  >
                    <img
                      src={`http://localhost:4001/images/${imageUrl}`}
                      alt={`${product.title} ${index}`}
                      className="w-32 lg:w-1/2 h-fit rounded-md"
                    />
                  </div>
                ))}
            </div>
            {/* Product Details */}
            <div className="flex-2 flex flex-col justify-between p-8 w-full">
              <div>
                <h2 className="font-bold text-2xl text-[#49372B]">
                  {product.title}
                </h2>
                <p className="font-light text-base text-[#49372B] mt-4 mb-4">
                  {product.description}
                </p>
                <div className="mb-4">
                  <Rating rating={product.rating} />
                </div>
                <p className="font-medium text-lg text-[#49372B]">
                  Price: ₹{product.price}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Counter quantity={quantity} setQuantity={setQuantity} />
                  <button
                    onClick={handleFavoriteToggle}
                    className="bg-transparent border-none outline-none"
                  >
                    <img
                      src={isFavorite ? favfilled : fav}
                      alt="Favorite"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </button>
                </div>
                <div className="flex gap-4">
                  <button
                    className={`bg-[#F6E7DC] text-[rgba(110,89,75,1)] border border-[rgba(110,89,75,1)] ${
                      isAddToCartHovered ? "bg-opacity-50" : ""
                    } p-2 px-12 rounded-md`}
                    onMouseEnter={() => setIsAddToCartHovered(true)}
                    onMouseLeave={() => setIsAddToCartHovered(false)}
                    onClick={() => cart(product, quantity)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className={`bg-[rgba(110,89,75,1)] text-white border border-[rgba(110,89,75,1)] ${
                      isBuyNowHovered ? "bg-opacity-50" : ""
                    } py-2  px-12 rounded-md`}
                    onMouseEnter={() => setIsBuyNowHovered(true)}
                    onMouseLeave={() => setIsBuyNowHovered(false)}
                    onClick={handleBuyNowClick}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
