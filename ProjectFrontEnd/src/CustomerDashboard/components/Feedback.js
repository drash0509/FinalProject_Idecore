import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Rating from './Rating';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

export default function Feedback() {
  const [width] = useWindowSize();

  const feedbackData = [
    {
        rating: 5, 
        feedback: "Absolutely stunning dining table!", 
        desc: "The craftsmanship is top-notch and it became an instant centerpiece in our home. The wood finish brings a warm, inviting feel to our meals. Highly recommend!"
    },
    {
        rating: 4, 
        feedback: "Comfortable and stylish office chair", 
        desc: "Been using it for a month now, and my back thanks me every day. The adjustable features and lumbar support are great. Only wish there were more color options."
    },
    {
        rating: 3, 
        feedback: "Decent couch, but the fabric fades", 
        desc: "Loved the couch when it arrived, and it's as comfy as can be. However, the fabric started to fade sooner than expected. Good for the price, but keep this in mind."
    },
    {
        rating: 5, 
        feedback: "Elegant and functional nightstand", 
        desc: "Perfect size for my bedroom, and the drawers slide smoothly. The finish is durable and has maintained its look despite daily use. A great find!"
    },
    {
        rating: 4, 
        feedback: "Modern bookshelf with ample space", 
        desc: "A sleek addition to my living room that fits my book collection and some decorative items. Assembly was straightforward, though it took a bit of time."
    },
    {
        rating: 2, 
        feedback: "Outdoor patio set could be better", 
        desc: "Looks good and the price was right, but the material doesn't seem like it will hold up over time. Cushions are also thinner than expected."
    }
  ];

  const itemsPerSlide = width > 1024 ? 3 : width > 768 ? 2 : 1;

  const chunkedFeedbackData = feedbackData.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / itemsPerSlide);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; 
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <>
      <div className="mb-24">
        <div className="text-center p-4 pb-0">
        <p className="font-bold text-3xl lg:text-4xl text-[#49372B] mb-1"> 
            CUSTOMER FEEDBACK
          </p>
          <div className="mx-auto pb-1 ">
          <p className="font-light md:text-base  text-s text-[#49372B]">
              LET CUSTOMERS SPEAK FOR US
            </p>
          </div>
        </div>

        <Carousel 
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          className="h-auto p-8"
        >
          {chunkedFeedbackData.map((feedbackGroup, index) => (
            <div key={index} className="pb-4 flex justify-around items-center">
              {feedbackGroup.map((feedback, feedbackIndex) => (
                <div key={feedbackIndex} className="flex flex-col items-center text-center md:w-1/3  mb-8">
                  <div className="p-2 flex flex-col items-center justify-center">
                    <Rating rating={feedback.rating.toString()}/>
                    <div className="text-center p-8 font-bold text-lg">
                      {feedback.feedback}
                    </div>
                    <div className="text-center text-gray-600 font-normal text-base">
                      {feedback.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}
