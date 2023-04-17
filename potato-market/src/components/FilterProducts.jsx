import Product from "./product";

import errorImg from "@/assets/errorImg.svg";

const FilteredProducts = ({ newArr, searchKeyword ,setHasResults}) => {
  const filteredProducts = newArr.filter(({ title }) =>
    title.toLowerCase().includes(searchKeyword.toLowerCase())
  );
  if (filteredProducts.length === 0) {
    setHasResults(false);
    return (
      <>    
        <img alt="해당하는 상품이 없습니다." src={errorImg} />
        <h1> 찾는 제품이 없습니다.</h1>;     
      </>
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

export default FilteredProducts;