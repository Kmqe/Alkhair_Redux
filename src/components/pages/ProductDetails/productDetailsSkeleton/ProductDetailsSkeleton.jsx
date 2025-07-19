import "./product_details_skeleton.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const product = ["", "", ""];

const ProductDetailsSkeleton = () => {
  return (
    <section className="product_details place-holder">
      <div className="container">
        <div className="imgs_items">
          <div className="big_img">
            <Skeleton width={"95%"} height={"300px"} />
          </div>
          <div className="small_imgs">
            {product.map((_, index) => (
              <Skeleton width={80} height={80} key={index} />
            ))}
          </div>
        </div>
        <div className="product_info">
          <h1 className="title">
            <Skeleton width={"100%"} />
          </h1>

          <h2 className="price">
            <Skeleton width={100} />{" "}
          </h2>
          <strong className="availability strong">
            <Skeleton width={90} />{" "}
            <span>
              <Skeleton width={40} />
            </span>
          </strong>
          <strong className="availability strong">
            <Skeleton width={90} />{" "}
            <span>
              <Skeleton width={40} />
            </span>
          </strong>

          <p className="description">
            <Skeleton width={400} />
          </p>
          <p className="description">
            <Skeleton width={200} />
          </p>
          <h1>
            <Skeleton width={200} height={50} style={{ marginTop: "30px" }} />
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSkeleton;
