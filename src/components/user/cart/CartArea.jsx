import axios from "axios";
import React, { useState } from "react";
import Loader from "../custom/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function CartArea() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCart = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        "https://ecommerce-node4.onrender.com/cart",
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCart(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const removeItemFromCart = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.patch(
        `https://ecommerce-node4.onrender.com/cart/removeItem`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      setCart((prevCart) => {
        return prevCart.filter((item) => item.productId !== id);
      });

      toast.info("Product has been removed!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const clearAllCart = async () => {
    const token = localStorage.getItem("userToken");
    const response = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/clear`,
      null,
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setCart([]);
  };

  useState(() => {
    getCart();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if(cart.length == 0){
    return <div className="d-flex align-items-center justify-content-center ptb-100" style={{backgroundColor:"#F5F5F5"}}>
      <h3 className="ps-5">Empty cart</h3>
    </div>
  }
  return (
    <section className="cart-area ptb-50">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <form>
              <div className="cart-table table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Name</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {cart.map((cartItem) => {
                      return (
                        <tr className="top-className" key={cartItem._id}>
                          <td className="product-thumbnail">
                            <span
                              onClick={() =>
                                removeItemFromCart(cartItem.productId)
                              }
                              className="remove"
                            >
                              <i className="bx bx-x"></i>
                            </span>
                            <Link
                              to={`/products-details/${cartItem.productId}`}
                            >
                              <img
                                src={cartItem.details.mainImage.secure_url}
                                width={70}
                              />
                            </Link>
                          </td>

                          <td className="product-name">
                            <Link to={`/products-details/${cartItem._id}`}>
                              {cartItem.details.name.slice(0, 30)}
                            </Link>
                          </td>

                          <td className="product-price">
                            <span className="unit-amount">
                              ${cartItem.details.finalPrice}
                            </span>
                          </td>

                          <td className="product-quantity">
                            <div className="input-counter">
                              <span className="minus-btn">
                                <i className="bx bx-minus"></i>
                              </span>
                              <input
                                type="number"
                                value={cartItem.quantity}
                                min="1"
                                max={cartItem.details.stock}
                              />
                              <span className="plus-btn">
                                <i className="bx bx-plus"></i>
                              </span>
                            </div>
                          </td>

                          <td className="product-subtotal">
                            <span className="subtotal-amount">
                              $
                              {cartItem.quantity *
                                parseInt(cartItem.details.finalPrice)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <a
                className="btn btn-primary my-4"
                onClick={() => clearAllCart()}
              >
                clear all
              </a>

              <div className="cart-buttons">
                <div className="row align-items-center">
                  <div className="col-lg-7 col-sm-7 col-md-7">
                    <div className="shopping-coupon-code">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Coupon code"
                        name="coupon-code"
                        id="coupon-code"
                      />
                      <button type="submit">Apply Coupon</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-4 col-md-12">
            <div className="cart-totals">
              <h3>Cart Totals</h3>

              <ul>
                <li>
                  Subtotal <span>$</span>
                </li>
                <li>
                  Shipping <span>$30.00</span>
                </li>
                <li>
                  Total <span>$</span>
                </li>
                <li>
                  Payable Total <span>$</span>
                </li>
              </ul>

              <button className="proceed_button">
                {cart.length === 0 ? (
                  <Link
                    to=""
                    className="disable-btn"
                    onClick={(event) => event.preventDefault()}
                  >
                    Proceed to Checkout
                    <span></span>
                  </Link>
                ) : (
                  <Link to="/checkout" className="default-btn">
                    Proceed to Checkout
                    <span></span>
                  </Link>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
