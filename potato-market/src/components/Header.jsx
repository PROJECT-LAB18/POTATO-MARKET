import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useRecoilState } from "recoil";

import styled from "styled-components";

import Toggle from "./Toggle";

import { userId, userInformation } from '../stores/userAuth';

import { primaryColor, gray1, gray3, gray7, gray2 } from "../styles/Global";

import closeIcon from "@/assets/closebutton.svg";
import defaultProfile from "@/assets/defaultProfile.svg";
import hamburger from "@/assets/hamburger.svg";
import mainLogo from "@/assets/logo(symbol+name).svg";
import searchIcon from "@/assets/searchIcon.svg";
import xButton from "@/assets/xButton.svg";

import { onChat } from "@/stores/onChat";
import { searchKeywordState } from '@/stores/state';
import { toggle } from "@/stores/toggle";

function Header() {
  const [login] = useRecoilState(userId);
  const [userInfo] = useRecoilState(userInformation);
  const [showToggle, setShowToggle] = useRecoilState(toggle);

  const handleToggle = () => {
    setShowToggle(!showToggle);
  }
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);
  const [, setChat] = useRecoilState(onChat);

  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const openSearch = () => {
    setShowSearch(true);
  };
  const openMenu = () => {
    setShowMenu(true)
  };

  return (
    <HeaderWrap>
        <MainTitle>
          <span className="a11yHidden">감자마켓 로고</span>
          <Link to="/"><img alt="감자마켓" src={mainLogo} /></Link>
        </MainTitle>
        
      <MenuButton as={"a"} className="primary" tabIndex="0" onClick={() => navigate(`/hotArticles`)}>중고거래</MenuButton>
      <MenuButton as={"a"} tabIndex="0" onClick={() => navigate(`/writeArticle`)}>매물 등록하기</MenuButton>
      <SearchForm>
        <input
          placeholder="물품이나 동네를 검색해보세요"
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </SearchForm>
      <ChatButton onClick={() => { setChat(true) }}>채팅하기</ChatButton>
      <ToggleWrap>
        <MypageIcon aria-label="마이페이지" login={login} userInfo={userInfo} onClick={handleToggle} />
        {showToggle && <Toggle />}
      </ToggleWrap>

      <MobileIcons>
        <Icon iconname={searchIcon} onClick={openSearch} />
        {showMenu ? <CloseMenu onClick={() => setShowMenu(false)} /> : <Icon iconname={hamburger} onClick={openMenu} />}
      </MobileIcons>
      {showSearch ? <SearchModal searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} setShowSearch={setShowSearch} /> : null}
      {showMenu ? <MenuModal navigate={navigate} setChat={setChat} setShowMenu={setShowMenu} /> : null}
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
  align-item: center;
  flex-wrap: wrap;
  position: relative;
  background-color: #fff;
  
  Link {
    width: 101px;
    height: 26px;
  }
  
  img {
    width: 101px;
    height: 26px;
    display: inline-block;
  }
  
  .primary {
    color: ${primaryColor};
  }
  
  .primary:hover {
    color: ${primaryColor};
  }
  
  @media (max-width: 768px){
    background-color: #fff;
    position: fixed;
    justify-content: space-between;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;

    img {
      margin-left: 2rem;
      background-color: inherit;
    }
  }
`;

const MainTitle = styled.h1`
  margin-right: 35px;
  transform: translateY(-6px);
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
  z-index: 100;
`;

const MypageIcon = styled.button`
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
  width: 7rem;
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  margin-right: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Icon = styled.button`
  border: 0;
  background-color: transparent;
  background: url(${(props) => props.iconname}) no-repeat center local;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
    background: #fff;
  }
`;

const SearchModal = ({ setShowSearch, searchKeyword, setSearchKeyword }) => {
  return (
    <Modal top={0}>
      <Input
        placeholder="물품이나 동네를 검색해보세요"
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      <CloseSearch aria-label="검색 닫기" onClick={() => setShowSearch(false)} />
    </Modal>
  )
};

const MenuModal = ({ setShowMenu, navigate, setChat }) => {

  const navigateTohotArticles = () => {
    navigate("/hotArticles")
    setShowMenu(false);
  }

  const navigateTowriteArticle = () => {
    navigate("/writeArticle")
    setShowMenu(false);
  }

  const navigateToChat = () => {
    setShowMenu(false);
    setChat(true);
  }

  return (
    <Modal top={'64px'}>
      <MenuList>
        <li><AccordionButton onClick={navigateTohotArticles}>중고거래</AccordionButton></li>
        <li><AccordionButton onClick={navigateTowriteArticle}>매물 등록하기</AccordionButton></li>
        <li><AccordionButton onClick={navigateToChat}>채팅하기</AccordionButton></li>
      </MenuList>
    </Modal>
  )
}

const Modal = styled.div`
  position: fixed;
  top: ${(props) => props.top};
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuList = styled.ul`
  z-index: 100;
  position: absolute;
  border-top: 2px solid ${gray2};
  transition: transform .3s, opacity .1s;
  
  li {
    padding: 1rem;
    width: 100vw;
    height: 1.25rem;
    background-color: #fff;
    line-height: 1.25rem;
  }

  & li:hover {
    background-color: ${gray3};
  }

  @media (min-width: 768px) {
  display: none;
 }
`;

const CloseMenu = styled.button`
  border: 0;
  background-color: transparent;
  background: url(${xButton}) no-repeat center local;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  @media (min-width: 768px) {
  display: none;
 }
`;

const AccordionButton = styled.button`
  background-color: transparent;
  border: 0;
  color: #212325;
`;

const CloseSearch = styled.button`
  background-color: ${gray1};
  border: 0;
  background: url(${closeIcon}) no-repeat center;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 12px;
  margin-left: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Input = styled.input`
  color: ${gray7};
  background-color: ${gray1};
  font-size: 16px;
  width: 100vw;
  height : 40px;
  border: 0;
  border-radius: 6px;
  text-indent: 6px;
  padding-right: 3.5rem;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;         /* Opera/IE 8+ */

  & :focus {
    outline: none;
  }

  @media (min-width: 768px) {
    display: none;
  }
`
export default Header;