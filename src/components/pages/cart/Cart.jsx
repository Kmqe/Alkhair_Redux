import "./cart.css";
import { useState, useEffect } from "react";

// Image shown when the cart is empty
import cartIsEmpty2 from "../../images/cart_is_empty2.png";

import { Link } from "react-router-dom";
// ICONS
import { MdDeleteOutline } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";

import { useSelector, useDispatch } from "react-redux";
// Import the actions from the cart slice
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  // Get cart and wish list data from Redux store
  const cart = useSelector((state) => state.cart.cart);
  const subTotal = useSelector((state) => state.cart.subTotal);

  // State to store the current screen width
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);

  // Update the screen width state whenever the window is resized
  useEffect(() => {
    function calcSize() {
      setWidthScreen(window.innerWidth);
    }
    window.addEventListener("resize", calcSize);
    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", calcSize);
  }, []);

  // Remove a specific product from the cart
  function handleClickDelete(product) {
    dispatch(removeFromCart(product));
  }

  // Increase product quantity in cart if stock allows
  function handleClickPlus(product) {
    dispatch(incrementQuantity(product));
  }

  // Decrease product quantity in cart if it's more than 1
  function handleClickMinus(product) {
    dispatch(decrementQuantity(product));
  }

  return cart.length ? (
    <section className="section cart-page">
      <div className="container">
        <div className="cart_products">
          <div
            className="cart-row"
            style={{ display: widthScreen < 992 ? "none" : "" }}
          >
            <h3 className="text-center">DELETE</h3>
            <h3>PRODUCT</h3>
            <h3 className="text-center">PRICE</h3>
            <h3 className="text-center">QUANTITY</h3>
            <h3 className="text-center">TOTAL</h3>
          </div>
          {cart.map((product) => (
            <div className="cart-row" key={product.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: widthScreen < 992 ? "flex-start" : "center",
                }}
              >
                <span
                  className="delete_icon"
                  onClick={() => handleClickDelete(product)}
                >
                  <MdDeleteOutline />
                </span>
              </div>
              <div className="product-info">
                <Link to={`/products/${product.id}`}>
                  <img src={product.thumbnail} alt={product.title} />
                </Link>
                <div>
                  <Link className="title" to={`/products/${product.id}`}>
                    <h3 title={product.title}>{product.title}</h3>
                  </Link>
                  <div className="tags">
                    {product.tags.map((tag) => (
                      <Link to={`/products/category/${tag}`} key={tag}>
                        <button className="btn">{tag}</button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="price center">
                <h3>${product.price}</h3>
              </div>
              <div className="quantity center">
                <button
                  className="plus"
                  onClick={() => handleClickPlus(product)}
                >
                  <LuPlus />
                </button>
                <button className="count">{product.quantity}</button>
                <button
                  className="minus"
                  onClick={() => handleClickMinus(product)}
                >
                  <LuMinus />
                </button>
              </div>
              <div
                className="total center"
                style={{ display: widthScreen < 992 ? "none" : "" }}
              >
                <h3>${(product.price * product.quantity).toFixed(2)}</h3>
              </div>
            </div>
          ))}
        </div>
        <div className="cart_totals">
          <div className="box_subtotal">
            <h3>Subtotal:</h3>
            <h3> ${subTotal.toFixed(2)}</h3>
          </div>
          <button className="btn check-out">Check out</button>
        </div>
      </div>
    </section>
  ) : (
    <section>
      <div className="container cart_empty">
        <img src={cartIsEmpty2} alt={"Cart Is Empty"} />
        <h1>Empty Shopping Cart</h1>
      </div>
    </section>
  );
};

export default Cart;
