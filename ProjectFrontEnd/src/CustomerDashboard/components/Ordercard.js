// OrderCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = ({
  id,
  item,
  image_url,
  title,
  price,
  quantity,
  deliverydate,
}) => {
  const navigate = useNavigate();
  const openProductDetails = () => navigate(`/product/${id}`);

  return (
    <div className="bg-[rgba(246,231,220,0.3)] lg:w-[60vw] border md:justify-between md:align-middle border-[rgba(110,89,75,0.4)] rounded-lg p-4 m-4 mt-8 w-full flex flex-col md:flex-row items-center">
      <div
        className="cursor-pointer flex flex-col  md:justify-between md:align-middle  items-start flex-40"
        onClick={openProductDetails}
      >
        <img
          src={image_url}
          alt={item.title}
          className="w-24 rounded-md"
        />
        <p className="mt-1 text-lg font-light">{item.title}</p>
      </div>

      <p className="flex-20 text-custom-brown text-xl mt-6 font-bold">
        ₹{item.price}
      </p>

      <div className="flex-20 my-3 md:my-1 ">
        <p>Qty: {item.quantity}</p>
        <p>Delivery Date: {deliverydate}</p>
      </div>
      
    </div>
  );
};

export default OrderCard;
