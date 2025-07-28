import "./product_details_skeleton.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const product = ["", "", ""];

const ProductDetailsSkeleton = () => {
  return (
    <section className="product_details place-holder">
      <div className="container">
        <div className="row1">
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
              <Skeleton width={"120%"} />
            </h1>

            <h2 className="price">
              <Skeleton width={150} />{" "}
            </h2>
            <strong className="availability strong">
              <Skeleton width={100} />{" "}
              <span>
                <Skeleton width={50} />
              </span>
            </strong>
            <strong className="availability strong">
              <Skeleton width={100} />{" "}
              <span>
                <Skeleton width={50} />
              </span>
            </strong>

            <p className="description">
              <Skeleton width={400} />
            </p>
            <p className="description">
              <Skeleton width={400} />
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              <Skeleton width={50} height={50} style={{ marginTop: "20px" }} />
              <Skeleton width={50} height={50} style={{ marginTop: "20px" }} />
            </div>
            <h1>
              <Skeleton width={200} height={50} style={{ marginTop: "30px" }} />
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsSkeleton;
