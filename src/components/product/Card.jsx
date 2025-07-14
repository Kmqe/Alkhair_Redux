import "./card.css";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { CartContext, WishListContext } from "../context/ProductsContext";

// ICONS
import { FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";

const Card = ({
  product,
  inCart,
  inWishList,
  // handleClickBtnAddToCart,
  // handleCLickBtnAddToWishList,
}) => {
  const { cart, setAddToCart } = useContext(CartContext);
  const { wishList, setWishList } = useContext(WishListContext);

  function handleClickBtnAddToCart(product) {
    setAddToCart([...cart, { ...product, quantity: 1 }]);
  }

  function handleCLickBtnAddToWishList(product) {
    const find = wishList.some((item) => item.id === product.id);
    if (find) {
      const newListOfWish = wishList.filter((item) =>
        item.id !== product.id ? item : null
      );
      setWishList(newListOfWish);
    } else {
      setWishList([...wishList, product]);
    }
  }

  return (
    <div className="card_product">
      <div className="img_content">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="card_img"
            loading="lazy"
          />
        </Link>
        <div className="action_product">
          <span
            className={`${inWishList ? "in-wish-list" : ""}`}
            onClick={() => {
              handleCLickBtnAddToWishList(product);
            }}
          >
            {" "}
            {inWishList ? <FaHeart /> : <FaRegHeart />}
          </span>
          <span>
            <FaShare />
          </span>
        </div>
      </div>
      <div className="card_info">
        <p>{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 title={product.title}>{product.title}</h3>
        </Link>
        <div className="rating">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        {product.brand ? (
          <p className="brand">
            by
            <span>{`${product.brand}`}</span>
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="price_and_cart">
        <div className="price">
          <span>{`$${product.price.toFixed(2)}`}</span>
          <span>
            {"$" +
              (product.price / (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
          </span>
        </div>
        <div className="add_to_cart">
          <button
            className={`btn ${inCart ? "in-cart" : ""}`}
            onClick={() => handleClickBtnAddToCart(product)}
          >
            {inCart ? (
              <>
                <BsCartCheck />
              </>
            ) : (
              <>
                {" "}
                <TiShoppingCart />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
