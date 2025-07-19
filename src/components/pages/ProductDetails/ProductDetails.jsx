import "./product_details.css";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CartContext } from "../../context/ProductsContext";

// ICONS
import { FaStar } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { BsCartCheck } from "react-icons/bs";
import ProductDetailsSkeleton from "./productDetailsSkeleton/ProductDetailsSkeleton";

const ProductDetails = () => {
  // // Store the fetched product data
  const [product, setProduct] = useState({});
  // Track loading state while fetching product
  const [loading, setLoading] = useState(true);
  // Main product image shown on product details page
  const [imgProduct, setImgProduct] = useState("");
  // Index of the currently displayed main image
  const [activeImg, setActiveImg] = useState(0);
  const [inCart, setInCart] = useState(false);

  const { cart, setAddToCart } = useContext(CartContext);
  const { id } = useParams();

  // Fetch product data by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
        setImgProduct(data.images[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  // Check if the product is in the cart and update inCart state
  useEffect(() => {
    cart.some((prod) => {
      const isInCart = cart.some((prod) => prod.id === product.id);
      setInCart(isInCart);
    });
  }, [loading, cart, product.id]);

  function handleClickBtnAddToCart() {
    setAddToCart([...cart, { ...product, quantity: 1 }]);
    setInCart(true);
  }

  {
    return loading ? (
      <ProductDetailsSkeleton />
    ) : (
      <section className="product_details">
        <div className="container">
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
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
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
      </section>
    );
  }
};

export default ProductDetails;
