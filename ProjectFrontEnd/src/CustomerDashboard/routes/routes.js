import React from "react";
import { Routes, Route } from "react-router-dom";
import MainHome from "../Screens/HomeScreen/MainHome";
import AboutUs from "../Screens/About/AboutUs";
import Store from "../Screens/Store/Store";
import Category from "../Screens/Categories/Category";
import BedRoom from "../Screens/Categories/BedRoom";
import Homedecore from "../Screens/Categories/Homedecore";
import Kitchen from "../Screens/Categories/Kitchen";
import Organizers from "../Screens/Categories/Organizers";
import ProductDetails from "../Screens/Productdetails";
import Kids from "../Screens/Categories/Kids";
import Storage from "../Screens/Categories/Storage";
import FavScreen from "../Screens/FavScreens/FavScreen";
import CartScreen from "../Screens/Cart/CartScreen";
import LoginScreen from "../LoginRegister/Login";
import { FavoritesProvider } from "../Screens/FavScreens/FavouriteContext";
import { CartProvider } from "../Screens/Cart/CartContext";
import SearchResults from "../components/SearchResults";
import Contactus from "../Screens/ContactUs/Contactus";
import PaymentForm from "../components/Payment";

const MainRoute = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/Home" element={<MainHome />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Homedecore" element={<Homedecore />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/BedRoom" element={<BedRoom />} />
          <Route path="/Kitchen" element={<Kitchen />} />
          <Route path="/Organizers" element={<Organizers />} />
          <Route path="/Kids" element={<Kids />} />
          <Route path="/Storage" element={<Storage />} />
          <Route path="/FavScreen" element={<FavScreen />} />
          <Route path="/CartScreen" element={<CartScreen />} />
          <Route path="/LoginScreen" element={<LoginScreen />} />
          <Route path="/ContactUs" element={<Contactus />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/payment" element={<PaymentForm />} />
        </Routes>
      </FavoritesProvider>
    </CartProvider>
  );
};

export default MainRoute;
