import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Loader from "../custom/Loader";
import { CartContext } from "../context/CartContext";

export default function CheckoutArea() {

  const {register,handleSubmit,setError:{errors}} = useForm();
  const {setCartCount} = useContext(CartContext);
  const location = useLocation();
  const { total, shipping, subTotal } = location.state || { total: 0, shipping: 0, subTotal: 0 };
  const [order,setOrder] = useState();
  const [isLoading,setIsLoading] = useState(false);

  const createOrder = async (value)=>{
    setIsLoading(true);
    try{
      const token = localStorage.getItem('userToken');
      const response = await axios.post(`${import.meta.env.VITE_BURL}/order`,
      value,
      {
        headers:{
          Authorization:`Tariq__${token}`
        }
      }
    );
    if(response.status == 201){
      toast.success(`The order has been created`,{
        position:"top-right",
        autoClose:4000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
        transition:Bounce,
      });
    }
    setOrder(response.data.order);
    setCartCount(0);

    }catch(error){
      toast.error(`${error.message}`,{
        position:"top-right",
        autoClose:4000,
        hideProgressBar:false,
        closeOnClick:true,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
        transition:Bounce,
      });
    }
    finally{
      setIsLoading(false);
    }
    
  }
  if(isLoading){
    return <Loader/>
  }

  return (
    <>
      <section className="checkout-area ptb-50">
        <div className="container">
          <form onSubmit={handleSubmit(createOrder)}>
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="billing-details">
                  <h3 className="title">Shipping Details</h3>

                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="first_name"
                          className="form-control"
                          placeholder="First Name*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="last_name"
                          className="form-control"
                          placeholder="Last Name*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="address"
                          className="form-control"
                          placeholder="Address*"
                          {...register('address',{required:"address is required"})}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <input
                          type="text"
                          id="city"
                          className="form-control"
                          placeholder="Town/City*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                      <div className="form-group">
                        <input
                          type="text"
                          id="zip"
                          className="form-control"
                          placeholder="ZIP Code*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                      <div className="form-group">
                        <input
                          type="text"
                          id="country"
                          className="form-control"
                          placeholder="Country*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-3">
                      <div className="form-group">
                        <input
                          type="text"
                          id="phone"
                          className="form-control"
                          placeholder="Phone*"
                          {...register('phone',{required:"phone is required !"})}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          placeholder="Email Address*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <textarea
                          name="coupon"
                          id="coupon"
                          placeholder="coupon name"
                          className="form-control"
                          {...register('couponName')}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12">
                <div className="order-details">
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
                  </div>

                  <div className="payment-box">
                    <h3 className="title">Payment Method</h3>

                    <div className="payment-method">
                      <p>
                        <input
                          type="radio"
                          id="cash-on-delivery"
                          name="radio-group"
                        />
                        <label htmlFor="cash-on-delivery">
                          Cash on Delivery
                        </label>
                      </p>
                      <p>
                        <input
                          type="radio"
                          id="check-payments"
                          name="radio-group"
                        />
                        <label htmlFor="check-payments">Credit Card</label>
                      </p>
                      <p>
                        <input type="radio" id="paypal" name="radio-group" />
                        <label htmlFor="paypal">PayPal</label>
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="default-btn"
                      style={{ cursor: "pointer" }}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
