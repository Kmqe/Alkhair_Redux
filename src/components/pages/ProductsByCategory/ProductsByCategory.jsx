import "./products_by_category.css";
import Card from "../../product/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SkeletonGridProducts from "../../skeleton_grid_products/SkeletonGridProducts";
import { useSelector } from "react-redux";

const ProductsByCategory = () => {
  // Get cart and wish list data from Redux store
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.wishList.wishList);

  // Store products from the same category
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  // Get the category to fetch products from API
  const { category } = useParams();

  // Fetch products of the selected category when category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        setProductsOfCategory(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return loading ? (
    <SkeletonGridProducts />
  ) : (
    <section className="products_by_category">
      <div className="container">
        <h1 className="title-section">{category}</h1>
        <div className="products_container">
          {productsOfCategory.map((product) => {
            const inCart = cart.some((item) => item.id === product.id);
            const inWishList = wishList.some((item) => item.id === product.id);
            return (
              <Card
                key={product.id}
                product={product}
                inCart={inCart}
                inWishList={inWishList}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsByCategory;
