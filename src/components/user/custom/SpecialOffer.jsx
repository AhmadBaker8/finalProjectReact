import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ProductsDetails from "../../../pages/user/productDetails/ProductsDetails";
import ProductsDetailsArea from "../cart/ProductsDetailsArea";

export default function SpecialOffer() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/products?page=1&limit=3`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const navigate = useNavigate();
  const goToProductDetails = (id) => {
    navigate(`/products-details/${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className={"offer-products-area ptb-100"}>
        <div className="container">
          <div className="section-title">
            <h2>Specials Offer</h2>
          </div>

          <div className="row justify-content-center align-items-stretch">
            {products.map((product) => (
              <div
                className="col-lg-4 col-md-12 d-flex"
                key={product._id}
                onClick={() => goToProductDetails(product._id)}
              >
                <div className="single-offer-products d-flex flex-column h-100 w-100">
                  <div className="offer-products-image">
                    <a>
                      <img src={product.mainImage.secure_url} alt="image" />
                    </a>
                    <div className="tag">
                      -{((product.discount / product.price) * 100).toFixed(2)}%
                    </div>
                  </div>

                  <div className="offer-products-content d-flex flex-column justify-content-between flex-grow-1">
                    <span>Gadget</span>
                    <h3>
                      <Link>{product.name}</Link>
                    </h3>
                    <div className="price">
                      <span className="new-price">${product.finalPrice}</span>
                      <span className="old-price">{product.price}</span>
                    </div>
                    <div className="product-review">
                      <div className="rating">
                        {product.reviews.length > 0 ? (
                          (() => {
                            const avgRating =
                              product.reviews.reduce(
                                (sum, review) => sum + review.rating,
                                0
                              ) / product.reviews.length;

                            return Array.from({ length: 5 }, (_, i) => (
                              <FaStar
                                key={i}
                                style={{
                                  color:
                                    i < Math.round(avgRating)
                                      ? "#FFB607"
                                      : "#ccc",
                                }}
                              />
                            ));
                          })()
                        ) : (
                          <span>No Reviews</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
