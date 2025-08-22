import "./products.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Autoplay } from "swiper/modules";

import Card from "./Card";
import { useSelector } from "react-redux";

const Products = ({ category, productsOfArray }) => {
  // Get cart and wish list data from Redux store
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.wishList.wishList);

  return (
    <section className="product">
      <h1 className="title-section">{category.replaceAll("-", " ")}</h1>
      <>
        <Swiper
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
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
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {productsOfArray.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);
            const inWishList = wishList.some((item) => item.id === product.id);
            return (
              <SwiperSlide key={product.id}>
                <Card
                  product={product}
                  inCart={inCart}
                  inWishList={inWishList}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    </section>
  );
};

export default Products;
