import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "./FavouriteContext";
import items from "../../items";
import FavCard from "./FavCard";
import back from "../../images/back.png";
import axios from "axios";
import Cookies from "js-cookie";

const FavScreen = () => {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();
  console.log("hii");

  const userCookie = Cookies.get("user");
  const favCookieString = Cookies.get("favorites");
  const favCookie = favCookieString ? JSON.parse(favCookieString) : [];

  const handleRemove = async (id) => {
    console.log(id);

    if (userCookie) {
      await axios.delete(`http://localhost:4001/fav/${id}`, {
        headers: {
          Authorization: `Bearer ${userCookie}`,
        },
      });

      const res = await axios.get("http://localhost:4001/fav/", {
        headers: {
          Authorization: `Bearer ${userCookie}`,
        },
      });
      console.log(res.data.data);
      setData(res.data.data);
    } else {
      removeFavorite(id);
      window.location.reload();
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userCookie) {
          const res = await axios.get("http://localhost:4001/fav/", {
            headers: {
              Authorization: `Bearer ${userCookie}`,
            },
          });
          console.log("data : ", res.data.data);
          setData(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchData(); // Call the nested function here
  }, [userCookie]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <img
        src={back}
        alt="Back"
        style={{
          cursor: "pointer",
          margin: "0vw 2vw",
          width: "20px",
          height: "20px",
          marginTop: "1vw",
        }}
        onClick={handleBackClick}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          gap: "2rem",
          marginBottom: "6vw",
          padding: "1vw 2vw",
          backgroundColor: "rgba((230,222,213,0.4)",
        }}
      >
        {userCookie &&
          data.map((product) => (
            <FavCard
              key={product._id}
              id={product._id}
              imageUrl={product.image_url}
              title={product.title}
              description={product.description}
              price={`${product.price}`}
              onRemove={() => handleRemove(product._id)} // Pass handleRemove as a prop
            />
          ))}
        {!userCookie &&
          favCookie.map((product) => (
            <FavCard
              key={product._id}
              id={product._id}
              imageUrl={product.image_url}
              title={product.title}
              description={product.description}
              price={`${product.price}`}
              onRemove={() => handleRemove(product._id)} // Pass handleRemove as a prop
            />
          ))}
      </div>
    </>
  );
};

export default FavScreen;
