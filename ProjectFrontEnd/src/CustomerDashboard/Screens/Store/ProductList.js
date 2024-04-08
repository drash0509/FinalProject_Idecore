import React from "react";
import ProductCard from "../../components/ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="align-middle lg:w-70vw">
      <div className="flex justify-around flex-wrap">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            imageUrl={product.image_url[0]}
            title={product.title}
            description={product.description}
            price={`$${product.price.toFixed(2)}`}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
