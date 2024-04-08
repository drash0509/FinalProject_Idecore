import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard";
import Bill from "../../components/CartBill";
import backgroundImage from "../../images/CART.gif";
import bag from "../../images/bag.png";
import back from "../../images/back.png";
import axios from "axios";
import Cookies from "js-cookie";

const CartScreen = () => {
  const { calculateTotal, removeFromCart, getCartData, updateQuantity } =
    useCart();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const userCookie = Cookies.get("user");
  const cartCookieString = Cookies.get("cartItems");
  const cartCookie = cartCookieString ? JSON.parse(cartCookieString) : [];
  const [data, setData] = useState({ total: 0, items: [] });
  const [total, setTotal] = useState(0);
  const [showBill, setShowBill] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("userCookie 123 : ", userCookie);
        if (userCookie) {
          console.log("Ayushi");
          const res = await axios.get(`http://localhost:4001/cart/`, {
            headers: {
              Authorization: `Bearer ${userCookie}`, //
            },
          });
          console.log("res.data.data : ", res);
          setData({
            total: res.data.data[0].total,
            items: res.data.data[0].items,
          });
          setTotal(res.data.data[0].total);
        } else {
          setTotal(calculateTotal);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [userCookie]);
  const updateItemQuantity = async (id, quantity) => {
    try {
      if (userCookie) {
        await axios.put(
          `http://localhost:4001/cart/${id}`,
          { quantity },
          { headers: { Authorization: `Bearer ${userCookie}` } }
        );
        const res = await axios.get(`http://localhost:4001/cart/`, {
          headers: { Authorization: `Bearer ${userCookie}` },
        });
        setData({
          total: res.data.data[0].total,
          items: res.data.data[0].items,
        });
        setTotal(res.data.data[0].total);
      } else {
        updateQuantity(id, quantity);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const clearCart = async () => {
    try {
      if (userCookie) {
        await axios.delete("http://localhost:4001/cart/", {
          headers: { Authorization: `Bearer ${userCookie}` },
        });
        const res = await axios.get(`http://localhost:4001/cart/`, {
          headers: { Authorization: `Bearer ${userCookie}` },
        });
        setData({ total: 0, items: [] });
        setTotal(0);
      } else {
        Cookies.remove("cartItems");
        setTotal(0);
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const deleteData = async (id) => {
    try {
      if (userCookie) {
        await axios.delete(`http://localhost:4001/cart/${id}`, {
          headers: { Authorization: `Bearer ${userCookie}` },
        });
        const res = await axios.get(`http://localhost:4001/cart/`, {
          headers: { Authorization: `Bearer ${userCookie}` },
        });
        setData({
          total: res.data.data[0].total,
          items: res.data.data[0].items,
        });
        setTotal(res.data.data[0].total);
      } else {
        removeFromCart(id);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBackClick = () => navigate(-1);

  const handleBuyNowClick = () => {
    if (userCookie) {
      setShowBill(true);
    } else {
      navigate("/LoginScreen");
    }
  };

  const handleBillClose = () => setShowBill(false);
  console.log("data : ", data);
  console.log("total : ", total);

  const product = data.items.map((item) => ({
    title: item.product,
    price: item.price,
    quantity: item.quantity,
    productId: item.productId,
  }));
  console.log("product : ", product);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center  px-8 lg:px-0 lg:items-center lg:justify-between">
      <div className="w-full lg:w-[60%] px-8 flex flex-col items-center">
        {cartCookie.length !== 0 || data.items.length !== 0 ? (
          <>
            {showBill && (
              <Bill
                items={data.items.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  price: item.subTotal,
                  product: item.product,
                }))}
                onClose={handleBillClose}
                onConfirm={() => {
                  setShowBill(false);
                  navigate("/payment", {
                    state: {
                      mappedItems: product,
                    },
                  });
                }}
              />
            )}
            <div className="flex items-center  gap-4 mt-8 ">
              <div className="flex">
                <img
                  src={back}
                  alt="Back"
                  className="cursor-pointer w-5 left-5 h-5 mx-8 my-8 flex"
                  onClick={handleBackClick}
                />
              </div>
              <img src={bag} alt="Bag" className="w-16 h-16" />
              <div>
                <div className="font-bold text-lg text-brown-800">
                  CART ITEMS
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-light text-sm text-brown-800">
                    CHECK OUT YOUR CART
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full hidden md:flex text-center justify-between pb-4 border-b-2 border-brown-300 font-bold">
              <span className="w-40">Item</span>
              <span className="w-20">Price</span>
              <span className="w-20">Quantity</span>
              <span className="w-20">Total Price</span>
              <span className="w-10"></span>
            </div>
            {(userCookie ? data.items : cartCookie).map((item) => (
              <CartCard
                key={item._id}
                id={item.productId || item._id}
                item={item}
                image_url={item.image_url || item.image_ur[0]}
                title={item.product || item.title}
                price={item.price}
                subTotal={item.subTotal || item.price * item.quantity}
                quantity={item.quantity}
                onDelete={deleteData}
                onUpdateQuantity={updateItemQuantity}
              />
            ))}
          </>
        ) : (
          <>
            <div
              className="w-30 h-30 bg-no-repeat bg-contain bg-center mb-4"
              style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
            <p>Your cart is empty.</p>
          </>
        )}
      </div>
      <div className="w-full lg:w-[35%] lg:h-screen  bg-custom-brown-light bg-opacity-50 rounded-md p-4 mt-8 lg:mt-0">
        <h2 className="mt-20 mb-8 text-2xl font-bold text-brown-800">
          Cart Total
        </h2>
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-brown-800 mb-2">
            Total Cart Value:
          </h3>
          <h3 className="text-base text-brown-800">${total}</h3>
        </div>
        <div className="flex flex-col space-y-5">
          <button
            onClick={clearCart}
            className="w-full py-2 px-4 cursor-pointer text-white bg-custom-brown rounded-md border-none"
          >
            CLEAR CART
          </button>
          <button
            onClick={handleBuyNowClick}
            className="w-full py-2 px-4 cursor-pointer text-white bg-custom-brown rounded-md border-none"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
