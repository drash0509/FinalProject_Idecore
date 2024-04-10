import React from "react";

const DiscountDropdown = ({ discounts, onSelect, onClose }) => {
  console.log("discountssss : ", discounts);
  const handleDiscountSelect = (discount) => {
    onSelect(discount);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-lg font-semibold mb-4">Available Discounts</h2>

        <ul>
          {discounts.map((discount) => (
            <li
              key={discount.code}
              className="cursor-pointer hover:bg-gray-100 text-xs py-2 p-4 text-gray-500 rounded-md mb-2 border-2 border-gray-200"
              onClick={() => handleDiscountSelect(discount)}
            >
              <h1 className="text-black font-bold text-lg">
                {" "}
                {discount.cuponName}
              </h1>
              {discount.description}
            </li>
          ))}
        </ul>
        <button style={{ color: "red" }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DiscountDropdown;
