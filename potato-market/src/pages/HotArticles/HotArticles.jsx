import { useEffect } from 'react';
import styled from 'styled-components';

import Filter from "./Filter";

import Product from "@/components/product";
import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';

import firebase from '@/firebase';

const db = firebase.firestore();

const boarddata = db.collection('UserWrite').get();
const boarddata2 = db.collection('UserWrite').get().then((item)=>{return item})

db.collection('UserWrite').get().then((item)=>{item.forEach((item)=>{item.data()})})



function HotArticles(){

  useEffect(()=>{
  },[])
  const {title, price, content, side} = boarddata.then((item)=>{item.forEach((item)=>{item.data().price})})

  return(
    <main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">중고거래 인기매물</h2>
      <Filter />
      <ProductList >
        <h3 className="a11yHidden">중고거래 매물리스트</h3>
        {/* {boarddata.then((item)=>{item.forEach((item)=>(
          <Product title={item.data().title} price={item.data().price} side={item.data().side} content={item.data().content}/>
        ))})} */}
        <Product title={title} price={price} side={side} content={content}/>
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