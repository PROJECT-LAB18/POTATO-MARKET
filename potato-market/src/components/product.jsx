import { Link } from "react-router-dom";

import styled from "styled-components";

import moneyUnit from "@/utils/moneyUnit";
function Product({title,price,heart,recommend,imgsrc,id,check,location}){
  return(
    <Div>
      <Link className="product" href={`https://potato-market-lab18.web.app/detailarticle/${id}`} rel="noopener noreferrer" to={`/detailarticle/${id}`} >
        <Imagediv>
          <div>
            <Image alt="상품 자세히 보기" src={imgsrc[0]!==undefined?imgsrc:"https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/no_image.jpg?alt=media&token=d2d005ba-9dbb-40cb-bd61-4d47f5118b2c"} />
          </div>
        </Imagediv>
        <Section>
          <H3>{title}</H3>
          <PriceSpan>{moneyUnit(price)}원</PriceSpan>
          <AddressSpan>{location.sido} {location.sigungu} {location.bname}</AddressSpan>
        </Section>
        <SubList>
          <span>조회 {check}</span>
          <span>관심 {heart}</span>
          <span>댓글 {recommend.length}</span>
        </SubList>
      </Link>
    </Div>
  )
}

Product.defaultProps = {   
  imgsrc:["https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8E%E1%85%B5.png?alt=media&token=f23ce701-2450-495f-8166-2e1049699b2b"],
  title : "상품 이름",
  price : 505445,
  location : "인천시 부평구 산곡동",
  heart : 0,
  chat : 0,
}

const Div = styled.div`
  & .product {
    display: inline-block;
    width: 201px;
    text-decoration: none;
    color: black;
  }

  @media (max-width: 480px){
    width: 90%;
    display: flex;
    justify-content: center;

    .product{
      width: 100%;
    }
  }
`;

const Section = styled.div`
  margin-bottom: 7px;
  width: 201px;
  display: flex;
  flex-flow: column;
  & > * {
    margin-bottom: 4px;
  }

  @media (max-width: 480px){
    width: 90%;
  }
`;

const Imagediv = styled.div`
  margin:0;
  & img {
    display: block;
    border-radius: 12px;
    width: 201px;
    height: 201px;
    overflow: hidden;
    object-fit: cover;
  }
  @media (max-width: 480px){
    width: 100%;
    & > div{
      position: relative;
      padding-bottom: 90%;
      box-sizing: border-box;
    }
    & > div > img{
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const SubList = styled.div`
  flex-flow: row;

  & span {
    margin-top: 5.5px;
    font-size: 12px;
    color: #868E96;
  }
  & span::after {
    content: "•";
    margin: 0 4px;  
  }
  & span:last-child::after {
    content: "";
  }
`;

const Image = styled.img`  
  width: 100%;
  height: 100%;  
`;

const H3 = styled.h3`
  margin-top : 12px;
  font-weight: 400;
  font-size: 16px;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PriceSpan = styled.span`
  font-weight: 700;
  margin-top: 5px;
`;

const AddressSpan = styled.span`
  font-size: 13px;
  margin-top: 5px;
`;

export default Product;