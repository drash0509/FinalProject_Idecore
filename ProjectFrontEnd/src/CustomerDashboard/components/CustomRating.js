import React, { useState } from 'react';
import emptyStar from '../images/Star.png';
import filledStar from '../images/Star_f.png';

function CustomRating() {
  const [rating, setRating] = useState(0);

  const handleRating = (index) => {
    setRating(index);
  };

  return (
    <div className="flex flex-row"> {/* Added flex and flex-row classes here */}
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <img 
            key={index}
            src={index <= rating ? filledStar : emptyStar}
            onClick={() => handleRating(index)}
            alt="star"
            className='h-5' 
            style={{ cursor: 'pointer' }}
          />
        );
      })}
    </div>
  );
}

export default CustomRating;
