import React from "react";
import { useNavigate } from "react-router-dom";
import crossIcon from "../../images/cross.png";
import favIcon from "../../images/favfilled.png";

const FavCard = ({ id, imageUrl, title, price, description, onRemove }) => {
  const navigate = useNavigate();

  const openProductDetails = () => navigate(`/product/${id}`);

  const handleRemove = (e) => {
    e.stopPropagation();
    if (typeof onRemove === "function") {
      onRemove(id);
    } else {
      console.error("onRemove is not a function");
    }
  };

  return (
    <div style={styles.card} onClick={openProductDetails}>
      <img
        src={`http://localhost:4001/images/${imageUrl[0]}`}
        alt="Product"
        style={styles.image}
      />
      <button style={styles.removeButton} onClick={handleRemove}>
        <img src={crossIcon} alt="Remove" style={styles.crossIcon} />
      </button>
      <div style={styles.content}>
        <span style={styles.title}>{title}</span>
        <span style={styles.description}>{description}</span>
        <div style={styles.footer}>
          <img src={favIcon} alt="Favorite" style={styles.favIcon} />
          <span style={styles.price}>${price}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    width: "17vw",
    height: "30vw",
    padding: "0.5vw",
    border: "1px solid rgba(110,89,75,0.4)",
    borderRadius: "1vw",
    position: "relative", // For absolute positioning of the remove button
    overflow: "hidden", // Ensures nothing spills out of the card
  },
  image: {
    width: "100%",
    height: "60%",
    objectFit: "cover",
    borderRadius: "1vw 1vw 0 0", // Rounds the top corners
  },
  content: {
    padding: "1vw",
    display: "flex",
    flexDirection: "column",
    gap: "1vw",
    flexGrow: 1, // Makes sure it fills the space left by the image
  },
  title: {
    fontSize: "1.2vw",
    fontWeight: "600",
    marginBottom: "0.5vw",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  description: {
    fontSize: "1vw",
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
  price: {
    fontSize: "1.2vw",
    fontWeight: "700",
    alignSelf: "flex-end",
  },
  removeButton: {
    position: "absolute",
    top: "0.5vw",
    right: "0.5vw",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  crossIcon: {
    width: "2vw",
    height: "2vw",
  },
  favIcon: {
    width: "1.7vw",
    height: "1.7vw",
    marginRight: "1vw", // Adds some space between the icon and the price
    alignSelf: "flex-start", // Aligns the icon to the start of the flex container
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto", // Pushes the footer to the bottom of the flex container
  },
};

export default FavCard;
