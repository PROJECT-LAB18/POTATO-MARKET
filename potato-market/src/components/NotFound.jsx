import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import errorImg from "@/assets/errorImg.svg";
import { primaryColor } from "@/styles/global";

function NotFound(props) {
  const navigate = useNavigate();
  return(
    <Section>
      <h2>{props.title}</h2>
      <ErrorImage alt="에러 페이지" src={errorImg} />
      <Button onClick={()=>{navigate(-1)}}>뒤로가기</Button>
    </Section>
  )
}

const Section = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ErrorImage = styled.img`
  width: 450px;
`

const Button = styled.button`
  display: block;
  width: 100px;
  height: 40px;
  margin: 40px auto;
  border: none;
  border-radius: 4px;
  background: ${primaryColor};
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 16px;
  animation: moveBtn 3s infinite;

  @keyframes moveBtn{
    0%{transform: rotate(1deg)}
    3%{transform: rotate(-1deg)}
    6%{transform: rotate(0deg)}
    100%{transform: rotate(0deg)}
  }
`



export default NotFound;