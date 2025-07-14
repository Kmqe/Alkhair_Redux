import "./cartSkeleton.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import cartIsEmpty2 from "../../../images/cart_is_empty2.png";

// ICONS
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";

const cart = ["", "", ""];

const Cart = () => {
  {
    return cart.length ? (
      <section className="section cart-skeleton">
        <div className="container">
          <div className="cart_products">
            <div className="cart-row">
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
                    justifyContent: "center",
                  }}
                ></div>
                <div className="product-info">
                  <Skeleton width={100} height={100} />

                  <div>
                    <div className="title">
                      <h3>
                        <Skeleton width={150} />
                      </h3>
                    </div>
                    <div className="tags">
                      <button className="btn">
                        <Skeleton width={30} />
                      </button>
                      <button className="btn">
                        <Skeleton width={30} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="price center">
                  <h3>
                    <Skeleton width={70} height={30} />
                  </h3>
                </div>
                <div className="quantity center">
                  <button className="plus">
                    <LuPlus />
                  </button>
                  <button className="count">0</button>
                  <button className="minus">
                    <LuMinus />
                  </button>
                </div>
                <div className="total center">
                  <h3>
                    <Skeleton width={70} height={30} />
                  </h3>
                </div>
              </div>
            ))}
          </div>
          <div className="cart_totals">
            <div className="box_subtotal">
              <h3>Subtotal:</h3>
              <h3>
                {" "}
                <Skeleton width={70} height={30} />
              </h3>
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
  }
};

export default Cart;
