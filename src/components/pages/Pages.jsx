// React hooks
import { useEffect, useState } from "react";
//React Router Components for page rouging
import { Route, Routes } from "react-router-dom";
// Common layout component
import Header from "../common/header/Header";
// Home page
import Home from "../home/Home";
// Contexts for cart and wishlist
import { CartContext, WishListContext } from "../context/ProductsContext";
// Cart Page
import Cart from "./cart/Cart";
// Product details page
import ProductDetails from "./ProductDetails/ProductDetails";
// Wishlist page
import WishList from "./wishlist/WishList";
// Products listing page by category
import ProductsByCategory from "./ProductsByCategory/ProductsByCategory";

const Pages = () => {
  // Initialize cart from localStorage or set it to an empty array
  const [cart, setAddToCart] = useState(() => {
    const foundCart = JSON.parse(localStorage.getItem("cart"));
    return foundCart ? foundCart : [];
  });

  // Initialize wishlist from localStorage or set it to an empty array
  const [wishList, setWishList] = useState(() => {
    const foundWishList = JSON.parse(localStorage.getItem("wish_list"));
    return foundWishList ? foundWishList : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wish_list", JSON.stringify(wishList));
  }, [wishList]);
  return (
    <>
      {/* Provide cart and wishlist context to the entire app with routing setup*/}
      <CartContext.Provider value={{ cart, setAddToCart }}>
        <WishListContext.Provider value={{ wishList, setWishList }}>
          <Header />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route
              path="products/category/:category"
              element={<ProductsByCategory />}
            />
            <Route path="wishlist/" element={<WishList />} />
          </Routes>
        </WishListContext.Provider>
      </CartContext.Provider>
    </>
  );
};

export default Pages;
