import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/pagination";
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';

import book from './img/booklabel.png';

import "./slider.css";

// import required modules


export const Slider = (props) => {

    const {images} = props;

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const pagination = {
      clickable: true
    };

    let bigSwiperImg = null;
    let smallSwiperImg = null;
    let counter = 0;

    bigSwiperImg = images.map(item => {
      counter+=1;
      return <SwiperSlide key={counter}><img src={`https://strapi.cleverland.by${item.url}`} alt='booklabel' /></SwiperSlide>
    });

    smallSwiperImg = [...bigSwiperImg];

    return (
        <>
          <Swiper
            loop={true}
            spaceBetween={10}
            pagination={pagination}
            thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
            modules={[FreeMode, Thumbs, Pagination]}
            className="mySwiper2"
            data-test-id='slide-big'
          > 
            {bigSwiperImg}
          </Swiper>
          {
            props.imagesLength > 1 &&
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={20}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="mySwiper"
          >
            {smallSwiperImg}
          </Swiper>
          }
          
           
        </>
        
        
    )
}

