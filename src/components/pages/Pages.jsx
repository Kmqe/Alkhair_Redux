import { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import { CartContext } from "../context/ProductsContext";
import Cart from "./cart/Cart";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductDetailsSkeleton from "./ProductDetails/productDetailsSkeleton/ProductDetailsSkeleton";
import WishList from "./wishlist/WishList";
import { WishListContext } from "../context/ProductsContext";

const Pages = () => {
  //
  const [cart, setAddToCart] = useState(() => {
    const foundCart = JSON.parse(localStorage.getItem("cart"));
    return foundCart ? foundCart : [];
  });

  const [wishList, setWishList] = useState(() => {
    const foundWishList = JSON.parse(localStorage.getItem("wish_list"));
    return foundWishList ? foundWishList : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wish_list", JSON.stringify(wishList));
  }, [wishList]);
  return (
    <>
      <CartContext.Provider value={{ cart, setAddToCart }}>
        <WishListContext.Provider value={{ wishList, setWishList }}>
          <Header />
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="wishlist/" element={<WishList />} />
            {/* <Route path="/x" element={<ProductDetailsSkeleton />} /> */}
          </Routes>
        </WishListContext.Provider>
      </CartContext.Provider>
    </>
  );
};

export default Pages;
