import "./products_by_category.css";
import Card from "../../product/Card";
import ProductSkeleton from "../../product/productSkeleton/ProductSkeleton";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext, WishListContext } from "../../context/ProductsContext";

const ProductsByCategory = () => {
  // Store products from the same category
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  // Get the category to fetch products from API
  const { category } = useParams();
  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishListContext);

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
    <ProductSkeleton />
  ) : (
    <section className="products_by_category">
      <div className="container">
        <h1>{category}</h1>

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
