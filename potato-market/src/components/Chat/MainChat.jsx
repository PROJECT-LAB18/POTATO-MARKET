/* eslint-disable import/no-unresolved */
import { useState } from 'react';

import styled from 'styled-components';

import { gray2, gray3, gray4, primaryColor, gray7, gray8 } from '../../styles/Global';

import alias from '@/assets/alias.png'
import defaultProfile from '@/assets/default_profile.png'

import imogi from '@/assets/imogi.png'
import inputFile from '@/assets/inpu_file.png'
import ChatInfo from '@/components/Chat/ChatInfo';
import classes from '@/styles/mainChatStyle.module.css'


const GuideMent = styled.section`
position: relative;
  border: 1px solid ${gray2};
  border-radius: 10px;
  padding:20px;
  margin: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: ${gray2};
  font-size: .875rem;
  color: ${gray7};
`

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
const TextInputBox=styled.section`
display: flex;
flex-direction: column;
justify-content: end;
form{
  display: flex;
  justify-content: space-between;
    flex-direction: column;
    position: relative;
    border: 1px solid #212121;
    margin-top: 15px;
    border-radius: 8px;
    height: 125px;
}
textarea{
      margin: 15px 15px 0px;
      resize: none;
      font-size: 14px;
      border: none;
      outline: none;
      color: #212121;
} 
div{
  margin: 3px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img{
    margin-right: 20px;
    width: 20px;
  }
  span{
    display: flex;
    align-items: center;
    margin-right: 10px;
    color:${gray4};
  }
}
`
const InputSubmitButton =styled.button`
  border: none;
  background-color: ${gray3};
  border-radius: 4px;
  color: ${gray2};
  width: 64px;
  height: 32px;
  margin-left: 10px;
`
export default function MainChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage('');
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };


  return (

    <article className={classes.main}>
     <ChatInfo/>
     <GuideMent >
      <span>000님은 당근페이 사용자예요. 채팅방에서 바로 송금할 수 있어요.</span>
      </GuideMent>
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

          {messages.map((msg, index) => (<div key={index}>{msg}</div>))}
            채팅
            </span>
          </MyMessageBox>
         </div>
      </section>
      <TextInputBox>
          <form onSubmit={handleMessageSubmit}>
            <textarea  className='textbox' placeholder='메세지를 입력해주세요' value={message} maxLength={1000} onChange={handleMessageChange} />
            <div>
              <div>
                
              <label  htmlFor="file-input" > 
              <img id='file-input' src={inputFile} alt="이미지 파일 추가 " />
              </label>
              <label  htmlFor="file-input" > 
              <img id='file-input' src={alias} alt="단축어" />
              </label>
              <label  htmlFor="file-input" > 
              <img id='file-input' src={imogi} alt="이모티콘" />
              </label>
              </div>
              <div>

              <span className='text-length'>{message.length}/1000</span>
              <InputSubmitButton type='submit'>전송</InputSubmitButton>
              </div>
            </div>
          </form>
      </TextInputBox>
    </article>
  );
}

