import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Filter from "./Filter";

import Product from "@/components/product";
import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';

import firebase from '@/firebase';

const db = firebase.firestore();



let serverdata = [];
let i = 0;
// console.log(serverdata)

function HotArticles(){
  const [render,Setrender] = useState(0);
  useEffect(()=>{
      db.collection('UserWrite').get().then((item)=>{item.forEach((item)=>{ 
      serverdata[i] = item.data();
      i++;
      console.log(serverdata);
     Setrender(1);
  })})},[])
  
  
  return(
    <main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">중고거래 인기매물</h2>
      <Filter />
      <ProductList >
        <h3 className="a11yHidden">중고거래 매물리스트</h3>
        {render?serverdata.map(({content,title,price,side})=>(
          <Product key={title} content={content} title={title} price={price} side={side}/>
        )):<h1>렌더링중입니다.</h1>}
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