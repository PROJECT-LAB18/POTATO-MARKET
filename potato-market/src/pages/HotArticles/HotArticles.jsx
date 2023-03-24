import { useEffect, useState } from 'react';

import { onSnapshot } from "firebase/firestore"

import { useRecoilValue } from 'recoil';

import LoadingSpinner from '../../components/LoadingSpinner';

import Product from "@/components/product";

import { userWriteRef } from '@/firebase';


import { searchKeywordState } from '@/stores/state';


import { ContainerGlobalStyle } from '@/styles/ContainerGlobalStyle';
import ProductList from '@/styles/ProductList'

let newArr = [];

function HotArticles() {
  const [render, Setrender] = useState(0);
  const searchKeyword = useRecoilValue(searchKeywordState);

  useEffect(() => {
    window.scrollTo(0, 0);
    newArr = [];

    onSnapshot(userWriteRef, (snapshot) => {
      snapshot.docs.map((doc) => {
        const newObj = {
          id: doc.id,
          ...doc.data()
        }
        newArr.push(newObj);
        newArr.sort((b, a) => a.date - b.date);
        Setrender(1);
      })
    })
  }, [])

  return (
    <main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">중고거래 인기매물</h2>
      <ProductList>
        <h3 className="a11yHidden">중고거래 매물리스트</h3>
        {render ? newArr.filter(({ title }) => title.toLowerCase().includes(searchKeyword.toLowerCase()))
        .map(({ content, title, price, side, imgsrc, id, check, heart, location }, index) => (
          <Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} location={location} price={price} side={side} title={title} />
        )) : <LoadingSpinner className="loading" />}
      </ProductList>
    </main>
  )
}

export default HotArticles;