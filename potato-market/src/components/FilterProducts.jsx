import Product from "./product";

import styled from "styled-components";

import errorImg from "@/assets/errorImg.svg";

const FilteredProducts = ({ newArr, searchKeyword ,setHasResults}) => {
  const filteredProducts = newArr.filter(({ title }) =>
    title.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  if (filteredProducts.length === 0) {
    setHasResults(false);
    return (
      <NotFoundImg>    
        <img alt="해당하는 상품이 없습니다." src={errorImg} />
        <h1> 찾는 제품이 없습니다.</h1>
      </NotFoundImg>
    );
  }
  setHasResults(true);
  return filteredProducts.map( ({ content, title, price, side, imgsrc, id, check, heart ,location, recommend},index) => (
    <Product
      key={index}
      check={check}
      content={content}
      heart={heart}
      id={id}
      imgsrc={imgsrc}
      location={location}
      price={price}
      recommend={recommend}
      side={side}
      title={title}
    />
  ));
};

const NotFoundImg = styled.div`
  @media (max-width: 1023px){
    text-align: center;
    img{
      width: 70%;
    }
  }
`

export default FilteredProducts;