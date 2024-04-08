import React from 'react';
import support from "../../images/support.png";
import delivery from "../../images/delivery.png";
import ret from "../../images/return.png";

const Service = () => {
  return (
    <div className="flex justify-between text-center p-12">
      <div className="flex flex-col items-center justify-center w-1/4">
        <img src={ret} alt="Return Policy" className="h-16 w-auto mb-1" />
        <div>
          <span className="block text-lg font-bold text-[#3f332e] mb-1">30 DAYS RETURN</span>
        </div>
        <div>
          <span className="block text-sm font-light text-[#3f332e]">
            Simply return it within 30 days for an exchange.
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-1/4">
        <img src={delivery} alt="Free Delivery" className="h-16 w-auto mb-1" />
        <div>
          <span className="block text-lg font-bold text-[#3f332e] mb-1">SPEEDY DELIVERY</span>
        </div>
        <div>
          <span className="block text-sm font-light text-[#3f332e]">
            Fast, Reliable, and Right to Your Doorstep
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-1/4">
        <img src={support} alt="Support" className="h-16 w-auto mb-1" />
        <div>
          <span className="block text-lg font-bold text-[#3f332e] mb-1">Support 24/7</span>
        </div>
        <div>
          <span className="block text-sm font-light text-[#3f332e]">
            Contact us 24 hours a day, 7 days a week
          </span>
        </div>
      </div>
    </div>
  );
};

export default Service;
