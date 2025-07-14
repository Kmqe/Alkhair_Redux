import "./wish_list.css";
import { useContext } from "react";
import { CartContext, WishListContext } from "../../context/ProductsContext";
import Card from "../../product/Card";

const WishList = () => {
  const { wishList, setWishList } = useContext(WishListContext);
  const { cart } = useContext(CartContext);

  return (
    <section className="wish-list">
      <div className="container">
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
    </section>
  );
};

export default WishList;
