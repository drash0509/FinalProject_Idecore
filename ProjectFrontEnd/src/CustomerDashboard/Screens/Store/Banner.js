import React from "react";
import mainbg from "../../images/store.png";

const Banner = () => {
  const backgroundStyle = {
    backgroundImage: `url(${mainbg})`,
    overflowX: "hidden",
  };

  const innerContainerStyle = {
    maxWidth: "100vw", 
  };

  return (
    <div
      className="h-[40vh] lg:h-screen w-screen bg-cover bg-no-repeat bg-top flex items-center justify-center"
      style={backgroundStyle}
    >
      <div style={innerContainerStyle}>
      </div>
    </div>
  );
};

export default Banner;