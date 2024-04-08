import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../../images/Homedecore.png';
import bed from '../../images/Bedroom.png';
import kitchen from '../../images/Kitchen.png';

const Card = ({ imageURI, title }) => (
  <div className="w-64 md:w-[23vw] h-80 overflow-hidden"> {/* Adjusted to fixed size; consider making it more responsive */}
    <div className="h-4/5">
      <img src={imageURI} alt={title} className="object-cover w-full h-full" />
    </div>
    <div className="flex justify-center items-center bg-[#49372B] h-1/5">
      <div className="text-[#E8DDD5] text-2xl">{title}</div> {/* Tailwind doesn't support 2vw; adjusted to closest */}
    </div>
  </div>
);

const Popular = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const navigate = useNavigate();

  const categories = [
    { id: 1, image: home, title: 'HOME', link: '/CustomerDashboard/Homedecore' },
    { id: 2, image: bed, title: 'BED ROOM', link: '/CustomerDashboard/Bedroom' },
    { id: 3, image: kitchen, title: 'KITCHEN', link: '/CustomerDashboard/Kitchen' },
  ];

  const handleNavigation = (link) => {
    navigate(link);
  };

  return (
    <div className="mb-24 p-8 bg-[#F6EFEA]">
      <div className="text-center">
        <p className="font-bold text-3xl lg:text-4xl text-[#49372B] mb-1"> 
          POPULAR CATEGORIES
        </p>
        <div className="mx-auto text-center pb-1 ">
          <p className="font-light md:text-base  text-s text-[#49372B]">
            ESSENTIAL FURNISHINGS
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className="relative m-4"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <Card imageURI={category.image} title={category.title} />
            {hoverIndex === index && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <button
                  className="px-5 py-2 text-black hover:bg-transparent hover:text-white hover:border-white hover:border-solid hover:border bg-white bg-opacity-100 font-semibold rounded"
                  onClick={() => handleNavigation(category.link)}
                >
                  VISIT {category.title}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
