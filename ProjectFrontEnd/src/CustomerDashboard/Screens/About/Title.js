import React from 'react';
import backgroundImage from '../../images/aboutus.png';

const Title = () => {
  return (
    <div className="bg-cover bg-center h-[40vh] md:h-[60vh] lg:h-[90vh] flex relative items-center justify-start pl-[10vw] md:pl-[8vw] lg:pl-[10vw] mb-[6vw] md:mb-[4vw] lg:mb-[2vw]"
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="p-[5vh_5vw] md:p-[4vh_4vw] lg:p-[5vh_5vw] flex flex-col bg-[rgba(73,47,29,0.2)] rounded-[2vw] md:rounded-[1.5vw] lg:rounded-[2vw] z-10 text-left">
        <div className="text-[4.3vw] md:text-[3vw] lg:text-[3.8vw] leading-[4.5vw] md:leading-[3.2vw] lg:leading-[2.2vw] font-extrabold text-center text-[#7D665B]" style={{ fontWeight: 'bold' }}>
          ABOUT-US
        </div>
        <div className="text-[2.2vw] md:text-[1.8vw] lg:text-[2.2vw] font-semibold text-left text-[#7D665B]">
          FURNITURE
        </div>
        <div className="text-[1.1vw] md:text-[0.9vw] lg:text-[1vw] leading-[1.3vw] md:leading-[1.1vw] lg:leading-[0.9vw] font-light text-left text-[#7D665B]">
          <strong>Make your home look elegant</strong>
        </div>
      </div>
    </div>
  )
}

export default Title;
