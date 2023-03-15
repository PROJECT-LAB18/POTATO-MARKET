/* eslint-disable import/no-unresolved */
import React from 'react';

import styled from 'styled-components';

import { gray3, gray4, primaryColor,gray8 } from '../../styles/Global';

import defaultProfile from '@/assets/default_profile.png'
import classes from '@/styles/mainChatStyle.module.css'

const DayRecord=styled.section`
  margin:0 auto;
  border: 1px solid ${gray4};
  border-radius: 14px;
  width: fit-content;
  padding: 5px 12px;
  font-size: .875rem;
  color: ${gray8};
`
const TimeRecord=styled.section`
  display:none;
`
const OtherProfile =styled.img.attrs({src:`${defaultProfile}`})`
    border-radius:50%;
    margin-right: 10px;
    border: 1px solid ${gray3};
    width: 40px;
`
const MessageBox =styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span{

    padding: 10px 14px;
      max-width: 484px;
      font-size: 14px;
      border-radius: 2px 20px 20px;
      background-color: ${gray3};
      color:${gray8};
  }  
   
`
const MyMessageBox=styled.div`
  display: flex;
  justify-content: end;
  span{
      padding: 10px 14px;
      margin-top: 10px;
      max-width: 484px;
      font-size: 14px;
      border-radius: 20px 2px 20px 20px;
      background-color:${primaryColor};
      color: white;

    }

`
export default function MessageBox() {


  const [chatMessages, setChatMessages] = useState([]);

  const handleChatMessageSubmit = (newMessage) => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, newMessage]);
    }
  };

  return (
    <div>
      <div>
        {chatMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <MessageInput onSubmit={handleChatMessageSubmit} />
    </div>
  );
  return (
    <div>
    <section className={classes.chatRecord}>
      <DayRecord>0000년 00월 00일</DayRecord> 
        <MessageBox>
            <OtherProfile alt="상대방 프로필 사진" />
            <span>채팅내용</span>
          </MessageBox>
        <TimeRecord>오전 1:55</TimeRecord> 
        <DayRecord>0000년 00월 00일</DayRecord> 
        <div>
          <TimeRecord>오전 1:55</TimeRecord> 
          <MyMessageBox>
            <span>
              채팅
            </span>
          </MyMessageBox>
         </div>
        {showMessages.map((msg, index) => (<span className={classes.addMessageBox} key={index}>{msg}</span>))}
      </section>
    </div>
  );
}

