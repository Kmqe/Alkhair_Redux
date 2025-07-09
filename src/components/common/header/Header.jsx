import "./header.css";
import logo from "/images/logo.png";

import { useContext } from "react";
import { CartContext } from "../../context/ProductsContext";

import { Link } from "react-router-dom";

// ICONS
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoPerson } from "react-icons/io5";

const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <header>
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "60px",
          }}
        >
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="search">
            <form action="">
              <input type="text" placeholder="Search for items" />
              <span>
                <IoIosSearch />
              </span>
            </form>
          </div>
        </div>

        <div className="box-icon">
          <div className="icon">
            <FaRegHeart />
            <span className="count">1</span>
          </div>
          <Link to={"/cart"} className="icon">
            <TiShoppingCart />
            <span className="count">{cart.length}</span>
          </Link>
          <div className="icon">
            <IoPerson />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
