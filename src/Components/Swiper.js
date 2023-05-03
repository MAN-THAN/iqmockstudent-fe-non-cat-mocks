  import React, { useRef, useState } from "react";
  // Import Swiper React components
  import { Swiper, SwiperSlide } from "swiper/react";

  // Import Swiper styles
  import "swiper/swiper-bundle.min.css";
  import "swiper/css/free-mode";
  import "swiper/css/pagination";
  import "../styleSheets/swiper.css";

  // import required modules
  import { FreeMode, Pagination,Mousewheel } from "swiper";
  import ImgMediaCard from "./MarketPlaceCard";

export default function SliderSwiper({ data }) {
    return (
      <>
        <Swiper
          slidesPerView={4.5}
          spaceBetween={0}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          mousewheel={{ forceToAxis: true, enabled: true,}}
          modules={[FreeMode, Pagination,Mousewheel]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide >
              <ImgMediaCard cardData={ item } />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    );
  }
