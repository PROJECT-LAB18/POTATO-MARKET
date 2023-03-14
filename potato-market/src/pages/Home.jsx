import styled from "styled-components";

export default function Home(){
  return (
    <>
      <section className="Home-main-section">
        <div className="home-main-description">
          <h2>당신 근처의 감자마켓</h2>
          <p>중고 거래부터 동네 정보까지, 이웃과 함께해 가깝고 따뜻한 당신의 근처를 만들어요.</p>
        </div>
        <div className="home-main-image">
          <img alt="" src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-top-68ba12f0da7b5af9a574ed92ca8b3a9c0068db176b566dd374ee50359693358b.png"/>
        </div>
      </section>

      <section className="Home-main-section-reversed">
        <div className="home-main-description">
          <h2>우리 동네 중고 직거래 마켓</h2>
          <p>동네 주민들과 가깝고 따뜻한 거래를 지금 경험해보세요.</p>
          <button type="button">인기매물보기</button>
          <button type="button">믿을 수 있는 중고거래</button>
        </div>
        <div className="home-main-image">
          <img alt="" src="https://d1unjqcospf8gs.cloudfront.net/assets/home/main/3x/image-1-39ac203e8922f615aa3843337871cb654b81269e872494128bf08236157c5f6a.png"/>
        </div>
      </section>

      <section>
        <h2>중고거래 인기매물</h2>
        {/* 상품목록 8개 컴포넌트 */}
        <button type="button">인기매물 더 보기</button>
      </section>

      <section>
        <h3><a href="/">중고거래 인기검색어</a></h3>
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
      </section>
    </>
  ) 
}

