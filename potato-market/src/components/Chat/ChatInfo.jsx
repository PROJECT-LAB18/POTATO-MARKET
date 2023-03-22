/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import styled from 'styled-components';

import HamburgerMenu from './HambugerMenu'
import productImg from '../../assets/제품사진.png'
import { gray3,gray6 ,primaryColor} from '../../styles/Global';

import defaultProfile from '@/assets/default_profile.png'
import classes from '@/styles/chatInfoStyle.module.css'


const ProfileInfoPreview = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  min-height: 64px;
  border-bottom: 1px solid ${gray3};
    div{
      display: flex;
      align-items: center;
        span{
          &:nth-child(2){
            color: ${gray6};
            font-size:12px;
            font-weight: 600;
          }
          &:nth-child(3){
          
            border:1px solid ${primaryColor};
            border-radius: 1000px;
            color: ${primaryColor};
            text-align: center;
            font-size: 10px;
            padding: 3px 5px;
            margin-left: 5px;
          }
      }
  }
`


const OtherProfile =styled.img.attrs({src:`${defaultProfile}`})`
    border-radius:50%;
    margin-right: 10px;
    border: 1px solid ${gray3};
    width: 40px;
`
const ProductInfoPreview =styled.section`
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid ${gray3};
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    img{
      margin-right: .75rem;
    }
    div{
      font-size: .875rem;
      .product-name-price{
        display: flex;
        flex-direction: column;
        span {
          margin-bottom: 2px;
          
          &:last-child{
            font-weight: 600;
          }
        }
      }
    }
    .sale-label{
      border: 1px solid ${gray6};
      border-radius: 6px;
      padding: 7px;
      font-weight: 600;
    }
    
    a {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
    }



`

  export default function ChatInfo() {
  const [isToggleOpen,setIsToggleOpen] =useState(false);
    
  return (
    <article className={classes.main}>
    <ProfileInfoPreview className={classes.header}>
        <div>
            <OtherProfile />
            <span>상대방이름</span>
            <span>36.7℃</span>
        </div> 
      <HamburgerMenu isToggleOpen={isToggleOpen} setIsToggleOpen={setIsToggleOpen}/>
    </ProfileInfoPreview>
    
    <ProductInfoPreview>
      <div>
        <a href='/'>
          <img src={productImg} width='40px' alt="제품사진" />
          <div className='product-name-price'>
            <span>제품명</span>
            <span>제품가격</span>
          </div>
        </a>
      </div>
      <div className='sale-label'>
        판매중
      </div>
    </ProductInfoPreview>


  </article>
  );
}

