import React from 'react'
import micro from "../../../assets/images/collection/micro.png";
import lights from "../../../assets/images/collection/lights.png";
import { Link } from 'react-router-dom';
import CustomButton from './CustomButton';

export default function Collection() {
  return (
    <>
    <section className="collection-area ptb-100">
      <div className="container">
        <div className="collection-inner-box">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-6">
              <div className="collection-image">
                <img src={micro} alt="image" />
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="collection-content">
                <span>New Arrival</span>
                <h3>Best Gadget</h3>
                <p>Collection</p>
                <CustomButton/>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="collection-image">
                <img src={lights} alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
      
    </>
  )
}
