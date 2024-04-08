import React, { useState, useEffect } from "react";
import filterIcon from "../../images/filter.png";
import axios from "axios";

const ProductFilters = ({
  uniqueCategories,
  setCategoryFilter,
  setSortPrice,
  setRatingFilter,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => setShowFilters(!showFilters);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4001/category/").then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }, []);

  return (
    <div className="filters-container justify-center align-middle bg-custom-brown-dark p-4 w-screen lg:w-30vw">
      <button
        onClick={toggleFilters}
        className="flex items-center justify-self-center justify-center bg-custom-beige text-custom-brown px-4 py-2 rounded mb-4"
      >
        <img src={filterIcon} alt="filter" className="w-6 h-auto mr-2" />
        <span className="font-semibold">Filters</span>
      </button>
      {showFilters && (
        <div className="bg-custom-brown-light bg-opacity-80 p-4 rounded">
          <div className="mb-4">
            <label
              className="block font-semibold mb-1"
              htmlFor="categoryFilter"
            >
              Category
            </label>
            <select
              id="categoryFilter"
              className="w-full p-2 bg-custom-beige  text-custom-brown rounded"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              {data.map((category, index) => (
                <option key={index} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="sortPrice">
              Sort by Price
            </label>
            <select
              id="sortPrice"
              className="w-full p-2 bg-custom-beige text-custom-brown rounded"
              onChange={(e) => setSortPrice(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="ratingFilter">
              Rating
            </label>
            <select
              id="ratingFilter"
              className="w-full p-2 bg-custom-beige text-custom-brown rounded"
              onChange={(e) => setRatingFilter(parseInt(e.target.value))}
            >
              <option value="0">All Ratings</option>
              <option value="1">1 Star & Up</option>
              <option value="2">2 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
              <option value="4">4 Stars & Up</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
