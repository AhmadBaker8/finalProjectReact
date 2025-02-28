import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import Loader from "../custom/Loader";
import { Slide, toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import ModalLoader from "../custom/ModalLoader";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ShopArea() {
  const [filterBy, setFilterBy] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myLoader, setMyLoader] = useState(false);
  const { cartCount, setCartCount } = useContext(CartContext);
  const [sortBy, setSortBy] = useState("");
  const [searchOn, setSearchOn] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const getCategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/categories`
      );
      setCategories(data.categories);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const getProductsByCategories = async (id, page = 1) => {
    setMyLoader(true);
    setFilterBy(id);
    setCurrentPage(page);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/products/category/${id}`
      );
      setProducts(data.products);
      setTotalPages(Math.ceil(data.products.length / itemsPerPage));
    } catch (error) {
    } finally {
      setMyLoader(false);
    }
  };
  const addToCart = async (id) => {
    const token = localStorage.getItem("userToken");
    setMyLoader(true);
    try {
      
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/cart`,
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
      setCartCount(cartCount + 1);
    } catch (error) {
      if(token){
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
      else{
        Swal.fire({
          icon: "warning",
          title: "You are not logged in!",
          text: "Please log in to add items to your cart.",
          confirmButtonText: "OK",
        });
        return;
      }
    } finally {
      setMyLoader(false);
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
  const getAllProducts = async (
    sort = sortBy,
    page = currentPage,
    search = searchOn
  ) => {
    setMyLoader(true);
    setCurrentPage(page);
    setSortBy(sort);
    setSearchOn(search);

    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BURL
        }/products?page=${page}&limit=${itemsPerPage}&sort=${sort}&search=${search}`
      );
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      console.log(error);
    } finally {
      setMyLoader(false);
    }
  };

  useEffect(() => {
    getCategories();
    getAllProducts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ModalLoader show={myLoader} />
      <section className="shop-area bg-ffffff pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <aside className="widget-area">
                <div className="widget widget_search">
                  <form
                    className="search-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      getAllProducts(sortBy, 1, searchOn);
                    }}
                  >
                    <label>
                      <span className="screen-reader-text">Search for:</span>
                      <input
                        type="search"
                        className="search-field"
                        placeholder="Search..."
                        onChange={(e) => setSearchOn(e.target.value)}
                      />
                    </label>
                    <button type="submit">
                      <i className="bx bx-search-alt"></i>
                    </button>
                  </form>
                </div>
                <div className="widget widget_categories">
                  <h3 className="widget-title">Categories</h3>
                  <ul className="categories">
                    {categories.map((category) => (
                      <li key={category._id}
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

            <div className="col-lg-8 col-md-12 d-flex flex-column gap-3">
              <div className="col-lg-4 col-md-4 align-self-end">
                <div className="products-ordering-list">
                  <select
                    className="form-control"
                    onChange={(e) =>
                      getAllProducts(e.target.value, 1, searchOn)
                    }
                  >
                    <option value={""}>Default sorting</option>
                    <option value={"finalPrice"}>
                      Sort by price: low to high
                    </option>
                    <option value={"-finalPrice"}>
                      Sort by price: high to low
                    </option>
                    <option value={"name"}>Sort by name</option>
                    <option value={"rating"}>Sort by average rating</option>
                  </select>
                </div>
              </div>
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
                          <span>${product.finalPrice}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="col-lg-12 col-md-12">
                <div className="pagination-area">
                  <a
                    className={`next page-numbers ${
                      currentPage === 1 ? "disabled-button" : ""
                    }`}
                    onClick={() =>
                      getAllProducts(sortBy, currentPage - 1, searchOn)
                    }
                  >
                    <FaLongArrowAltLeft />
                  </a>

                  <span className="page-numbers current">
                    {" "}
                    Page {currentPage} of {totalPages}{" "}
                  </span>

                  <a
                    className={`next page-numbers ${
                      currentPage >= totalPages ? "disabled-button" : ""
                    }`}
                    onClick={() =>
                      getAllProducts(sortBy, currentPage + 1, searchOn)
                    }
                  >
                    <FaLongArrowAltRight />
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
