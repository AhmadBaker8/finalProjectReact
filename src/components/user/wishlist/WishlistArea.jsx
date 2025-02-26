import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { Slide, toast } from "react-toastify";
import axios from "axios";
import ModalLoader from "../custom/ModalLoader";

export default function WishlistArea() {
  const [wishlist, setWishlist] = useState([]);
  const [myLoader, setMyLoader] = useState(false);

  const loadWishlist = () => {
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlistProducts")) || [];
    setWishlist(storedWishlist);
  };
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((product) => product._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlistProducts", JSON.stringify(updatedWishlist));

    toast.success("Product removed from wishlist!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
    });
  };
  const addToCart = async (id) => {
    setMyLoader(true);
    try {
      const token = localStorage.getItem("userToken");
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
    } finally {
      setMyLoader(false);
    }
  };
  useEffect(() => {
    loadWishlist();
  }, []);

  if (wishlist.length === 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center ptb-100"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <h3 className="ps-5">Empty Wishlist</h3>
      </div>
    );
  }
  return (
    <>
      <ModalLoader show={myLoader} />
      <section className="wishlist-area ptb-50">
        <div className="container">
          <div className="wishlist-table table-responsive">
            <div className="wishlist-title">
              <h2>My Wishlist</h2>
            </div>

            <table className="table table-bordered">
              <tbody>
                {wishlist.map((product) => {
                  return (
                    <tr key={product._id}>
                      <td className="product-remove">
                        <a
                          className="remove"
                          onClick={() => removeFromWishlist(product._id)}
                        >
                          <i className="bx bx-x"></i>
                        </a>
                      </td>

                      <td className="product-thumbnail">
                        <Link to={`/products-details/${product._id}`}>
                          <img src={product.mainImage.secure_url} alt="item" />
                        </Link>
                      </td>

                      <td className="product-name">
                        <Link to={`/products-details/${product._id}`}>
                          {product.name.slice(0, 20)}
                        </Link>
                      </td>

                      <td className="product-price">
                        <span className="unit-amount">
                          ${product.finalPrice}
                        </span>
                      </td>

                      <td className="product-stock">
                        <span className="stock">In Stock</span>
                      </td>

                      <td className="product-btn">
                        <a
                          className="default-btn"
                          onClick={() => addToCart(product._id)}
                        >
                          <FaCartShopping />
                          Add to Cart
                          <span></span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
