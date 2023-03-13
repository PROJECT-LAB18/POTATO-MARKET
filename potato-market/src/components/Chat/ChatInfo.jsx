/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';

import styled from 'styled-components';

import classes from '@/styles/chatInfoStyle.module.css'

import defaultProfile from '@/assets/default_profile.png'

import HamburgerMenu from './HambugerMenu'

  const Bgcolor = styled.div`
    color: red;
    `

  export default function ChatInfo() {
  const [isToggleOpen,setIsToggleOpen] =useState(false);
    
  return (
    <article className={classes.main}>
    <section className={classes.header}>
      <img className='other-profile' src={defaultProfile} width='40px' alt="프로필" />
      <HamburgerMenu isToggleOpen={isToggleOpen} setIsToggleOpen={setIsToggleOpen}/>
    </section>
    
    <section>
      <div>제품사진</div>
      <Bgcolor>
      <div>
        <span>제품명</span>
        <span>제품가격</span>
      </div>
      </Bgcolor>
      <div>
       판매중
      </div>
    </section>


  </article>
  );
}

