import "./product_details.css";

import { format, compareAsc } from "date-fns";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CartContext, WishListContext } from "../../context/ProductsContext";

// ICONS
import { FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { BsCartCheck } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation } from "swiper/modules";

import ProductDetailsSkeleton from "./productDetailsSkeleton/ProductDetailsSkeleton";
import Card from "../../product/Card";

const ProductDetails = () => {
  // Store the fetched product data
  const [product, setProduct] = useState({});
  // Track loading state while fetching product
  const [loading, setLoading] = useState(true);
  // Main product image shown on product details page
  const [imgProduct, setImgProduct] = useState("");
  // Index of the currently displayed main image
  const [activeImg, setActiveImg] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [rating, setRating] = useState([0]);

  const [reviews, setReviews] = useState([]);

  const [productsOfArray, setProductsOfArray] = useState([]);

  const { cart, setAddToCart } = useContext(CartContext);
  const { wishList, setWishList } = useContext(WishListContext);
  const { id } = useParams();

  const inWishList = wishList.some((item) => item.id === product.id);

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        const response2 = await fetch(
          `https://dummyjson.com/products/category/${data.category}`
        );
        const data1 = await response2.json();
        setProduct(data);
        setReviews(data.reviews);
        setLoading(false);
        setImgProduct(data.images[0]);
        setRating(Array(Math.ceil(data.rating)).fill(0));
        setProductsOfArray(data1.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Check if the product is in the cart and update inCart state
  useEffect(() => {
    const isInCart = cart.some((prod) => prod.id === product.id);
    setInCart(isInCart);
  }, [loading, cart, product.id]);

  function handleClickBtnAddToCart() {
    setAddToCart([...cart, { ...product, quantity: 1 }]);
    setInCart(true);
  }

  // Add or remove product from wishlist depending on its current presence
  function handleCLickBtnAddToWishList(product) {
    const find = wishList.some((item) => item.id === product.id);
    if (find) {
      const newListOfWish = wishList.filter((item) => item.id !== product.id);
      setWishList(newListOfWish);
    } else {
      setWishList([...wishList, product]);
    }
  }

  // reviews.map((review) => {
  //   console.log(review);
  // });
  // console.log(reviews);
  // const rating = Array(Math.ceil(product.rating)).fill(0);
  return loading ? (
    <ProductDetailsSkeleton />
  ) : (
    <section className="product_details">
      <div className="container">
        <div className="row1">
          <div className="imgs_items">
            <div className="big_img">
              <img src={imgProduct} alt={product.title} />
            </div>
            <div className="small_imgs">
              {product.images.map((img, index) => (
                <img
                  className={activeImg === index ? "active" : ""}
                  src={img}
                  key={index}
                  onClick={() => {
                    setImgProduct(img);
                    setActiveImg(index);
                  }}
                />
              ))}
            </div>
          </div>
          <div className="product_info">
            <h1 className="title">{product.title}</h1>
            <div className="rating">
              {rating.map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <h2 className="price">${product.price}</h2>
            <strong className="availability strong">
              Availability: <span>{product.availabilityStatus}</span>
            </strong>
            {product.brand ? (
              <strong className="brand strong">
                Brand: <span>{product.brand}</span>
              </strong>
            ) : (
              ""
            )}
            <p className="description">{product.description}</p>

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

            <button
              className={`btn ${inCart ? "active" : ""}`}
              onClick={() => handleClickBtnAddToCart()}
            >
              {inCart ? (
                <>
                  <BsCartCheck />
                  Item In Cart
                </>
              ) : (
                <div>
                  <TiShoppingCart />
                  Add To Cart
                </div>
              )}
            </button>
          </div>
        </div>

        <div className="products-category">
          <h1>{product.category}</h1>

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
                slidesPerView: 5,
              },
            }}
            spaceBetween={30}
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {productsOfArray.map((product) => {
              const inCart = cart.some((item) => item.id === product.id);
              const inWishList = wishList.some(
                (item) => item.id === product.id
              );

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
        </div>

        <div className="comments-content">
          <h1>Reviews</h1>
          {reviews.map((review, index) => {
            return (
              <div className="comment-block" key={index}>
                <div className="customer-info">
                  <span className="avtar">{review.reviewerName.charAt(0)}</span>
                  <div className="name-date">
                    <p className="customer-name">{review.reviewerName}</p>
                    {/* <p className="date-publish">{review.date}</p> */}
                    <p className="date-publish">
                      {format(review.date, "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="customer-rating">
                  {Array(5)
                    .fill(0)
                    .map((star, index) =>
                      review.rating < index + 1 ? (
                        <FaStar key={index} color="ccc" />
                      ) : (
                        <FaStar
                          key={index}
                          className={`stars-${review.rating}`}
                        />
                      )
                    )}
                </div>
                <p className="customer-comment">{review.comment}</p>
              </div>
            );
          })}
          {/* <div className="comment-block">
            <div className="customer-info">
              <span className="avtar"></span>
              <div className="name-date">
                <p className="customer-name"></p>
                <p className="date-publish"></p>
              </div>
            </div>
            <div className="customer-rating"></div>
            <p className="customer-comment"></p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
