import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import headphone from "../../../assets/images/banner/headphone1.png";
import clothes from "../../../assets/images/banner/clothes1.svg";
import landing from "../../../assets/images/banner/landing.jpg";
import CustomButton from '../custom/CustomButton';
import './Banner.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";



export default function Banner() {
  return (
    <>
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="main-slider"
    >
      <SwiperSlide>
        <div className="main-slider-item">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="main-slider-content">
                      <b style={{ fontWeight: "bold" }}>Big Sale Offer</b>
                      <h1>Always our <br /> top brands!</h1>
                      <p>
                        Clothes, accessories, technology, and more!
                      </p>
                      <CustomButton/>
                    </div>
                  </div>

                  <div
                    className="col-lg-6"
                    style={{
                      position: "absolute",
                      marginLeft: "360px",
                      marginTop: "50px",
                      maxWidth: "1450px",
                    }}
                  >
                    <div className="main-slider-image">
                      <img
                        src={landing}
                        alt="image"
                        className="img-responsive"
                        style={{ height: "760px", objectFit: "cover" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="main-slider-item">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="main-slider-content">
                      <b style={{ fontWeight: "bold" }}>Big Sale Offer</b>
                      <h1>Beautiful Outfit and Makeup Set</h1>
                      <p>Outfits and Makeup for Winter Season!</p>
                      <CustomButton/>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="main-slider-image">
                      <img src={clothes} alt="image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="main-slider-item">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="main-slider-content">
                      <b style={{ fontWeight: "bold" }}>Big Sale Offer</b>
                      <h1>High-Quality Audio only for you</h1>
                      <p>High-resolution audio finally hits the mainstream!</p>
                      <CustomButton/>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="main-slider-image">
                      <img src={headphone} alt="image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      
      <FaLongArrowAltLeft className='swiper-button-prev' />
      <FaLongArrowAltRight className='swiper-button-next'/>  
    </Swiper>

    </>
  )
}
