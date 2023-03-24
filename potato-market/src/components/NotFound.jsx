import styled from 'styled-components';

import errorImg from "@/assets/errorImg.svg";

function NotFound(props) {
  return(
    <Section>
      <h2>{props.title}</h2>
      <ErrorImage alt="에러 페이지" src={errorImg} />
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

export default NotFound;