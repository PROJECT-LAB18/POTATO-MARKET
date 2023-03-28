import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { useRecoilState } from "recoil";
import styled, { createGlobalStyle } from "styled-components";

import Product from "@/components/product";

import { userWriteRef } from '@/firebase';
import { onChat } from '@/stores/onChat';

import { gray1, gray2 } from '@/styles/Global';
import ProductList from '@/styles/ProductList';

export default function Home() {

  const navigate = useNavigate();
  const [readyToRender, setReadyToRender] = useState(0);
  const [checkArr, setCheckArr] = useState([]);
  const [, setChat] = useRecoilState(onChat);

  useEffect(() => {
    userWriteRef.onSnapshot((snapshot) => {
      const newArr = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      newArr.sort((b, a) => a.check - b.check);
      setCheckArr(newArr.slice(0, 8));
      setReadyToRender(1);
    })
  }, [])

  return (
    <main>
      <HomeGlobal />
      <MainTop>
        <div className="home-main-description">
          <h2>당신 근처의<br />감자마켓</h2>
          <p>중고 거래부터 동네 정보까지, 이웃과 함께해요. <br />
            가깝고 따뜻한 당신의 근처를 만들어요.</p>
        </div>
        <div className="home-main-image">
          <img alt="" src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-68ba12f0da7b5af9a574ed92ca8b3a9c0068db176b566dd374ee50359693358b.png" />
        </div>
      </MainTop>
      <MainReversed>
        <div className="home-main-image">
          <img alt="" src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-39ac203e8922f615aa3843337871cb654b81269e872494128bf08236157c5f6a.png" />
        </div>
        <div className="home-main-description">
          <h2>우리 동네<br /> 중고 직거래 마켓</h2>
          <p>동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.</p>
          <div className="link-wrap">
            <Link to="/hotarticles">인기매물 보기</Link>
            <button type="button" onClick={() => { setChat(true) }}>주민들과 소통하기</button>
          </div>
        </div>
      </MainReversed>
      <HotArticles8>
        <h2>중고거래 인기매물</h2>
        <ProductList className="Hot8">
          {readyToRender ? checkArr.map(
            ({ content, title, price, side, imgsrc, id, check, heart, recommend }, index) =>
              (<Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} price={price} recommend={recommend} side={side} title={title} />))
            : <p>Render Failed</p>
          }
        </ProductList>
        <UnderlineButton as={"a"} onClick={() => navigate(`/hotArticles`)}>인기매물 더보기</UnderlineButton>
      </HotArticles8>

      <HomeKeywords>
        <UnderlineButton>중고거래 인기검색어</UnderlineButton>
        <ul>
          <li><a href="/">자전거</a></li>
          <li><a href="/">의자</a></li>
          <li><a href="/">아이폰</a></li>
          <li><a href="/">냉장고</a></li>
          <li><a href="/">노트북</a></li>
          <li><a href="/">패딩</a></li>
          <li><a href="/">아이패드</a></li>
          <li><a href="/">모니터</a></li>
          <li><a href="/">스타벅스</a></li>
          <li><a href="/">책상</a></li>
        </ul>
      </HomeKeywords>
    </main>
  )
}

// Styled Components
const black = "#212529";
const HomeGlobal = createGlobalStyle`
  body {
    color: ${black};
    background-color: #FFF;
    min-height: 100vh;
  }
  h2 {
    font-weight: 700;
    font-size: 3rem;
    text-align: center;
  }
  @media (min-width: 768px) and (max-width: 1200px){
    h2 {
      font-size: 2.5rem;
    }
  }
  @media (max-width: 768px){
    h2 {
      font-size: 1.5rem;
    }
  }
`;

const MainTop = styled.section`
  background-color: #FBF7F2;
  display: flex;
  justify-content: center;
  max-height: 47.5rem;
  padding: 30px 200px;
  .home-main-description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      line-height: 1.3;
      text-align: left;
      margin-bottom: 30px;
    }
    p {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
  .home-main-image {
    width: 60%;
    margin: auto 0;
    img {
      padding: 50px 0 0 50px;
      width: 100%;
      height: auto;
      box-sizing: border-box;
    }
  }
  @media (max-width: 1200px){
    .home-main-description h2 {
      margin-bottom: 10px;
    }
    .home-main-image img {
      padding: 20px 0 0 20px;
    }
  }
  @media (min-width:768px) and (max-width: 1200px){
    padding: 30px 100px;
  }
  @media (max-width: 768px){
    padding: 50px;
    .home-main-description {
      padding-left: 0;
    }
  }
`;

const MainReversed = styled(MainTop)`
  background-color: #FFF;
  .home-main-image {
    width: 40%;
    img {
      padding: 0;
    }
  }
  .home-main-description {
    width: 60%;
    margin-left: 100px;
  }
  .link-wrap {
    display: flex;
    width: 100%;
    gap: 1.174rem;
    margin-top: 30px;
    a, 
    button {
      color: ${black};
      font-size: 1.125rem;
      font-weight: 700;
      background-color: ${gray1};
      text-decoration: none;
      padding: 1rem 1.5rem;
      border: 0;
      border-radius: 6px;
      white-space: nowrap;
    }
  }
  @media (max-width: 1200px){
    .link-wrap {
      margin-top: 10px;
    }
  }
  @media (min-width:768px) and (max-width: 1200px){
    .home-main-description {
      margin-left: 50px;
    }
  }
  @media (max-width: 768px){
    .home-main-description {
      margin-left: 20px;
    }
    .link-wrap {
      flex-direction: column;
      width: fit-content;
      a, 
      button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
      }
    }
  }
`;

const HotArticles8 = styled.section`
  background-color: ${gray2};
  padding-top: 125px;
  padding-bottom: 5rem;
  margin: 0 auto;
  .Hot8 {
    width: 100%;
    max-width: 980px;
    margin: 60px auto 5rem;
  }
  a {
    display: flex;
    justify-content: center;
  }
`;

const UnderlineButton = styled.button`
  margin-left: auto;
  margin-right: auto;
  background-color: transparent;
  border: 0;
  color: ${black};
  font-weight: 700;
  text-decoration: underline;
  display: block;
  text-align: center;
  cursor: pointer;
`;

const HomeKeywords = styled.section`
  width: 100%;
  max-width: 980px;
  margin: 1.438rem auto 0;
  padding: 0 1rem 1rem;
  box-sizing: border-box;
  ul {
    display: flex;
    justify-content: center;
    column-gap: 3.2rem;
    flex-wrap: wrap;
    margin-top: 1rem;
  }
  ul li {
    display: inline-block;
    vertical-align: center;
    a {
      color: ${black};
      text-decoration: none;
      line-height: 30px;
      white-space: nowrap;
    }
  }
`;