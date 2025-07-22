import { useEffect, useState, useContext } from "react";
import "./search_results.css";
import { useSearchParams } from "react-router-dom";

import { CartContext, WishListContext } from "../../context/ProductsContext";
import Card from "../../product/Card";

import SkeletonGridProducts from "../../skeleton_grid_products/skeletonGridProducts";

const SearchResults = () => {
  // Retrieve all products from the cart context
  const { cart } = useContext(CartContext);
  // Retrieve all products from the wishlist context
  const { wishList } = useContext(WishListContext);
  // Show skeleton placeholder until data is fetched from the server
  const [loading, setLoading] = useState(true);
  // State to hold products fetched from the API
  const [products, setProducts] = useState([]);
  // Get query parameters from the URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return loading ? (
    <SkeletonGridProducts />
  ) : (
    <section className="search-result">
      <div className="container">
        <h1>Results for : {query}</h1>

        <div className="products_container">
          {products.map((product) => {
            const inWishList = wishList.some((item) => item.id === product.id);
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

export default SearchResults;
