import Products from "../product/Products";
import ProductSkeleton from "../product/productSkeleton/ProductSkeleton";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/ProductSlice";

const Home = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="container">
      {loading ? (
        <ProductSkeleton />
      ) : (
        allProducts.map((item, index) => {
          return (
            <Products
              key={index}
              productsOfArray={item.products}
              category={item.category}
              loading={loading}
            />
          );
        })
      )}
    </div>
  );
};

export default Home;
