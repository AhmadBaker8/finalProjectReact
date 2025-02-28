import axios from "axios";
import React, { useContext, useState } from "react";
import Loader from "../custom/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import ModalLoader from "../custom/ModalLoader";

export default function CartArea() {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myLoader, setMyLoader] = useState(false);
  const { cartCount, setCartCount } = useContext(CartContext);
  const token = localStorage.getItem("userToken");

  const getCart = async () => {
    setIsLoading(true);
    try {
      if(token){
      const response = await axios.get(`${import.meta.env.VITE_BURL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCart(response.data.products);
    }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const removeItemFromCart = async (id) => {
    setMyLoader(true);
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}/cart/removeItem`,
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
      setCartCount(cartCount - 1);
      toast.info("Product has been removed!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setMyLoader(false);
    }
  };
  const clearAllCart = async () => {
    const token = localStorage.getItem("userToken");
    setMyLoader(true);
    try{  
      const response = await axios.patch(
        `${import.meta.env.VITE_BURL}/cart/clear`,
        null,
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCart([]);
      setCartCount(0);
      if(response.status == 200){
        toast.info("The products has been removed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }catch(error){
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }finally{
      setMyLoader(false)
    }
  };
  const decreaseQty = async (productId) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
      {
        productId: productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId == productId) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };
  const increaseQty = async (productId) => {
    const token = localStorage.getItem("userToken");
    const response = await axios.patch(
      `https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
      {
        productId: productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.productId == productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };
  const subTotal = cart.reduce(
    (acc, item) => acc + item.quantity * parseInt(item.details.finalPrice),
    0
  );
  const shipping = 30.0;
  const total = shipping + subTotal;

  useState(() => {
    getCart();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  if (cart.length == 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center ptb-100"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <h3 className="ps-5">Empty cart</h3>
      </div>
    );
  }
  return (
    <>
      <ModalLoader show={myLoader} />
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
                                style={{ cursor: "pointer" }}
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
                                <span
                                  className="minus-btn"
                                  onClick={() =>
                                    decreaseQty(cartItem.productId)
                                  }
                                >
                                  <i className="bx bx-minus"></i>
                                </span>
                                <input
                                  type="number"
                                  value={cartItem.quantity}
                                  min="1"
                                  max={cartItem.details.stock}
                                />
                                <span
                                  className="plus-btn"
                                  onClick={() =>
                                    increaseQty(cartItem.productId)
                                  }
                                >
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
                    Subtotal <span>${subTotal.toFixed(2)}</span>
                  </li>
                  <li>
                    Shipping <span>${shipping.toFixed(2)}</span>
                  </li>
                  <li>
                    Total <span>${total.toFixed(2)}</span>
                  </li>
                  <li>
                    Payable Total <span>${total.toFixed(2)}</span>
                  </li>
                </ul>

                <button className="proceed_button">
                  {
                    <Link
                      to="/checkout"
                      className="default-btn"
                      state={{
                        total: total,
                        shipping: shipping,
                        subTotal: subTotal,
                      }}
                    >
                      Proceed to Checkout
                      <span></span>
                    </Link>
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
