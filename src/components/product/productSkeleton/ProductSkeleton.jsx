import "./productsSkeleton.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://dummyjson.com/products/category/smartphones"
        );
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="product-skeleton">
      <div className="container">
        <h1>
          <Skeleton width={200} />
        </h1>
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
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <div className="card_product">
                  <div className="img_content">
                    <Skeleton width={"100%"} height={207} />
                  </div>
                  <div className="card_info">
                    <p>
                      <Skeleton width={100} />
                    </p>
                    <div>
                      <h3>
                        <Skeleton width={"100%"} />
                      </h3>
                    </div>
                    <p className="brand">
                      <span>
                        <Skeleton width={100} />
                      </span>
                    </p>
                  </div>
                  <div className="price_and_cart">
                    <div className="price">
                      <span>
                        <Skeleton width={70} />
                      </span>
                      <span>
                        <Skeleton width={40} />
                      </span>
                    </div>
                    <div className="add_to_cart">
                      <h5>
                        <Skeleton width={80} height={30} />
                      </h5>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductSkeleton;
