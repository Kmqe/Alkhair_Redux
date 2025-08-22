//React Router Components for page rouging
import { Route, Routes } from "react-router-dom";
// Common layout component
import Header from "../common/header/Header";
// Home page
import Home from "../home/Home";
// Cart Page
import Cart from "./cart/Cart";
// Product details page
import ProductDetails from "./ProductDetails/ProductDetails";
// Wishlist page
import WishList from "./wishlist/WishList";
// Products listing page by category
import ProductsByCategory from "./ProductsByCategory/ProductsByCategory";
// Search Results page
import SearchResults from "./SearchResults/SearchResults";

const Pages = () => {
  return (
    <>
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
        <Route path="search" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default Pages;
