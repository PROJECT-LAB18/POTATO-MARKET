import { useEffect, useMemo, useRef, useState } from 'react';

import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useRecoilState } from 'recoil';
import styled from "styled-components";

import { onChat } from '../stores/onChat';

import chat_bg from "@/assets/chat/chat-bg.svg"
import chat_close_button from "@/assets/chat/chat-close-button.svg"
import send_img from "@/assets/chat/chat-send.svg"
import chat_reset from "@/assets/chat/chat_reset.svg"
import { db } from '@/firebase';
import { userInformation, userId } from "@/stores/userAuth.js"

function Comment() {
  const inputValue = useRef();
  const [lender, setLender] = useState(0);
  const [userInfo] = useRecoilState(userInformation);
  const [userUid] = useRecoilState(userId);
  const [chat, setChat] = useRecoilState(onChat);
  let [chatData, setChatData] = useState({ chat: [] });
  const scrollRef = useRef();
  const userRef = doc(db, "comment", "kviERzom8LpJItP3g23N");
  const userSnap = getDoc(userRef);
  const commentRef = db.collection('comment');

  if (!lender) {
    userSnap.then((item) => { setChatData(item.data()) });
    setLender(1);
  }

  useEffect(() => {
    async function fetchData() {
      onSnapshot(commentRef, () => {
        setLender(0);
      });
    };
    fetchData();
  }, [onSnapshot]);

  useMemo(() => {
    if (chat) {
      setTimeout(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }, 150);
    }
  }, [lender, chat])

  const sendMessage = () => {
    const userRef = doc(db, "comment", "kviERzom8LpJItP3g23N");
    const userSnap = getDoc(userRef);
    userSnap.then((item) => {
      chatData = item.data();
      chatData.chat.push({
        id: userUid ? userInfo.nickname : "수상한 고구마",
        coment: inputValue.current.value,
        time: Date(),
        img: userUid ? userInfo.profileImage : "https://firebasestorage.googleapis.com/v0/b/potato-market-lab18.appspot.com/o/default_profile.png?alt=media&token=8d1123dc-f7dd-4439-a8e3-881b1ce4a401"
      });
      inputValue.current.value = "";
      updateDoc(userRef, chatData).then(() => {
        userSnap.then(() => {
          setLender(0)
        })
      })
    });
  };

  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  const escClose = (e) => {
    if (e.keyCode === 27) {
      setChat(false);
    }
  }

  return (
    <>
      {
        chat == true ?
          <Div>
            <div className="header-div">
              <h2 className="chat-h2">우리동네 감자 모임</h2>
              <button className="reset-button" type="button" onClick={() => {
                const newData = { chat: [] };
                updateDoc(userRef, newData).then(() => {
                  userSnap.then(() => {
                    setLender(0)
                  })
                })
              }
              }></button>
              <button className="chat-false-button" type="button" onClick={() => { setChat(false) }}></button>

            </div>
            <div className="div-warpper">
              <ul ref={scrollRef}>
                {/* <li className='notice'><p>관리자:</p><p>초기화를 누를 경우, 모든 유저의 채팅이 증발합니다.
            <br></br>마지막 업데이트 <br></br> &nbsp;2023-03-22 20:00
            </p>
              </li> */}
                {lender ? chatData.chat.map((item, index) => (
                  <li key={index}><img alt={item.img} src={item.img}></img>
                    <div className="chat-line">
                      <p>{item.coment}</p>
                      <p className="time-class">{item.time.slice(7, 23)} • {item.id}</p>
                    </div>
                  </li>
                )) : <p>렌더링중</p>}
              </ul>
            </div>
            <div className="comment-div">
              <div className="comment-wrapper-div">
                <input ref={inputValue} type="text" onKeyDown={escClose} onKeyPress={handleOnKeyPress} />
                <button className="send-button" type="button" onClick={sendMessage}></button>
              </div>
            </div>
          </Div>
          : null
      }
    </>
  )
}

const Div = styled.div`
  z-index:9999;
  border-radius: 10px;
  background: #FBF7F2 url(${chat_bg}) no-repeat ;
  background-position: 0% 100%;
  position: fixed;
  right: 0;
  top: 23%;
  margin-right: 35px;
  width: 432.9px;
  height: 400px;
  box-shadow: 0 3px 7px 3px rgb(0 0 0 / 7%);
  & .header-div{
    width: 100%;
    position: relative;
    justify-content: flex-start;
    display:flex;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    color:black;
    height: 30px;
    background: #ffffff;
    width: 432.9px;
    font-weight: 500;
    padding: 0 20px;
    box-sizing: border-box;
  }
  & .chat-h2{
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin:0;
    font-size:15px;
  }

  & .chat-false-button, & .reset-button{
    position:absolute;
    border-radius: 50%;
    border:none;
    width: 18px;
    height: 18px;
    background-color: pink;
  }
  & .chat-false-button{
    background: url(${chat_close_button}) no-repeat, 100%;
    background-position: center;
    right:10px;
    background-size: contain;    
  }
  & .reset-button{
    right: 32px;
    background: url(${chat_reset}) no-repeat, 100%;
    background-position: center;
    background-size: contain;    
  }

  & .time-class{
    font-size:8px;
    position: absolute;
    bottom:-8px;
  }
  & .notice{
    color:white;
    background-color: gray;
  }  

  & ul{
    width: 405px;
    margin:5px 0;
    padding: 10px;
    overflow: auto;
    overflow-x: hidden;
    text-overflow:ellipsis;
    height: 270px;
  }
  & ul::-webkit-scrollbar {
    width: 12px;
  }
  & ul::-webkit-scrollbar-thumb {
    height: 30%;
    background: #AFDBAF;
    border-radius: 10px;
  }
  & ul::-webkit-scrollbar-track {
    background: white;
    border-radius: 10px;
  }
  & li{
    position: relative;
    display:flex;
    align-items: center;
    margin-bottom:8px;
  }
  & li img{
    margin: 10px 10px 0 10px;
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }

  & .chat-line{
    min-height: 20px;
    margin-bottom:5px;
    margin-top: 10px;
    padding:5px;
    border-radius: 10px;
    border: 0.666px solid #F2F3F6;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    max-width: 335px;
    letter-spacing: 1px;
  }
  & .chat-line p{
    max-width: 335px;
  }

  & li p:first-child{
    margin-right: 5px;
    margin-left: 5px;
  }
  & li p:nth{
    margin-right:10px;
  }

  & .comment-div{
    gap:5px;
    display:flex;
    justify-content: center;
    position: relative;
    margin-top: 20px;
    overflow: hidden;
    font-size: 15px;
  }
  & .comment-div input:focus {
    outline: none;
  }  
  & .comment-div input{
    padding:0 37px 0 15px;
    margin:0 auto;
    width: 250px;
    height: 30px;
    border: none;
    border-radius: 15px;
  }
  & .comment-wrapper-div{
    position: relative;
  }
  
  & .send-button{
    position: absolute;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: url(${send_img}) no-repeat;
    background-position: center;
    background-size: contain;  
    right: 10px;
    top: 5px;
  }
  & .send-button img{
    width: 100%;
  }
`

export default Comment