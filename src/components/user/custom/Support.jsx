import React from 'react'
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiRefund2Fill } from "react-icons/ri";
import { RiSecurePaymentFill } from "react-icons/ri";
import { RiCustomerService2Fill } from "react-icons/ri";

export default function Support() {
  return (
    <>
    <section className={"support-area ptb-100"}>
      <div className="container">
        <div className="support-inner-box">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-support">
                <div className="icon">
                    <LiaShippingFastSolid style={{ width: "40px",height:"40px"}}/>
                </div>

                <div className="support-content">
                  <h3>Shipping Worldwide</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-support">
                <div className="icon">
                 <RiRefund2Fill style={{ width: "40px",height:"40px"}} />
                </div>

                <div className="support-content">
                  <h3>30 Days Refund</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-support">
                <div className="icon">
                  <RiSecurePaymentFill style={{ width: "40px",height:"40px"}}/>
                </div>

                <div className="support-content">
                  <h3>100% Secure Payment</h3>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="single-support">
                <div className="icon">
                    <RiCustomerService2Fill style={{ width: "40px",height:"40px"}}/>
                </div>

                <div className="support-content">
                  <h3>24/7 Customer Support</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      
    </>
  )
}
