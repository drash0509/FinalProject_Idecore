import React from "react";
import editButtonImage from "../../images/pencil.png";
import deleteButtonImage from "../../images/bin.png";

function ProductDataCard({ image, title, price, stock, onEdit, onDelete }) {
  return (
    <div className="flex flex-wrap items-center mb-5 border p-2 w-full max-w-4xl">
      <img
        src={`http://localhost:4001/images/${image}`}
        alt={title}
        className="w-24 h-24 mr-5 md:w-20 md:h-20 sm:w-16 sm:h-16"
      />
      <div className="flex-1 min-w-0">
        <h3 className="m-0 truncate text-base sm:text-sm">{title}</h3>{" "}
        {/* Adjusted text size */}
      </div>
      <div className="flex flex-col items-end mr-14 md:mr-5 sm:mr-2">
        <p className="m-0 mb-1 text-l md:text-2xl font-bold">${price}</p>
        <p className="m-0 text-s">{stock} in stock</p>
      </div>
      <button
        onClick={onEdit}
        className="mr-2 bg-transparent border-none cursor-pointer p-1"
      >
        <img
          src={editButtonImage}
          alt="Edit"
          className="w-6 h-6 md:w-5 md:h-5 sm:w-4 sm:h-4"
        />
      </button>
      <button
        onClick={onDelete}
        className="bg-transparent border-none cursor-pointer p-1"
      >
        <img
          src={deleteButtonImage}
          alt="Delete"
          className="w-6 h-6 md:w-5 md:h-5 sm:w-4 sm:h-4"
        />
      </button>
    </div>
  );
}

export default ProductDataCard;
