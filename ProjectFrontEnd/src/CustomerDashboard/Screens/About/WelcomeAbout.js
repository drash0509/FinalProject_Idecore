import React from 'react';
import logo from '../../images/logo.png';
import img from '../../images/about.png';

const WelcomeAbout = () => {
  return (
    <div className="flex flex-col PX-4">
      <div className="text-center py-8">
        <p className="text-4xl font-semibold text-[#3f332e]">
          Welcome to IDECORE - Where Your Home Begins
        </p>
        <div className="mt-4 mx-auto max-w-4xl">
          <p className="font-light text-lg text-[#3f332e]">
            At IDECORE, we believe that every home tells a story. Our mission is to help you write yours with our curated collection of elegant, innovative, and timeless furniture. Founded in [2024], IDECORE has grown from a passionate idea into a destination for homeowners and designers seeking pieces that spark joy and inspire living spaces.
          </p>
        </div>
      </div>

      <div className="bg-white py-8">
        <div className="flex flex-col md:flex-row-reverse items-center px-4">
          <div className="md:w-1/2">
            <img src={img} alt="About IDECORE" className="max-w-full h-96 mx-auto" />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8">
            <p className="text-2xl font-semibold text-[#3f332e]">
              OUR JOURNEY
            </p>
            <p className="font-light text-lg text-[#3f332e] mt-4">
              It all started with a simple belief: finding the perfect piece of furniture should be straightforward, enjoyable, and reflect your personal style. Frustrated by the lack of options that combined quality, functionality, and beauty, we set out to create a haven for furniture that met these criteria. Today, IDECORE is more than just a furniture app; it's a community of design enthusiasts, a platform for discovery, and a partner in home transformation.
            </p>
          </div>
        </div>
      </div>

      <div className="py-8" style={{backgroundColor: 'rgba(106,88,75,0.7)'}}>
        <div className="text-center py-4">
          <p className="text-4xl font-semibold text-white md:text-5xl mb-4">
            OUR PHILOSOPHY
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center px-4">
          <div className="md:w-1/2">
            <img src={logo} alt="Logo" className="max-w-full h-96 mx-auto mb-6" />
          </div>
          <div className="md:w-1/2 mt-4 md:mt-0 md:pl-8">
            <div className="text-2xl font-semibold text-[#3f332e] text-white">
              Craftsmanship & Choice:
            </div>
            <p className="font-light text-lg text-white">
              Select pieces for their exceptional quality and design. Quality over quantity ensures every item can be a home's centerpiece.
            </p>

            <div className="text-2xl font-semibold text-[#3f332e] text-white mt-4">
              Sustainability
            </div>
            <p className="font-light text-lg text-white">
              Eco-friendly practices are a priority. A beautiful home should also mean a healthy planet.
            </p>

            <div className="text-2xl font-semibold text-[#3f332e] text-white mt-4">
              Inclusive Design:
            </div>
            <p className="font-light text-lg text-white">
              Great design is accessible to all. We cater to every taste and budget, making high-quality design available to everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeAbout;
