import {db, userWriteRef} from '@/firebase';
import {doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInformation } from "@/stores/userAuth.js"
import styled from "styled-components";

function Comment(){
  const inputValue = useRef();
  const [lender,setLender] = useState(0);
  const [userInfo, setUserInfo] = useRecoilState(userInformation);
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
    <Div>
      <h2 className='chat-h2'>채팅</h2>
      <div ref={scrollRef} className="div-warpper">
        <ul>
          <li className='notice'><p>관리자:</p><p>초기화를 누를 경우, 모든 유저의 채팅이 증발합니다.
          <br></br>마지막 업데이트 <br></br> &nbsp;2023-03-22 20:00
          </p>
            </li>
          {lender?chatData.chat.map((item,index)=>(<li key={index}><p>{item.id}:</p><p>{item.coment}</p>
          <p>{item.time.slice(7,23)}</p></li>
            // console.log(item.id,item.coment)
          )):<p>렌더링중</p>}
        </ul>      
      </div>
      <div className="comment-div">
      <input ref={inputValue} type="text" /><button type="button" onClick={()=>{  
        const userRef = doc(db, "comment", "kviERzom8LpJItP3g23N");
        const userSnap = getDoc(userRef);
        userSnap.then((item)=>{chatData=item.data();
          chatData.chat.push({id:userInfo.nickname,coment:inputValue.current.value,time:Date()});
          inputValue.current.value = "";
          updateDoc(userRef,chatData).then(()=>{ userSnap.then(()=>{   setLender(0)
          })})        
        });
      }}>전송</button>
      <button type="button" onClick={()=>{
        const newData = {chat:[]};
        updateDoc(userRef,newData).then(()=>{ userSnap.then(()=>{  setLender(0) 
        })})
      }
      }>초기화</button>
      </div>
    </Div>
    </>
  )
}



const Div = styled.div`
  z-index:9999;
  border-radius: 30px;
  padding:10px;
  background-color: #aeab99;
  position: fixed;
  right: 0;
  top:25%;
  margin-right: 20px;
  width:300px;
  & .notice{
    color:white;
    background-color: gray;
  }
  & .comment-div{
    display:flex;
  }
  & .comment-div input:focus {outline: none;}
  
  & .comment-div input{
    width:81%;
    border:none;
    border-radius: 10px;
  }
  & .comment-div button{
    width:65px;
    border:none;
    border-radius: 10px;
    font-size: 12px;
  }
  & .chat-h2{
    font-size:18px;
    font-weight: 700;
    text-align: center;
  }
  & ul{
    width:280px;
    margin:5px 0;
    background-color: white;
    padding: 10px;
    overflow: scroll;
    text-overflow:ellipsis;
    height: 400px;
  }
  & li{
    margin-bottom:5px;
    padding:5px;
    border: 1px black solid;
    border-radius: 10px;
    display: flex;
    flex-flow:column;
  }
  & li p:first-child{
    margin-right:10px;
    flex-shrink: 0;
  }
`

export default Comment