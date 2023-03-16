import styled, { createGlobalStyle } from "styled-components";

import { gray1, gray2 } from "../styles/Global";

export default function Home(){
  return (
    <>
      <HomeGlobal/>
      <MainTop imgheight="50.25rem" imgwidth="42.813rem">
        <div className="home-main-description">
          <h2>당신 근처의<br/>감자마켓</h2>
          <p>중고 거래부터 동네 정보까지, 이웃과 함께해요. <br/>
          가깝고 따뜻한 당신의 근처를 만들어요.</p>
        </div>
        <div className="home-main-image">
          <img alt="" src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-68ba12f0da7b5af9a574ed92ca8b3a9c0068db176b566dd374ee50359693358b.png"/>
        </div>
      </MainTop>

      <MainReversed imgheight="" imgwidth="">
        <div className="home-main-image">
          <img alt="" src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-39ac203e8922f615aa3843337871cb654b81269e872494128bf08236157c5f6a.png"/>
        </div>
        <div className="home-main-description">
          <h2>우리 동네<br/> 중고 직거래 마켓</h2>
          <p>동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.</p>
          <div className="button-wrap">
            <button type="button">인기매물 보기</button>
            <button type="button">믿을 수 있는 중고거래</button>
          </div>
        </div>
      </MainReversed>

      <HotArticles8>
        <h2>중고거래 인기매물</h2>
        {/* 상품목록 8개 컴포넌트 */}
        <div>상품목록 8개 공간</div>
        <UnderlineButton>
          인기매물 더보기
        </UnderlineButton>
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
    </>
  ) 
}


const HomeGlobal = createGlobalStyle`
  body {
  color: #212529; 
  background-color: #FFF;
  min-height: 100%;
  }

  h2 {
    font-weight: 700;
    font-size: 3rem;
  }
`

const MainTop = styled.section`
  background-color: #FBF7F2;
  display: flex;
  width: 100%;
  height: 47.5rem;
  justify-content: center;

  .home-main-description {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 37.953rem;

    & h2 {
      position: absolute;
      top: 40%;
      left: 5rem;
      line-height: 1.3; 
    }
    
    & p {
      position: absolute;
      top: 60%;
      left: 5rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }

  }

  .home-main-image {
    position: relative;
  }

  img {
    width: 50.25rem;
    height: 42.813rem;
    position: relative;
    bottom: -10%;
  }
`;

const MainReversed = styled.section`
  display: flex;
  height: 49rem;
  justify-content: center;

  .home-main-description {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 37.953rem;

    & h2 {
      position: absolute;
      top: 40%;
      left: 5.25rem;
      line-height: 3.875rem;
    }
    
    & p {
      position: absolute;
      top: 60%;
      left: 5.25rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }

    .button-wrap {
      display: flex;
      flex-direction: row;
      width: 100%;
      position: absolute;
      top: 70%;
      left: 5.25rem;

      button {
        font-size: 1.125rem;
        font-weight: 700;
        background-color: ${gray1};
        text-decoration: none;
        padding: 1rem 1.5rem;
        border: 0;
        border-radius: 6px;
        cursor: pointer;
      }
      
      & :nth-child(1) {
        margin-right: 1.174rem;
      }
     
    }
  }

  .home-main-image {
    position: relative;

  }

  img {
    width: 33.25rem;
    height: 42.75rem;
    position: relative;
    bottom: -13%;
  }
`;

const HotArticles8 = styled.section`
  background-color: ${gray2};
  padding-top: 125px;
  padding-bottom: 11.5rem;
  
  h2 {
    font-size: 40px;
    text-align: center;
  
  }

  div {
    width: 1024px;
    height: 752px;
    background-color: aqua;
    margin-left: auto;
    margin-right: auto;
    margin-top: 85px;
  }

  `;

  const UnderlineButton = styled.button`
    margin-left: auto;
    margin-right: auto;
   
    background-color: transparent;
    border: 0;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
    display: block;
  `;

const HomeKeywords = styled.section`
  
  width: 64rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.438rem;
  padding-bottom: 1rem;
  button {
    
  }

  ul {
    margin-top: 1rem;
    padding-left: 3rem;
  }

  ul li {
    display: inline-block;
    vertical-align: center;
    margin-right: 3.2rem;
    
    a {
      color: #212325;
      text-decoration: none;
    }
  }
`;

const Home = () => {
  return (
    <h2>Home</h2>
  )
};

export default Home;
