import Product from './Product';

import ErrPotato from '@/assets/404감자.png'; 

import styled from 'styled-components';

const FilteredProducts = ({ newArr, searchKeyword ,setHasResults}) => {
  const filteredProducts = newArr.filter(({ title }) =>
    title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    setHasResults(false);
    return (<>
    
    <img src={ErrPotato} alt="Error" />
    <h1> 찾는 제품이 없습니다.</h1>; 
    
    </>
    )
    
  }
  setHasResults(true);
  return filteredProducts.map( ({ content, title, price, side, imgsrc, id, check, heart },index) => (
     <Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} price={price} side={side} title={title}/>
     )
  );
};





export default FilteredProducts;
