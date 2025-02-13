import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Loader from "../custom/Loader";
import { Slide, toast } from "react-toastify";

export default function ShopArea() {
  const [filterBy, setFilterBy] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCategories = async () => {
    setIsLoading(true);
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
    setIsLoading(true);
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
  const addToCart = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/cart",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (response.status == 201) {
        toast.success("Product added successfully...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error) {
      toast.info("Product already in the cart !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };
  const addToWishlist = (product) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlistProducts")) || [];

    if (wishlist.some((item) => item._id === product._id)) {
      toast.info("Product already in the wishlist!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }

    wishlist.push(product);
    localStorage.setItem("wishlistProducts", JSON.stringify(wishlist));
    toast.success("Product added to wishlist!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };

  useEffect(() => {
    getCategories();
    getProductsByCategories("66fb864941aba231158e3b4d");
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="shop-area bg-ffffff pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <aside className="widget-area">
                <div className="widget widget_categories">
                  <h3 className="widget-title">Categories</h3>
                  <ul className="categories">
                    {categories.map((category) => (
                      <li
                        onClick={() => getProductsByCategories(category._id)}
                        className={`tab-item${
                          filterBy === `${category._id}` ? " tab-active" : ""
                        }`}
                      >
                        <a>{category.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>

            <div className="col-lg-8 col-md-12">
              <div className="row">
                {products.map((product) => {
                  return (
                    <div className="col-lg-4 col-sm-6" key={product._id}>
                      <div className="single-shop-products">
                        <div className="shop-products-image">
                          <Link to={`/products-details/${product._id}`}>
                            <img src={product.mainImage.secure_url} alt="" />
                          </Link>
                          <div className="tag">New</div>
                          <ul className="shop-action">
                            <li>
                              <span
                                className="addtocart-icon-wrap"
                                onClick={() => addToCart(product._id)}
                              >
                                <FaCartShopping />
                              </span>
                            </li>
                            <li>
                              <span
                                className="addtocart-icon-wrap"
                                onClick={() => addToWishlist(product)}
                              >
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
                            <Link to={`/products-details/${product._id}`}>
                              {product.name}
                            </Link>
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
              <div className="col-lg-12 col-md-12">
                <div className="pagination-area">
                  <a href="#" className="prev page-numbers">
                    <i className="flaticon-left-arrow"></i>
                  </a>
                  <a href="#" className="page-numbers">
                    1
                  </a>
                  <span className="page-numbers current" aria-current="page">
                    2
                  </span>
                  <a href="#" className="page-numbers">
                    3
                  </a>
                  <a href="#" className="page-numbers">
                    4
                  </a>
                  <a href="#" className="next page-numbers">
                    <i className="flaticon-right-arrow"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
