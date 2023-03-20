import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

export default function SwiperPhoto({imgsrc}){
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      slidesPerView={1} 
      spaceBetween={50}
      onSlideChange={() => ('slide change')}
      onSwiper={(swiper) => (swiper)}
    >
      {imgsrc[0]!=='h'?imgsrc.map((item)=>(
        <SwiperSlide key={item}>
          <img alt="이미지 사진" src={item} />
        </SwiperSlide>
      )):
      <SwiperSlide>
          <img alt="이미지 사진" src={imgsrc} />
      </SwiperSlide>}
      
    </Swiper>
  );
};