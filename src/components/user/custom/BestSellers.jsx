import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Loader from "./Loader";

export default function BestSellers() {
  const [filterBy, setFilterBy] = useState("66fb864941aba231158e3b4d");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/categories`
      );
      setCategories(data.categories);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const getProductsByCategories = async (id) => {
    setFilterBy(id);
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/products/category/${id}`
      );
      setProducts(data.products);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
    getProductsByCategories("66fb864941aba231158e3b4d");
  }, []);

  if (isLoading) {
    return <Loader/>
  }
  return (
    <>
      <section className={"bestsellers-area ptb-100"}>
        <div className="container">
          <div className="section-title">
            <h2>Best Sellers</h2>
          </div>
          <div className="tab bestsellers-list-tab">
            <ul className="tabs">
              {categories.map((category) => (
                <li
                  onClick={() => getProductsByCategories(category._id)}
                  className={`tab-item${
                    filterBy === `${category._id}` ? " tab-active" : ""
                  }`}
                >
                  <span>{category.name}</span>
                </li>
              ))}
            </ul>
            <div className="tab_content">
              <div className="tabs_item">
                <div className="row">
                  {products.map((product) => {
                    return (
                      <div className="col-lg-3 col-sm-6" key={product._id}>
                        <div className="single-shop-products">
                          <div className="shop-products-image">
                            <Link to={`/`}>
                              <img src={product.mainImage.secure_url} alt="" />
                            </Link>
                            <div className="tag">New</div>
                            <ul className="shop-action">
                              <li>
                                <span className="addtocart-icon-wrap">
                                  <FaCartShopping />
                                </span>
                              </li>
                              <li>
                                <span className="addtocart-icon-wrap">
                                  <FaRegHeart />
                                </span>
                              </li>
                              <li>
                                <span
                                  data-toggle="modal"
                                  data-target="#productsQuickView"
                                  className="quick-icon"
                                >
                                  <FaRegEye />
                                </span>
                              </li>
                            </ul>
                          </div>

                          <div className="shop-products-content">
                            <h3>
                              <Link to={`/`}>{product.name}</Link>
                            </h3>
                            <ul className="rating">
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                              <li>
                                <FaStar style={{ color: "#FFB607" }} />
                              </li>
                            </ul>
                            <span>$150.00</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
