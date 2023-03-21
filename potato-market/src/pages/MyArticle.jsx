import { useEffect, useState } from 'react';

import { useRecoilState } from "recoil";

import LoadingSpinner from '@/components/LoadingSpinner';
import Product from "@/components/product";

import { userWriteRef } from '@/firebase';
import { userId } from '@/stores/userAuth';
import { ContainerGlobalStyle } from '@/styles/ContainerGlobalStyle';
import ProductList from '@/styles/ProductList';

let newArr = [];

function MyArticle() {
  const [render, setRender] = useState(0);
  const [userUid] = useRecoilState(userId);

  useEffect(() => {
    newArr = [];
    const query = userWriteRef.where('userId', '==', userUid); // 현재 사용자의 uid와 일치하는 문서 가져오기
    query.onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => { // 각 문서 객체화
        const newObj = {
          id: doc.id, // 객체의 아이디 값 지정
          ...doc.data() // 기존 데이터들을 객체 형태로 받아옴
        }
        newArr.push(newObj);
        newArr.sort((b, a) => a.date - b.date);
        setRender(1);
      });
    });
  }, [userUid])

  return (
    <main className="wrapper">
      <ContainerGlobalStyle />
      <h2 className="articleTitle">내가 등록한 매물</h2>
      <ProductList >
        <h3 className="a11yHidden">중고거래 매물리스트</h3>
        {render
          ? newArr.map(({ content, title, price, side, imgsrc, id, check, heart }, index) => (
            <Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} price={price} side={side} title={title} />
          ))
          : <LoadingSpinner className="loading" />
        }
      </ProductList>
    </main>
  )
};

export default MyArticle;