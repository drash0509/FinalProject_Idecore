import React from 'react';
import emptyStar from '../images/Star.png';
import filledStar from '../images/Star_f.png';

const Rating = ({ rating }) => {
  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <img
            key={index}
            src={index <= rating ? filledStar : emptyStar}
            alt="star"
           className='h-4'
          />
        );
      })}
    </div>
  );
};

export default Rating;
