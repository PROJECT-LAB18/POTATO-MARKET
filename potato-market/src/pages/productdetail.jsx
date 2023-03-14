import styled from "styled-components"
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import test_img from "../assets/test/핑구 메모.jpg"
import Product from "../components/product"

import 'swiper/css';
import 'swiper/css/pagination';

const SwiperPhoto = () => {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
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

const CustomButton = styled.button`
  cursor:pointer;
  width: 99px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #D1D3D8;
  border-radius: 4px;
  font-weight: 700;
  font-size: 16px;
 
 &:hover{
  border: 1px solid #FFFFFF;
  background: #D1D3D8;
 }
`

const Main = styled.main`
& a{
  color:black;
}
display:flex;
flex-flow:column;
align-items: center;
width:100%;
`
const Section = styled.section`

  width:677px;
  & .swiper{
    height: 500px;
    border-radius: 8px;
    overflow:hidden;
  }
  & .swiper img{
    width:100%;
    height: 100%;
  }
  & .profile{
    text-decoration: none;
    margin: 24px 0;
    height: 42px;
    display:flex;
    flex-flow:row;
    justify-content: space-between;
  }
  & .profile span{
    display:inline-block;
  }
  & .left-profile,& .right-profile{
    display:flex;
    align-items: center;     
    flex-flow:row;
  }
  & .right-profile{
    text-align: right;
  }
  & .right-profile div{
    gap:8px;
  }
  & .left-profile div,& .right-profile div{
    display:flex;
    flex-flow:column;
  }
  & .left-profile div{
    margin-left: 8px;
  }
  .nickname{
    font-weight: 600;
    font-size: 15px;
  }
  .address{
    font-weight: 400;
    font-size: 13px;
  }
  & .right-profile div{
    margin-right:8px;
  }
  .temperature{
    font-size: 16px;
    font-weight: 700;
    color: #319E45;
  }
  & .profile-image,& .temperature-image{
   width: 24px;
   height: 24px;
   border-radius: 20px;
  }

 & .best-product{
  display:inline-block;
 }
 & .best-product .product{
  margin:20px 11px;
 }
 & .article{
  position:relative;
  padding: 36px 0;
  border-bottom: 1px solid #E9ECEF;
 }
 & .title{
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 8px;
 }
 & .side-title{
  font-weight: 400;
  font-size: 13px;
  color: #868E96;
  margin-bottom:12px;
 }
 & .side-title span:first-child::after{
  content: '•';
  margin-right:5px;
 }
 & .price{
  font-weight: 700;
  font-size: 17px;
  margin-bottom:22px;
 }
 & .content{
  font-weight: 400;
  font-size: 17px;
  margin-bottom:22px;
 }
 & .counting-group{
  color: #868E96;
  font-weight: 400;
  font-size: 13px;
 }
 & .counting-group span::after{
  content:'•';
 }
 & .counting-group span:last-child::after{
  content:'';
}
& .best-product-group{
 display:flex;
 justify-content: space-between;
 margin-top:35.45px;
}
 & .best-product-group h2{
   font-weight: 600;
  font-size: 18px;
 }
 & .best-product-group a{
  color: #CFA36E;
  font-weight: 400;
  font-size: 15px;
  text-decoration: none;
 }

 & .thermometer{
  background: rgb(49,158,69);
  background: linear-gradient(90deg, rgba(49,158,69,1) 50%, rgba(233,236,239,1) 38%);
  width: 100px;
  height: 4px;
 }
 & .button-list{
  position: absolute;
  right:0;
  bottom:27px;
 }
 & .button-list button{
  margin-left:18px;
 }
 `

function Productdetail({title,side,nickname,address,temperature,date,price,content,heart,chat,check}){

  return(
    <Main>
      <Section>
        <div className="swiper">
          <SwiperPhoto>
          </SwiperPhoto>
          {/* <img src={test_img} alt="상품사진" /> */}
        </div>
        <a href="#" rel="noopener noreferrer" target="_blank" className="profile">
          <div className="left-profile">
              <img className="profile-image" src={test_img} alt="프로필 사진" />
            <div>
              <span className="nickname">{nickname}</span>
              <span className="address">{address}</span>
            </div>
          </div>
          <div className="right-profile">
            <div>
              <span className="temperature">{temperature} ℃</span>
              <span className="thermometer"></span>
            </div>
            <img className="temperature-image" src={test_img} alt="당근 온도 이모티콘" />
          </div>
        </a>
        <div className="article">
          <h2 className="title">
            {title}
          </h2>
          <div className="side-title">
            <span>{side}</span>
            <span>{date}일 전</span>
          </div>
          <p className="price">
            {price}원
          </p>
          <p className="content">
            {content}
          </p>
          <div className="counting-group">
            <span>관심 {heart} </span>
            <span>채팅 {chat} </span>
            <span>조회 {check} </span>
          </div>
          <div className="button-list">
            <CustomButton>채팅하기</CustomButton>
          </div>
        </div>
      </Section>
      <Section>
        <div className="best-product-group">
          <h2>당근마켓 인기중고</h2>
          <a href="#" rel="noopener noreferrer" target="_blank">더 구경하기</a>
        </div>
          
        
        <div className="best-product">
         <Product name="인기" price="4000" address="인천시 부평구 삼산동" heart="1"/>
         <Product name="무료나눔" price="2100" address="인천시 남구 학익동" heart="9999" chat="521"/>
         <Product name="판매 완료" price="1" />
         <Product/>
         <Product/>
         <Product/>
        </div>
      </Section>
    </Main>
  )
}

Productdetail.defaultProps={
  title:'제목을 입력해주세요.',
  side:'가구',
  nickname : '닉네임',
  address : '인천시 부평구 산곡동',
  temperature : '36.5',
  date : '1',
  price : '500',
  content : '판매 완료',
  heart : '0',
  chat : '0',
  check : '0'
}
export default Productdetail;