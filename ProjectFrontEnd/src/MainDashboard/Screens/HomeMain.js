import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainbg from "../Images/Banner.png";

const HomeMain = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getButtonStyles = (isHovered) => ({
    padding: "10px 30px",
    margin: "0 10px",
    fontSize: "1vw",
    cursor: "pointer",
    backgroundColor: isHovered ? "transparent" : "rgba(73,47,29,0.9)",
    color: isHovered ? "rgba(73,47,29,0.9)" : "white",
    border: "2px solid rgba(73,47,29,0.9)",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <div style={styles.mainScreen}>
        <div style={styles.content}>
          <div style={styles.welcome}>IDECORE</div>
          <div style={styles.welcome}>FURNITURES</div>
          <div style={styles.subheading}>YOUR ONLINE FURNITURAIET</div>
        </div>
      </div>
    </>
  );
};

export default HomeMain;

const styles = {
  mainScreen: {
    height: "90vh",
    width: "100vw",
    backgroundImage: `url(${mainbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  content: {
    padding: "5vh 5vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "2vw",
    marginRight: "10vw",
    textAlign: "right",
  },
  welcome: {
    fontSize: "4vw",
    lineHeight: "4.5vw",
    fontWeight: "900",
    color: "rgba(73,47,29,1)",
  },
  heading: {
    fontSize: "2vw",
    fontWeight: "600",
    textAlign: "center", // Ensure text alignment is consistent
    color: "#6E594B",
  },
  subheading: {
    fontSize: "1.1vw",
    lineHeight: "1.3vw",
    fontWeight: "300",
    textAlign: "center", // Ensure text alignment is consistent
    color: "black",
  },
  modal: {
    position: "fixed",
    zIndex: 1,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    overflow: "auto",
    backgroundColor: "rgba(0,0,0,0.4)", // Black background with opacity
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fefefe",
    margin: "15% auto", // 15% from the top and centered
    padding: "4vh 3vw",
    border: "1px solid rgba(73,47,29,1)",
    // width: '80%', // Could be more or less, depending on screen size
    maxWidth: "500px", // Ensures the modal isn't too wide on large screens
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5vh",
  },
  closeButton: {
    color: "black",
    float: "right",
    fontSize: "28px",
    fontWeight: "bold",
    top: "0rem",
    cursor: "pointer",
  },
};
