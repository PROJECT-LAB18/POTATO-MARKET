import styled from 'styled-components';

import Filter from "./Filter";

import Product from "@/components/product";
import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';


function HotArticles(){
  return(
    <main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">중고거래 인기매물</h2>
      <Filter />
      <ProductList >
        <h3 className="a11yHidden">중고거래 매물리스트</h3>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </ProductList>
    </main>
  )
}

const ProductList = styled.section`
  margin: 28px auto;
  display: grid;
  gap: 55px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 309px;
`

export default HotArticles;