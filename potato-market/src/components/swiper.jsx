import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

export default function SwiperPhoto({imgsrc}){
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1} 
      onSlideChange={() => ('slide change')}
      onSwiper={(swiper) => (swiper)}
    >
      {imgsrc.map((item)=>(
        <SwiperSlide key={item}>
          <img alt="이미지 사진" src={item} />
        </SwiperSlide>
      ))}
      
    </Swiper>
  );
};