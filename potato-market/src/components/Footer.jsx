import styled from 'styled-components';

import facebookLogo from "../assets/facebook.svg" ; 
import githubLogo from "../assets/github.svg" ; 
import instagramLogo from "../assets/instagram.svg" ; 
import naverblogLogo from "../assets/naverblog.svg" ; 
import youtubeLogo from "../assets/youtube.svg" ; 
import { gray1, gray4 } from "../styles/Global";

const Footer = () => {
  return (
    <FooterGlobal>
      <Footertop>
        <ul>
          <li>중고거래</li>
          <li>매물 등록하기</li>
          <li>나의 매물보기</li>
          <li>동네가게</li>
          <li>채팅하기</li>
        </ul>
        <ul>  
          <li>당근 비즈니스</li>
          <li>부동산 직거래</li>
          <li>중고차 직거래</li>
          <li>당근알바</li>
          <li></li>
        </ul>      
        <ul>
          <li>자주 묻는 질문</li>
          <li>회사 소개</li>
          <li>인재 채용</li>
        </ul>

        <div className="download-app">
          <p>감자마켓 앱 다운로드</p>
          <div className="logobox">
            <button type="button" >Github</button>
          </div>
        </div>
      </Footertop>

      <FooterMiddle>
        <section className="information">
          <p>
            <b>만든 사람 </b>
            김동률 김미경 배상우 안유진 이성령
          </p>
          <p>
            <b>주소 </b>
          서울특별시 구로구 디지털로 30길 28, 609호 (당근서비스)
          </p>
          <p><b>전화 </b> 010-0000-0000</p>
          <p><b>고객문의 </b> cs@daangnservice.com</p>
        </section>
        <section className="snsgroup">
          <img alt="페이스북" src={facebookLogo}/>
          <img alt="인스타그램" src={instagramLogo}/>
          <img alt="유튜브채널" src={youtubeLogo}/>
          <img alt="네이버블로그" src={naverblogLogo}/>
        </section>
      </FooterMiddle>

      <FooterBottom>
        <section className="inquirygroup">
          <a href="/">제휴 문의</a>
          <a href="/">광고 문의</a>
          <a href="/">PR 문의</a>
          <a href="/">IR 문의</a>
        </section>
        <section className="terms">
          <a href="/">이용약관</a>
          <a href="/">개인정보처리방침</a>
          <a href="/">위치기반서비스 이용약관</a>
          <a href="/">이용자보호 비전과 계획</a>
        </section>
      </FooterBottom>
    </FooterGlobal>
  )
};

const FooterGlobal = styled.footer`
  border-top: 1px solid ${gray1};
  margin-top: 1rem;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Footertop = styled.section` 
  display: flex;
  flex-direction: row;
  max-width: 1200px;
  height : auto;
  align-items: flex-start;
  position: relative;
  padding-top: 3rem;
  justify-content: space-between;
  margin: 0 auto;
  
  
  @media (min-width: 375px) and (max-width: 1200px){
    margin-left: 2rem;
    height: 20rem;
    padding-top: 1rem;

     ul {
      margin: 0.5rem;
    }
  }

  ul {
    display: inline-block;
    font-size: 0.875rem;
    margin: 0 2rem;
    position: relative;
    /* right: 2rem; */

    li {
      margin-bottom: 2rem;
      padding : 0;
    }
    
    a {
      text-decoration: none;
      color: #212325;
    }
  }
  
  .download-app {
    display: block;
    position: absolute;
    right: 10%;
    
    @media (min-width: 375px) and (max-width: 768px){
      position: absolute;
      bottom : 1rem;
      left: 0;
    }

    p {
      font-weight: 700;
      font-size: 0.875rem;
    }
        
    .logobox {
      margin-top: 1rem;
      
      button {
        width: 140px;
        height: 40px;
        background-color: ${gray4};
        color: #212325;
        background-position: 24px 12px; 
        background-image: url(${githubLogo});
        background-repeat: no-repeat;
        background-size: 16px;
        cursor: pointer;
        vertical-align: middle;
        padding-left: 16px;  
        border: 0;
        border-radius: 6px;
        font-weight: 700;
      }
    }

  }
`;

const FooterMiddle = styled.div`
  border-top: 1px solid ${gray1};
  display: flex;
  flex-direction: row;
  max-width : 1200px;
  height : auto;
  align-items: flex-start;
  position: relative;
  margin: 0 auto;
  justify-content: space-between;
  padding-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin: auto;

    .information {
      text-align: center;
      margin-bottom: 1rem;
    }
    .snsgroup {
      margin-left: 0;
      width: auto;
    }
  }

  .information {
    color: #868B94;
    font-size: 0.813rem;
    line-height: 1.25rem;
  }

  .snsgroup {
    width : 16rem;
    margin-left: 6rem;

    img {
     margin: 0 1rem;
    }

    @media (min-width: 375px) and (max-width: 1200px){
    margin-left: 2rem;
    width: 20rem;
    }
  }
`;

const FooterBottom = styled.div`
  max-width : 1200px;
  margin: 3rem auto;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    .inquirygroup, .terms {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: 1rem;
    }
    a {
      margin: 0.5rem;
    }
  }

  .inquirygroup {
    margin-left: 0.5rem;
    margin-bottom: 1rem;
    position: relative;
    right: 1.5rem;
  }
  .terms {
    margin-left: 0.5rem;
    position: relative;
    right: 1.5rem;

  }
  a {
    text-decoration: none;
    color: #868B94;
    margin: 1rem;
    font-size: 0.813rem;
    line-height: 1.25rem;
    font-weight: 700;
  }
  
  a:hover {
    text-decoration : underline;
  }
  
`;

export default Footer;