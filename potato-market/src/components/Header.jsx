import { Link, useNavigate } from 'react-router-dom';

import styled from "styled-components";

import defaultProfile from "../assets/defaultProfile.svg";
import mainLogo from "../assets/logo(symbol+name).svg";
import { primaryColor, gray1, gray3, gray7, gray2 } from "../styles/Global";

function Header () {
  const navigate = useNavigate();

  return (
    <HeaderWrap>
      <MainTitle className="a11yHidden">감자마켓</MainTitle>
      <Link to="/"><img alt="" src={mainLogo} /></Link>
      <MenuButton as={"a"} className="primary" onClick={()=>navigate(`/hotArticles`)}>중고거래</MenuButton>
      <MenuButton as={"a"} onClick={()=>navigate(`/writeArticle`)}>매물 등록하기</MenuButton>
      <MenuButton as={"a"} onClick={()=>navigate(`/MyArticle`)}>나의 매물 조회</MenuButton>
      <SearchForm>
        <input placeholder="물품이나 동네를 검색해보세요" type="text"/>
      </SearchForm>
      <ChatButton onClick={()=>navigate(`/chat`)}>채팅하기</ChatButton>
      <MypageIcon aria-label="마이페이지"/>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.header`
  flex-direction: row;
  display: flex;
  height : 64px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  flex-wrap: wrap;

  .a11yHidden {
    display: inline-block;
    overflow: hidden;
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
  }

  img {
    width: 101px;
    height: 26px;
    display: inline-block;
    margin-top: 16px;
    margin-right: 35px;
  }

  .primary {
    color: ${primaryColor};
  }
  
  .primary:hover {
    color: ${primaryColor};
  }
`;

const MainTitle = styled.h1`
  margin-right: 35px;
  `;

const SearchForm = styled.form`
  margin-right: 12px;
  margin-top: 12px;
  & input {
    color: ${gray7};
    background-color: ${gray1};
    font-size: 16px;
    width: 288px;
    height : 40px;
    border: 0;
    border-radius: 6px;
    text-indent: 6px;
  }

  & input:focus {
    outline: none;
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  border: 0;
  color: #4d5159;
  font-weight: 700;
  font-size: 18px;
  margin-right: 35px;
  display: block;
  line-height: 64px;
  cursor: pointer;
  &:hover {
    color: ${gray3};
  }
`;

const ChatButton = styled.button`
  width: 98px;
  margin-top: 12px;
  margin-right: 2rem;
  margin-left: 2rem;
  height: 40px;
  color: #212124;
  font-weight: 700;
  font-size: 16px;
  background-color: #FFF;
  display: inline-block;
  /* border: 0; */
  border: 1px solid #D1D3D8;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${gray2};
  }
`;

const MypageIcon= styled.button`
  margin-top: 12px;
  margin-right: 21px;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  background: url(${defaultProfile}) no-repeat center local;
  background-size: 36px;
  background-clip: border-box;
  cursor: pointer;
`

export default Header;