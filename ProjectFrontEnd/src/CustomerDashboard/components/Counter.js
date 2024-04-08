import React, { useState } from 'react';
import addImage from '../images/plus.png';
import subImage from '../images/minus.png';

const Counter = ({ quantity, setQuantity }) => {
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className='flex align-middle justify-start space-x-2' >
      <button onClick={handleDecrement} className='bg-transparent border-none outline-none' >
        <img src={subImage} alt="Subtract" className='w-8 h-8'  />
      </button>

      <span className='text-lg font-semibold w-8 h-8 rounded-md text-center'  style={{  border: '1px solid rgba(110,89,75,1)' }}>
        {quantity}
      </span>

      <button onClick={handleIncrement} className='bg-transparent border-none outline-none'>
        <img src={addImage} alt="Add" className='w-8 h-8' />
      </button>
    </div>
  );
};

export default Counter;



 
     
                
         
      
