import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const cookieData = Cookies.get("favorites");
    console.log("cookieData : ", cookieData);
    return cookieData ? JSON.parse(cookieData) : [];
  });
  console.log("favorites : ", favorites);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((favorite) => favorite._id !== id));
  };

  useEffect(() => {
    // Update cookie when favorites change
    Cookies.set("favorites", JSON.stringify(favorites), { expires: 7 }); // Expires in 7 days
  }, [favorites]);

  // Toggle favorite status
  // Toggle favorite status
  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) => {
      console.log("prevFavorites : ", prevFavorites);
      const isFavorite = prevFavorites.some(
        (favProduct) => favProduct._id === product._id
      );
      if (isFavorite) {
        // Remove from favorites
        return prevFavorites.filter(
          (favProduct) => favProduct._id !== product._id
        );
      } else {
        // Add to favorites
        return [...prevFavorites, product];
      }
    });
  };

  const value = { favorites, toggleFavorite, removeFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
