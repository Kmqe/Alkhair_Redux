import "./header.css";
import logo from "/images/logo.png";

import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/ProductsContext";
import { WishListContext } from "../../context/ProductsContext";

import { Link } from "react-router-dom";

// ICONS
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

const Header = () => {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [inputSearch, setInputSearch] = useState("");
  const [productsOfSearch, setProductsOfSearch] = useState([]);
  const [showListOfSearch, setShowListOfSearch] = useState(false);

  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishListContext);

  useEffect(() => {
    function calcSize() {
      setWidthScreen(window.innerWidth);
    }
    window.addEventListener("resize", calcSize);
    return () => window.removeEventListener("resize", calcSize);
  }, []);

  useEffect(() => {
    function calcScrollY() {
      setScrollY(window.scrollY);
    }
    window.addEventListener("scroll", calcScrollY);
    return () => window.removeEventListener("scroll", calcScrollY);
  }, []);

  useEffect(() => {
    const fetchProductByInputSearch = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${inputSearch}`
        );
        const data = await res.json();
        setProductsOfSearch(data.products.splice(0, 5));
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductByInputSearch();
  }, [inputSearch]);

  // searchAboutProducts

  return (
    <header className={`${scrollY >= 200 ? "fixed" : ""}`}>
      <div className="container">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="search">
          <form>
            <input
              type="text"
              placeholder="Search for items"
              onChange={(e) => setInputSearch(e.target.value)}
              onFocus={() => setShowListOfSearch(true)}
              onBlur={() => setTimeout(() => setShowListOfSearch(false), 200)}
            />
            <Link to={`./search?query=${inputSearch}`}>
              <IoIosSearch />
            </Link>
          </form>
          <div
            className={`list-of-results ${
              showListOfSearch && inputSearch.length > 0 ? "show" : ""
            }`}
          >
            <ul>
              {inputSearch.length > 0
                ? productsOfSearch.map((product) => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                      <li key={product.id}>
                        <img src={product.images[0]} />
                        <p>{product.title}</p>
                      </li>
                    </Link>
                  ))
                : ""}
            </ul>
          </div>
        </div>
        {widthScreen > 768 ? (
          <div className={`box-icon`}>
            <Link to={"/wishlist"} className="icon">
              <FaRegHeart />
              <span className="count">{wishList.length}</span>
            </Link>
            <Link to={"/cart"} className="icon">
              <TiShoppingCart />
              <span className="count">{cart.length}</span>
            </Link>
            <div className="icon">
              <IoPerson />
            </div>
          </div>
        ) : (
          <>
            <button
              className="btn"
              onClick={() => setOpenSideBar(!openSideBar)}
            >
              <FaBars />
            </button>
            <div className={`side-bar ${openSideBar ? "show" : ""}`}>
              <button
                className="btn"
                onClick={() => setOpenSideBar(!openSideBar)}
              >
                <CgClose />
              </button>
              <div className={`box-icon`}>
                <Link to={"/wishlist"} className="icon">
                  <FaRegHeart />
                  <span className="count">{wishList.length}</span>
                </Link>
                <Link to={"/cart"} className="icon">
                  <TiShoppingCart />
                  <span className="count">{cart.length}</span>
                </Link>
                <div className="icon">
                  <IoPerson />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
