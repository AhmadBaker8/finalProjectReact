import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; 
import "swiper/css/autoplay"; 
import { Autoplay } from "swiper/modules";
import partner1 from "../../../assets/images/partner/zara.svg";
import partner2 from "../../../assets/images/partner/dell.svg";
import partner3 from "../../../assets/images/partner/gucci.svg";
import partner4 from "../../../assets/images/partner/samsung.svg";
import partner5 from "../../../assets/images/partner/luigi.svg";
import partner6 from "../../../assets/images/partner/asus.svg";
import partner7 from "../../../assets/images/partner/apple.svg";
import partner8 from "../../../assets/images/partner/msi.svg";
import partner9 from "../../../assets/images/partner/huawei.svg";
import partner10 from "../../../assets/images/partner/sony.svg";
import partner11 from "../../../assets/images/partner/nike.svg";
import partner12 from "../../../assets/images/partner/rolex.svg";

export default function Partner() {

  const partners = [
    partner1, partner2, partner3, partner4, partner5, partner6,
    partner7, partner8, partner9, partner10, partner11, partner12,
  ];
  return (
    <>
    <div className={"partner-area text-center ptb-100"}>
      <div className="container">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            600: { slidesPerView: 2 },
            1000: { slidesPerView: 4 },
          }}
          modules={[Autoplay]}
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index}>
              <div className="partner-item">
                <a href="#">
                  <img src={partner} alt={`Partner ${index + 1}`} />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </>
  )
}

