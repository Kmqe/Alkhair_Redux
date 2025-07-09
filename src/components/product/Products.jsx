import "./products.css";

import { useContext } from "react";
import { CartContext } from "../context/ProductsContext";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";
// ICONS
import { FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { Link } from "react-router-dom";

const Products = ({ category, productsOfArray, loading }) => {
  const { cart, setAddToCart } = useContext(CartContext);

  function handleClickBtnAddToCart(product) {
    setAddToCart([...cart, { ...product, quantity: 1 }]);
  }

  return loading ? (
    <p>Loading...</p>
  ) : (
    <section className="product">
      <h1>{category.replaceAll("-", " ")}</h1>
      <>
        <Swiper
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {productsOfArray.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);

            return (
              <SwiperSlide key={product.id}>
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
                      <span>
                        <FaRegHeart />
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
                          (
                            product.price /
                            (1 - product.discountPercentage / 100)
                          ).toFixed(2)}
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    </section>
  );
};

export default Products;
