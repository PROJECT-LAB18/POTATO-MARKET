import { useEffect, useState } from 'react';

import { useRecoilState } from "recoil";
import styled from 'styled-components';

import LoadingSpinner from '@/components/LoadingSpinner';
import LoginState from '@/components/LoginState';
import Product from "@/components/product";

import { userWriteRef } from '@/firebase';
import { userId, userInformation } from '@/stores/userAuth';
import { ContainerGlobalStyle } from '@/styles/ContainerGlobalStyle';
// import FormButton from '@/styles/FormButton';
import { gray5, primaryColor } from '@/styles/Global';
import ProductList from '@/styles/ProductList';

function MyPage() {
  const [render, setRender] = useState(false);
  const [userUid] = useRecoilState(userId);
  const [userInfo] = useRecoilState(userInformation);
  const [newArr, setNewArr] = useState([]);

  useEffect(() => {
    const query = userWriteRef.where('userId', '==', userUid); // 현재 사용자의 uid와 일치하는 문서 가져오기
    query.onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ // 각 문서 객체화
        id: doc.id, // 객체의 아이디 값 지정
        ...doc.data() // 기존 데이터들을 객체 형태로 받아옴
      }));
      docs.sort((b, a) => a.date - b.date);
      setNewArr(docs);
      setRender(true);
    });
  }, [userUid]);

  return (
    <>
      {userUid == null ? <LoginState state="login" /> :
        <Main className="wrapper">
          <ContainerGlobalStyle />
          <h2 className="articleTitle">마이페이지</h2>
          <MyProfile>
            <div className="basicInfo">
              <img alt="내 프로필 사진" className="profileImage" src={userInfo.profileImage} />
              <span className="intro">
                <b aria-label="내 주소" className="location">
                  "{userInfo.location.sido} {userInfo.location.sigungu} {userInfo.location.bname}"
                </b>
                에서 🥔를 캐는<br />
                나는
                <b aria-label="내 닉네임" className="nickname">{userInfo.nickname}</b>
              </span>
              <span aria-label="내 UID" className="uid">#{userUid}</span>
              <Temperature>
                <img alt="매너온도 아이콘" className="face" src="src/assets/icon_temp4.svg" />
                <div className="right-box">
                  <span className="text">36.5 ℃</span>
                  <div className="gauge">
                    <span className="gauge_bar" style={{ width: 36 + '%' }}></span>
                  </div>
                </div>
              </Temperature>
            {/* <FormButton type="submit">회원정보 변경</FormButton> */}
            </div>
          </MyProfile>
          <h2 className="articleTitle">나의 매물</h2>
          <ProductList >
            {render
              ? newArr.map(({ content, title, price, side, imgsrc, id, check, heart }, index) => (
                <Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} price={price} side={side} title={title} />
              ))
              : <LoadingSpinner className="loading" />
            }
          </ProductList>
        </Main>
      }
    </>
  )
};

const Main = styled.main`
  padding: 80px 0 40px;
  h2 {
    line-height: 36px;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 45px;
  }
`;

const MyProfile = styled.section`
  .basicInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 640px;
    margin: 0 auto 100px;
    padding: 30px 10px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 3px 7px 3px rgb(0 0 0 / 7%);
    .profileImage {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin-bottom: 20px;
      border-radius: 50%;
      border: 1px solid ${gray5};
    }
    .intro {
      margin-bottom: 6px;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
    }
    .location {
      padding: 0px 4px;
      color: ${primaryColor};
      font-size: 16px;
      line-height: 24px;
      margin: 0 3px;
    }
    .nickname {
      padding: 0 4px;
      font-size: 22px;
      font-weight: 700;
      line-height: 30px;
    }
    .uid {
      font-size: 12px;
      color: ${gray5};
      vertical-align: top;
    }
    /* button {
      width: auto;
      height: 40px;
      padding: 0 30px;
      line-height: normal;
    } */
    @media screen and (max-width: 767px) {
      width: calc(100% - 60px);
    }
  }
`;

const Temperature = styled.div`
  display: flex;
  width: 360px;
  padding: 20px;
  box-sizing: border-box;
  .face {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .right-box {
    flex: 1;
  }
  .text {
    color: rgb(49,158,69);
    font-weight: 700;
    font-size: 16px;
  }
  .gauge {
    position: relative;
    width: 100%;
    height: 8px;
    margin: 4px 0;
    border-radius: 2.5px;
    background-color: rgb(233,236,239);
    &_bar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      border-radius: 2.5px;
      background-color: rgb(49,158,69);
    }
  }
  @media screen and (max-width: 767px) {
    max-width: 360px;
    width: 100%;
  }
`;

export default MyPage;