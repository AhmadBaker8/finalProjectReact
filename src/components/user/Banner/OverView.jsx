import React from 'react'
import table from "../../../assets/images/overview/table.png";
import clothes from "../../../assets/images/overview/clothes1.png";
import CustomButton from '../custom/CustomButton';

export default function OverView() {
  return (
    <>
    <section className="overview-area pt-100 pb-20 -mt-16">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="single-overview">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="overview-image">
                    <img src={table} alt="image" />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="overview-content">
                    <h3>Special Discount Offer</h3>
                    <p>for 12-12 Festival</p>
                    <span className='price'>$499.00</span>
                    <CustomButton/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="single-overview-item">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <div className="overview-content">
                    <p>Featured</p>
                    <h3>Best Price & Great Quality</h3>
                    <span className='discount'>50% Off</span>
                    <CustomButton/>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="overview-image">
                    <img src={clothes} alt="image" />
                  </div>
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
