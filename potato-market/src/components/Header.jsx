import { Link, useNavigate } from 'react-router-dom';

import { useRecoilState } from "recoil";

import styled from "styled-components";



import { searchKeywordState } from '@/stores/state';


import Toggle from "./Toggle";
import defaultProfile from "../assets/defaultProfile.svg";
import mainLogo from "../assets/logo(symbol+name).svg";
import searchIcon from "../assets/searchIcon.svg";
import hamburger from "../assets/hamburger.svg";

import { onChat } from "../stores/onChat";
import { toggle } from "../stores/toggle";
import { userId, userInformation } from '../stores/userAuth';

import { primaryColor, gray1, gray3, gray7, gray2 } from "../styles/Global";

function Header () {
  const [login] = useRecoilState(userId);
  const [userInfo] = useRecoilState(userInformation);
  const [showToggle, setShowToggle] = useRecoilState(toggle);
  const handleToggle = () => {
    setShowToggle(!showToggle);
  }
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);
  const [chat, setChat] = useRecoilState(onChat);
  const navigate = useNavigate();

  return (
    <HeaderWrap>
      <MainTitle className="a11yHidden">감자마켓</MainTitle>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link to="/"><img alt="" src={mainLogo} /></Link>
      <MenuButton as={"a"} className="primary" onClick={()=>navigate(`/hotArticles`)}>중고거래</MenuButton>
      <MenuButton as={"a"} onClick={()=>navigate(`/writeArticle`)}>매물 등록하기</MenuButton>
      {/* <MenuButton as={"a"} onClick={()=>navigate(`/myPage`)}>마이페이지</MenuButton> */}
      <SearchForm>
      <input
          placeholder="물품이나 동네를 검색해보세요"
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </SearchForm>
      <ChatButton onClick={()=>{setChat(true)}}>채팅하기</ChatButton>
      <ToggleWrap>
        <MypageIcon aria-label="마이페이지" login={login} userInfo={userInfo} onClick={handleToggle}/>
        {showToggle && <Toggle/>}
      </ToggleWrap>
      <MobileIcons>
        <Icon iconname={searchIcon}/>
        <Icon iconname={hamburger}/>
      </MobileIcons>
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
  position: relative;

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

  Link {
    width: 101px;
    height: 26px;
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

  @media (max-width: 768px){

    justify-content: space-between;
    img {
      
    }
  }
`;

const MainTitle = styled.h1`
  margin-right: 35px;
  `;

const SearchForm = styled.form`
  margin-left: 5rem;
  margin-right: 3rem;
  margin-top: 12px;
  & input {
    color: ${gray7};
    background-color: ${gray1};
    font-size: 16px;
    width: 18rem;
    height : 40px;
    border: 0;
    border-radius: 6px;
    text-indent: 6px;
  }

  & input:focus {
    outline: none;
  }
  @media (min-width: 768px) and (max-width: 1023px){
    margin-left: 0;
    margin-right: 0;
    & input {
      width: 12rem;
    }
  }
  @media (max-width: 768px){
    display: none;
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

  @media (max-width: 768px){
    display: none;
  }
`;

const ChatButton = styled.button`
  width: 6.125rem;
  margin-top: 12px;
  margin-right: 2rem;
  margin-left: 2rem;
  height: 40px;
  color: #212124;
  font-weight: 700;
  font-size: 16px;
  background-color: #FFF;
  display: inline-block;
  border: 1px solid #D1D3D8;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${gray2};
  }
  @media (min-width: 768px) and (max-width: 1023px){
    margin-left: 1rem;
    margin-right: 1rem;
  }
  @media (max-width: 768px){
    margin-left: 1rem;
    display: none;
  }
`;

const ToggleWrap = styled.div`
  position: relative;

`;

const MypageIcon= styled.button`
  margin-top: 12px;
  margin-right: 21px;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  background: ${(props) => (props.login === null ? `url(${defaultProfile}) no-repeat center local` : `url(${props.userInfo.profileImage}) no-repeat center local`)};
  background-size: 36px;
  background-clip: border-box;
  cursor: pointer;
  @media (max-width: 768px){
    display: none;
  }
`

const MobileIcons = styled.div`
  height: inherit;
  width: 5rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Icon = styled.button`
  border: 0;
  background-color: transparent;
  background: url("") no-repeat center local;
  background-image: url(${(props)=>props.iconname});
  width: 1.5rem;
  height: 1.5rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

export default Header;