import React from 'react'
import CustomNavbar from '../../../components/user/navbar/CustomNavbar'
import Footer from '../footer/Footer'

export default function Checkout() {
  return (
    <>
    <section className="checkout-area ptb-50">
      <div className="container">
        <form>
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
                        name="notes"
                        id="notes"
                        cols="30"
                        rows="3"
                        placeholder="Order Notes"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="billing-details py-5">
                <h3 className="title">Billing Details</h3>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input mt-1 h-5 w-5"
                        id=""
                        />
                      <label
                        className="form-check-label ml-2"
                        htmlFor="create-an-account"
                      >
                        Same as Shipping Details
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {<div className="flex justify-start">
                  <div className="w-50">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="PayPal Email*"
                      />
                  </div>
                  <img className="w-20 bg-white ml-2 p-2  rounded-lg" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"/>
                  </div>}
              
              
            </div>

            <div className="col-lg-4 col-md-12">
              <div className="order-details">
                <div className="cart-totals">
                  <h3>Cart Totals</h3>

                  <ul>
                    <li>
                      <span>
                        
                      </span>
                    </li>
                    <li>
                      Shipping <span>$30.00</span>
                    </li>
                    <li>
                      <span>
                        
                      </span>
                    </li>
                    <li>
                      <span>
                        
                      </span>
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
                      <label htmlFor="cash-on-delivery">Cash on Delivery</label>
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
                      <input type="radio"
                      id="paypal"
                      name="radio-group" 
                      />
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
    <Footer/>
      
    </>
  )
}
