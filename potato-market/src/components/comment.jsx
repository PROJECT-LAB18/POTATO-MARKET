import {db, userWriteRef} from '@/firebase';
import {doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInformation } from "@/stores/userAuth.js"
import styled from "styled-components";
import { onChat } from '../stores/onChat';
import { gray2 } from '../styles/Global';
import close_button from "@/assets/closebutton.svg"
import chat_bg from "@/assets/chat/chat-bg.svg"
import send_img from "@/assets/chat/chat-send.svg"
import chat_close_button from "@/assets/chat/chat-close-button.svg"

function Comment(){
  const inputValue = useRef();
  const [lender,setLender] = useState(0);
  const [userInfo, setUserInfo] = useRecoilState(userInformation);
  const [chat,setChat] = useRecoilState(onChat);
  let [chatData,setChatData] = useState({chat : []});
  const scrollRef = useRef();
  const userRef = doc(db, "comment", "kviERzom8LpJItP3g23N");
  const userSnap = getDoc(userRef);
  const commentRef = db.collection('comment');
  
  if(!lender){
    userSnap.then((item)=>{setChatData(item.data())});
    console.log(scrollRef.current)
    
    setLender(1);
  }

  useEffect(() => {
    console.log('hi')
    const fetchUser = async () => {
      onSnapshot(commentRef, () => {
        setLender(0);
      });
    };
    return fetchUser()
  }, [onSnapshot]);


  return(

    <>
    {chat==true?
    <Div>
      <div className="header-div">
        <h2 className='chat-h2'>동네 감자 모임</h2>
        <button className='chat-false-button' onClick={()=>{setChat(false)}} type="button">
          <img src={chat_close_button} alt="닫기 버튼" />
          {/* <img src={close_button} alt="닫기 버튼" /> */}
        </button>

      </div>
      <div ref={scrollRef} className="div-warpper">
        <ul>
          {/* <li className='notice'><p>관리자:</p><p>초기화를 누를 경우, 모든 유저의 채팅이 증발합니다.
          <br></br>마지막 업데이트 <br></br> &nbsp;2023-03-22 20:00
          </p>
            </li> */}
          {lender?chatData.chat.map((item,index)=>(
          <li key={index}><img alt={item.img} src={item.img}></img>
          <div className="chat-line">
             <p>{item.coment}</p>
            <p className="time-class">{item.time.slice(7,23)}•{item.id}</p>
          </div>
          </li>
            // console.log(item.id,item.coment)
          )):<p>렌더링중</p>}
        </ul>      
      </div>
      <div className="comment-div">
        <div className="comment-wrapper-div">

      <input  ref={inputValue} type="text" />
      <button className="send-button" type="button" onClick={()=>{  
        const userRef = doc(db, "comment", "kviERzom8LpJItP3g23N");
        const userSnap = getDoc(userRef);
        userSnap.then((item)=>{chatData=item.data();
          chatData.chat.push({id:userInfo.nickname,coment:inputValue.current.value,time:Date(),img:userInfo.profileImage});
          inputValue.current.value = "";
          updateDoc(userRef,chatData).then(()=>{ userSnap.then(()=>{   setLender(0)
          })})        
        });
      }}> <img src={send_img} alt="전송버튼" /></button>
        </div>
      <button className="reset-button" type="button" onClick={()=>{
        const newData = {chat:[]};
        updateDoc(userRef,newData).then(()=>{ userSnap.then(()=>{  setLender(0) 
        })})
      }
      }>초기화</button>
      </div>
    </Div>
    
    :null}
    </>
  )
}



const Div = styled.div`
  z-index:9999;
  border-radius: 30px;
  background: #FBF7F2 url(${chat_bg}) no-repeat ;
  background-position:0% 100%;
  position: fixed;
  right: 0;
  top:25%;
  margin-right: 20px;
  width: 432.9px;
  height: 333px;
  & .chat-false-button{
    background-color: white;
    position:absolute;
    right:10px;
    display:flex;
    align-items: center;
  justify-content: center;
    border-radius: 50%;
    border:none;
    width:16px;
    height: 16px;
  }
  & .time-class{
    font-size:8px;
    position: absolute;
    bottom:-5px;
  }
  & .chat-false-button:hover{
    background-color: ${gray2};
  }
  & .notice{
    color:white;
    background-color: gray;
  }
  & .comment-div{
    gap:5px;
    display:flex;
    justify-content: center;
    margin: 20px 0;
    position: relative;
  }
  & .comment-div input:focus {outline: none;}
  
  & .comment-div input{
    padding:0 15px;
    font-size:10px;
    margin:0 auto;
    width: 221.78px;
    height: 23.98px;
    border:none;
    border-radius: 10px;
  }
  & .comment-div button{
    position: absolute;
    font-weight: 700;
    border:none;
    font-size: 12px;
  }
  & .comment-wrapper-div{
    position: relative;
  }
  & .send-button{
    display:flex;
    align-items: center;
  justify-content: center;
    object-fit: cover; 
    border-radius: 50%;
    width:16px;
    height: 16px;
    top:3px;
    right:5px;
  }
  & .send-button img{
    
  }
  & .reset-button{
    right:15px;
    bottom:-10px;
  }
  & .header-div{
    position: relative;
    justify-content: flex-start;
    display:flex;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    color:black;
    height: 25px;
    background-color: #ffffff;
    width: 432.9px;
    font-weight: 700;
  }
  & .chat-h2{
    margin:0;
    padding-left:10px;
    font-size:16px;

  }
  & ul{
    width: 410px;
    margin:5px 0;
    padding: 10px;
    overflow: scroll;
    overflow-x: hidden;
    text-overflow:ellipsis;
    height: 220px;
  }
  & li{
    position: relative;
    display:flex;
    align-items: center;
    margin-bottom:8px;
    
  }
  & .chat-line{
    min-height: 23.98px;
    margin-bottom:5px;
    padding:5px;
    border-radius: 13.32px;
    border: 0.666px solid #F2F3F6;
    display: flex;
    align-items: center;
    background: #FFFFFF;
  }
  & li img{
    margin-left:10px;
    margin-right:9px;
    border-radius: 50%;
    width: 26.64px;
    height: 26.64px;
  }
  & li p:first-child{
    margin-right:10px;
    flex-shrink: 0;
  }
  & li p:nth{
    margin-right:10px;
    flex-shrink: 0;
  }
`

export default Comment