import "./wish_list.css";
import Card from "../../product/Card";
import "../../product/productSkeleton/ProductSkeleton";
import { useSelector } from "react-redux";

const WishList = () => {
  // Get cart and wish list data from Redux store
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.wishList.wishList);

  return (
    <section className="wish-list">
      <div className="container">
        <h1 className="title-section">My Wish List</h1>
        <div className="products_container">
          {wishList.map((product) => {
            const inWishList = true;
            const inCart = cart.some((item) => item.id === product.id);
            return (
              <Card
                product={product}
                key={product.id}
                inWishList={inWishList}
                inCart={inCart}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WishList;
