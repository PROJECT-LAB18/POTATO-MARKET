import { useEffect, useState } from 'react';

import {onSnapshot} from "firebase/firestore";
import styled from 'styled-components';

import Filter from "./Filter";

import LoadingSpinner from '../../components/LoadingSpinner';

import Product from "@/components/product";

import {userWriteRef}  from '@/firebase';

import {ContainerGlobalStyle} from '@/styles/ContainerGlobalStyle';

let newArr = [];

function HotArticles(){
  const [render,Setrender] = useState(0);

  useEffect(()=>{
    window.scrollTo(0, 0);
    newArr = [];
    onSnapshot(userWriteRef,(snapshot)=>{
      snapshot.docs.map((doc)=>{
        const newObj = {
          id : doc.id,
          ...doc.data()
        }
        newArr.push(newObj);
        newArr.sort((b, a) => a.date - b.date);
        Setrender(1);
      })
    })
  },[])
  
  return(
    <main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">중고거래 인기매물</h2>
      <Filter />
      <ProductList >
        <h3 className="a11yHidden">중고거래 매물리스트</h3>
        {render?newArr.map(({content,title,price,side,imgsrc,id,check,heart,location},index)=>(
          <Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} location={location} price={price} side={side} title={title} />
        )):<LoadingSpinner className="loading"/>}
      </ProductList>
    </main>
  )
}

export const ProductList = styled.section`
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

export default HotArticles;