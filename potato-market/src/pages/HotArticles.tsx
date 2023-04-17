import { useEffect, useState } from 'react';

import { onSnapshot } from "firebase/firestore"

import { useRecoilValue } from 'recoil';

import LoadingSpinner from '../components/LoadingSpinner';

import FilterProducts from '../components/FilterProducts';

import { userWriteRef } from '../firebase';

import { searchKeywordState } from '../stores/state';

import { ContainerGlobalStyle } from '../styles/ContainerGlobalStyle';
import ProductList from '../styles/ProductList'
import Wrapper from '../styles/Wrapper'

interface NewObj {
  id: string;
  date: number;
  [key: string]: string | number;
}

let newArr: NewObj[];

function HotArticles(): JSX.Element {
  const [render, Setrender] = useState<number>(0);
  const searchKeyword = useRecoilValue<string>(searchKeywordState);
  const [hasResults, setHasResults] = useState<boolean>(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    newArr = [];

    onSnapshot(userWriteRef, (snapshot) => {
      snapshot.docs.map((doc) => {
        const newObj: NewObj = {
          id: doc.id,
          date: doc.data().date,
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
      {hasResults ? (
        <ProductList>
          <h3 className="a11yHidden">중고거래 매물리스트</h3>
          {render ? (
            <FilterProducts
              newArr={newArr}
              searchKeyword={searchKeyword}
              setHasResults={setHasResults}
            />
          ) : (
            <LoadingSpinner className="loading" />
          )}
        </ProductList>
      ) : (
        <Wrapper>
          <h3 className="a11yHidden">중고거래 매물리스트</h3>
          {render ? (
            <FilterProducts
              newArr={newArr}
              searchKeyword={searchKeyword}
              setHasResults={setHasResults}
            />
          ) : (
            <LoadingSpinner className="loading" />
          )}
        </Wrapper>
      )}
    </main>
  );
}

export default HotArticles;