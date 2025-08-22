import "./card.css";

// Link component for navigation between routes
import { Link } from "react-router-dom";

// ICONS
import { FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";

import { useDispatch } from "react-redux";
// Import the addToCart action from the cart slice
import { addToCart } from "../../features/cart/cartSlice";
// Action to add or remove a product from the wish list
import { toggleProductInWishList } from "../../features/wishList/wishListSlice";

const Card = ({ product, inCart, inWishList }) => {
  const dispatch = useDispatch();
  const rating = Array(Math.ceil(product.rating)).fill(0);

  // Add product to cart
  function handleClickBtnAddToCart(product) {
    dispatch(addToCart(product));
  }

  // Add product to wish list
  function handleToggleWishList() {
    dispatch(toggleProductInWishList(product));
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
              handleToggleWishList();
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
          {rating.map((_, index) => (
            <FaStar key={index} />
          ))}
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
