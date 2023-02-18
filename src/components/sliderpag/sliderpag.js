import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./sliderpag.css";

// import required modules
import { Pagination } from "swiper";

import bookLabel from './img/booklabel.png';
import book1 from './img/book1.webp';
import book2 from './img/book2.jpg';
import book3 from './img/book3.jpg';
import book4 from './img/book4.jpg';
import book5 from './img/book5.jpg';

export const SliderPag = () => (

    <Swiper
        pagination={true} modules={[Pagination]} className="mySwiperPag"
    >
        <SwiperSlide><img src={bookLabel} alt='booklabel' /></SwiperSlide>
        <SwiperSlide><img src={book1} alt='book1' /></SwiperSlide>
        <SwiperSlide><img src={book2} alt='book2' /></SwiperSlide>
        <SwiperSlide><img src={book3} alt='book3' /></SwiperSlide>
        <SwiperSlide><img src={book4} alt='book4' /></SwiperSlide>
        <SwiperSlide><img src={book5} alt='book5' /></SwiperSlide>
    </Swiper>
)

