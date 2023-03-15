import styled from "styled-components"

import loding from "../assets/loading-spinner.gif" 



const CenterImg = styled.img`
  width:240px;
  margin:0 auto;

`

const LoadingSpinner = ({className}) => {
  return(
     <>
      <CenterImg alt="로딩 중입니다." className={className} src={loding}/>  
     </>
  )
}

export default LoadingSpinner