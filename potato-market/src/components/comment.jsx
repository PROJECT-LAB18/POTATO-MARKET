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
  let [chatData,setChatData] = useState({chat : [{id : "hi",coment: "hi"},]});
  const userRef = doc(db, "comment", "kviERzom8LpJItP3g23N");
  const userSnap = getDoc(userRef);
  const commentRef = db.collection('comment');

  // onSnapshot(commentRef, (snapshot) => {setLender(0)})
  if(!lender){
      console.log(1)
      userSnap.then((item)=>{setChatData(item.data())});
      setLender(1);
  }
  useEffect(()=>{

  },[])


  return(
    <>
    <Div>
      <h2>채팅</h2>
      <ul>
        {lender?chatData.chat.map((item,index)=>(<li key={index}><p>{item.id}</p>:<p>{item.coment}</p></li>
          // console.log(item.id,item.coment)
        )):<p>렌더링중</p>}
      </ul>
      <div className="comment-div">
      <input ref={inputValue} type="text" /><button type="button" onClick={()=>{  
        const userRef = doc(db, "comment", "kviERzom8LpJItP3g23N");
        const userSnap = getDoc(userRef);
        userSnap.then((item)=>{chatData=item.data();
          chatData.chat.push({id:userInfo.nickname,coment:inputValue.current.value});
          console.log(chatData)
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
  background-color: white;
  position: fixed;
  right: 0;
  top:35%;
  margin-right: 10px;
  width:300px;
  border: 1px black solid;
  & .comment-div{
    display:flex;
  }
  & .comment-div input{
    width:81%
  }
  & .comment-div button{
    width:65px;
    font-size: 12px;
  }
  & h2{
    border-bottom: 1px solid black;
  }
  & ul{
    overflow: scroll;
    height: 200px;
  }
  & li{
    display: flex;
  }
`

export default Comment