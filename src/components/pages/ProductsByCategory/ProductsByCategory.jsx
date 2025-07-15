import { useContext, useEffect, useState } from "react";
import "./products_by_category.css";
import { useParams } from "react-router-dom";
import Card from "../../product/Card";
import { CartContext, WishListContext } from "../../context/ProductsContext";
import ProductSkeleton from "../../product/productSkeleton/ProductSkeleton";

const ProductsByCategory = () => {
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const { cart } = useContext(CartContext);
  const { wishList } = useContext(WishListContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}`
        );
        const data = await res.json();
        console.log(data);
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

//   return loading ? (
//     <ProductSkeleton />
//   ) : (
//     <section className="products_by_category">
//       <div className="container">
//         <h1>{category}</h1>

//         <div className="products_container">
//           {productsOfCategory.map((product) => {
//             const inCart = cart.some((item) => item.id === product.id);
//             const inWishList = wishList.some((item) => item.id === product.id);

//             return (
//               <Card
//                 key={product.id}
//                 product={product}
//                 inCart={inCart}
//                 inWishList={inWishList}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
