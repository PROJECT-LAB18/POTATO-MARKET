import styled from "styled-components"

import loding from "@/assets/loading-spinner.gif" 

const LoadingSpinner = ({ className }) => {
  return (
    <>
      <CenterImg alt="로딩 중입니다." className={className} src={loding}/>  
    </>
  )
};

const CenterImg = styled.img`
  position: absolute;  
  left: 40%;
  width: 240px;
`;

export default LoadingSpinner;