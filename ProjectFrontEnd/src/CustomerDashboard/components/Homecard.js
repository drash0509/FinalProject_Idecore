import React from 'react';
import Rating from '../components/Rating';
import { useNavigate } from 'react-router-dom'; 

const Homecard = ({ id, imageUrl, title, price, rating }) => {
  const navigate = useNavigate();

  const openProductDetails = () => navigate(`/product/${id}`);

  return (
    <div 
      className="cursor-pointer flex flex-col w-full max-w-sm md:max-w-[17vw]  p-4 border m-2 md:m-1 border-gray-300 rounded-lg transition-shadow ease-in-out duration-300 hover:shadow-lg"
      onClick={openProductDetails}
    >
      <img 
        src={imageUrl} 
        alt="Product" 
        className="w-full h-full object-cover rounded-t-lg"
      />
       <div className="mt-2 flex flex-col justify-between">
          <span className="text-lg sm:text-base  font-medium">{title}</span>
          <span className="text-base sm:text-sm  font-normal text-gray-600">{price}</span>
        <div className="mt-2">
          <Rating rating={rating} />
        </div>      </div>
    </div>
  );
};

export default Homecard;
