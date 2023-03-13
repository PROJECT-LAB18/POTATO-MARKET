import styled from "styled-components";

import test_image from "../assets/test/핑구 메모.jpg"

const Div = styled.div`
  display:inline-block;
  width:201px;
`
const Section = styled.section`
   
  width:201px;
  display:flex;
  flex-flow: column;
`
const ImageSection = styled.section`
  & a{
    display:block;
    border-radius: 12px;
    width:201px;
    height: 201px ;
    overflow:hidden;
  }
`
const SubList = styled.section`

  flex-flow: row;

& span{
  margin-top:5.5px;
  font-size: 12px;
  color: #868E96;
}
& span:first-child::after{
  content: '•';
  margin : 0 4px;
  
}
`

const Image = styled.img`
  
  width:100%;
  height:100%;
  
`
const H2 = styled.h2`
  margin-top : 12px;
  font-weight: 400;
  font-size: 16px;
`

const PriceSpan = styled.span`
font-weight: 700;
margin-top:5px;
`

const AddressSpan = styled.span`
font-size: 13px;
margin-top: 5px;
`

function Product({name,price,address,heart,chat}){

  return(
    <Div>     
      <ImageSection>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Image alt="상품 자세히 보기" src={test_image} />
        </a>       
      </ImageSection>
      <Section>
        <H2>{name}</H2>
        <PriceSpan>{price}원</PriceSpan>
        <AddressSpan>{address}</AddressSpan>
      </Section>
      <SubList>
        <span>관심 {heart}</span>
        <span>채팅 {chat}</span>
      </SubList>
    </Div>
  )
}

Product.defaultProps = {   
  name : "상품 이름",
  price : 505445,
  address : "인천시 부평구 산곡동",
  heart : 0,
  chat : 0,

}

export default Product;