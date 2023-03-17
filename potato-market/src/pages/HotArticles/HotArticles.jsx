import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Filter from "./Filter";

import Product from "@/components/product";
import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';

import firebase from '@/firebase';
import LoadingSpinner from '../../components/LoadingSpinner';

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
     Setrender(1);
  })})},[])
  
  
  return(
    <main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">중고거래 인기매물</h2>
      <Filter />
      <ProductList >
        <h3 className="a11yHidden">중고거래 매물리스트</h3>
        {render?serverdata.map(({content,title,price,side,imgsrc,},index)=>(
          <Product key={index} imgsrc={imgsrc} content={content} title={title} price={price} side={side}/>
        )):<LoadingSpinner className="loading"/>}
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
  & .loading{
    left:43%;
    position: absolute;
  }
  @media (max-width: 640px){
    margin: 0 auto;
    width:100%;
    grid-template-columns: repeat(2, 1fr);
  }
`

export default HotArticles;