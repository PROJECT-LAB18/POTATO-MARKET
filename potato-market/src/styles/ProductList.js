import styled from 'styled-components';

const ProductList = styled.section`
  margin: 35px auto;
  display: grid;
  gap: 55px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 309px;
  & .loading{
    left:43%;
    position: absolute;
  }
  @media (max-width: 767px){
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width:768px) and (max-width: 1023px){
    grid-template-columns: repeat(3, 1fr);
  }
`

export default ProductList;