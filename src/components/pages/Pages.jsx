import { useEffect, useState } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Header from "../common/header/Header";
import Home from "../home/Home";
import { CartContext } from "../context/ProductsContext";
import Cart from "./cart/Cart";
import ProductDetails from "./ProductDetails/ProductDetails";
import ProductSkeleton from "../product/productSkeleton/ProductSkeleton";

const Pages = () => {
  const [cart, setAddToCart] = useState(() => {
    const foundCart = JSON.parse(localStorage.getItem("cart"));
    return foundCart ? foundCart : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <CartContext.Provider value={{ cart, setAddToCart }}>
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/x" element={<ProductSkeleton />} />
        </Routes>
      </CartContext.Provider>
    </>
  );
};

export default Pages;
