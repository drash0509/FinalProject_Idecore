import React from 'react';
import items from '../../items';
import Homecard from '../../components/Homecard';

const DecoreH = () => {
  const homeDecorCategory = items[0].categories.find(category => category.name === "Home Decor");
  const homeDecorProducts = homeDecorCategory ? homeDecorCategory.products : [];

  return (
    <div className="mb-24">
      <div className="text-center p-8">
      <p className="font-bold text-3xl lg:text-4xl text-[#49372B] mb-1"> 
          DECORE YOUR HOME
        </p>
        <div className="mx-auto py-1 w-full md:w-1/2 lg:w-1/3">
        <p className="font-light md:text-base  text-s text-[#49372B]">
            ELEVATE YOUR SPACE WITH ELEGANCE
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly gap-2">
        {homeDecorProducts.map((product) => (
          <Homecard
            key={product.id}
            id={product.id}
            imageUrl={product['image-url']}
            title={product.title}
            price={`₹${product.price.toFixed(2)}`}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default DecoreH;