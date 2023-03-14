import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import test_img from "../assets/test/핑구 메모.jpg"
import 'swiper/css';
import 'swiper/css/pagination';

export default function SwiperPhoto(){
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => ('slide change')}
      onSwiper={(swiper) => (swiper)}
    >
      <SwiperSlide>
      <img src={test_img} alt="상품사진" />
      </SwiperSlide>
      <SwiperSlide>
      <img src={test_img} alt="상품사진" />
      </SwiperSlide>
      <SwiperSlide>
      <img src={test_img} alt="상품사진" />
      </SwiperSlide>
      <SwiperSlide>
      <img src={test_img} alt="상품사진" />
      </SwiperSlide>
      
    </Swiper>
  );
};