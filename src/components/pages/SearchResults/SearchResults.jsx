import { useEffect, useState, useContext } from "react";
import "./search_results.css";
import { useSearchParams } from "react-router-dom";

import { CartContext, WishListContext } from "../../context/ProductsContext";
import Card from "../../product/Card";

const SearchResults = () => {
  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishListContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/proddducts/search?q=${query}`
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
    <section className="search-result">
      <div className="container">
        <h1 className="text-center">Lodaing...</h1>
      </div>
    </section>
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
