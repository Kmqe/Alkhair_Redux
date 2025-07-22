import "./skeleton_grid_products.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonGridProducts = () => {
  const products = ["", "", "", ""];

  return (
    <section className="skeleton_grid_products">
      <div className="container">
        <h1>
          <Skeleton width={200} />
        </h1>
        <div className="products_container">
          {products.map((product, index) => {
            return (
              <div className="card_product" key={index}>
                <div className="img_content">
                  <Skeleton width={"100%"} height={207} />
                </div>
                <div className="card_info">
                  <p>
                    <Skeleton width={100} />
                  </p>
                  <div>
                    <h3>
                      <Skeleton width={"100%"} />
                    </h3>
                  </div>
                  <p className="brand">
                    <span>
                      <Skeleton width={100} />
                    </span>
                  </p>
                </div>
                <div className="price_and_cart">
                  <div className="price">
                    <span>
                      <Skeleton width={70} />
                    </span>
                    <span>
                      <Skeleton width={40} />
                    </span>
                  </div>
                  <div className="add_to_cart">
                    <h5>
                      <Skeleton width={80} height={30} />
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkeletonGridProducts;
