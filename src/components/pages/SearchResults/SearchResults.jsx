import "./search_results.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../../product/Card";
import SkeletonGridProducts from "../../skeleton_grid_products/SkeletonGridProducts";
import { useSelector } from "react-redux";

const SearchResults = () => {
  // Get cart and wish list data from Redux store
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.wishList.wishList);

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
