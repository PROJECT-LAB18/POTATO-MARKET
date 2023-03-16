import styled from "styled-components";

import test_image from "../assets/test/핑구 메모.jpg"

const Div = styled.a`
  display:inline-block;
  width:201px;
  text-decoration:none;
  color:black;
  cursor:pointer;
`
const Section = styled.div`
   
  width:201px;
  display:flex;
  flex-flow: column;
`
const Imagediv = styled.div`
margin:0;
  & a{
    display:block;
    border-radius: 12px;
    width:201px;
    height: 201px ;
    overflow:hidden;
  }
`
const SubList = styled.div`

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

function Product({title,price,address,heart,chat,imgsrc}){

  return(
    <Div className="product" href="#" target="_blank" rel="noopener noreferrer">     
      <Imagediv>
        
        <a href="naver.com" target="_blank" rel="noopener noreferrer">
          <Image alt="상품 자세히 보기" src={imgsrc} />
        </a>       
      </Imagediv>
      <Section>
        <H2>{title}</H2>
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
  imgsrc:"https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8E%E1%85%B5.png?alt=media&token=f23ce701-2450-495f-8166-2e1049699b2b",
  title : "상품 이름",
  price : 505445,
  address : "인천시 부평구 산곡동",
  heart : 0,
  chat : 0,
}

export default Product;