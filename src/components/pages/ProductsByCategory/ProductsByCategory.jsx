import "./products_by_category.css";
import Card from "../../product/Card";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import SkeletonGridProducts from "../../skeleton_grid_products/SkeletonGridProducts";
import { useSelector } from "react-redux";

const ProductsByCategory = () => {
  // Get cart and wish list data from Redux store
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.wishList.wishList);

  // State to store the selected sort option (default: "Recommend")
  const [sort, setSort] = useState("Recommend");

  // Store products from the same category
  const [categoryProducts, setCategoryProducts] = useState([]);
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
        setCategoryProducts(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const sortProducts = useMemo(() => {
    return [...categoryProducts].sort((a, b) => {
      if (sort === "asc") return a.price - b.price; // ترتيب تصاعدي
      if (sort === "desc") return b.price - a.price; // ترتيب تنازلي
      if (sort === "Recommend") return a.id - b.id;
      return 0;
    });
  }, [sort, categoryProducts]);

  return loading ? (
    <SkeletonGridProducts />
  ) : (
    <section className="products_by_category">
      <div className="container">
        <h1 className="title-section">{category}</h1>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value={"Recommend"}>Recommend</option>
          <option value={"asc"}>Price Low to High</option>
          <option value={"desc"}>Price High to Low</option>
        </select>
        <div className="products_container">
          {sortProducts.map((product) => {
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
