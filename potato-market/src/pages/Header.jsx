import styled from "styled-components";

import { primaryColor } from "../styles/Global";

export default function Header(){
  
  return (
    <Headerwrap>
      
      <Mainlogo>감자마켓</Mainlogo>
      <button type="button">중고거래</button>
      <button type="button">매물 등록하기</button>
      <button type="button">나의 매물 조회</button>
      
      <form>
        <input/>
      </form>

      <button type="button">채팅하기</button>
      <button type="button">프로필</button>
      
    </Headerwrap>
  )
}

const Headerwrap = styled.header`
  flex-direction: row;
  display: flex;
  height : 64px;

  margin-left: auto;
  margin-right: auto;
  justify-content: center;
`;

const Mainlogo = styled.h1`
  color: ${primaryColor}
`;