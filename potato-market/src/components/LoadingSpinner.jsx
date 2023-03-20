import styled from "styled-components"

import loding from "../assets/loading-spinner.gif" 



const CenterImg = styled.img`
  position: absolute;  
  left:40%;
  width:240px;

`

const LoadingSpinner = ({className}) => {
  return(
     <>
      <CenterImg alt="로딩 중입니다." className={className} src={loding}/>  
     </>
  )
}

export default LoadingSpinner