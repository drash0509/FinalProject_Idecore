import React from "react";
import { useNavigate } from "react-router-dom";
import Counter from "../../components/Counter";
import cross from "../../images/cross.png";
import crossIcon from "../../images/cross.png";

const CartCard = ({
  id,
  item,
  image_url,
  title,
  price,
  subTotal,
  quantity,
  onDelete,
  onUpdateQuantity,
}) => {
  const navigate = useNavigate();
  const openProductDetails = () => navigate(`/product/${id}`);

  return (
    <div className="bg-[rgba(246,231,220,0.3)] border md:justify-between md:align-middle border-[rgba(110,89,75,0.4)] rounded-lg p-4 m-4 mt-8 w-full flex flex-col md:flex-row items-center">
      <div
        className="cursor-pointer flex flex-col  md:justify-between md:align-middle  items-start flex-40"
        onClick={openProductDetails}
      >
        <img
          src={`http://localhost:4001/images/${image_url}`}
          alt={item.title}
          className="w-24 rounded-md"
        />
        <p className="mt-1 text-lg font-light">{item.title}</p>
      </div>

      <p className="flex-20 text-custom-brown text-xl mt-6 font-bold">
      ₹{item.price}
      </p>

      <div className="flex-20 my-3 md:my-1 ">
        <Counter
          quantity={item.quantity}
          setQuantity={(newQuantity) => onUpdateQuantity(id, newQuantity)}
        />
      </div>

      <p className="flex-20 text-custom-brown text-xl font-bold">
      ₹{(item.quantity * item.price).toFixed(2)}
      </p>
      <button onClick={() => onDelete(item._id)}>
        <img src={crossIcon} className="w-5 h-5   " alt="Remove" />
      </button>
      <div>{/* Any additional content goes here */}</div>
    </div>
  );
};

export default CartCard;
