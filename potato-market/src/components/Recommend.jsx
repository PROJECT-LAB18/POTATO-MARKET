import { useRef, useState } from "react";

import { useRecoilState } from "recoil"
import styled from "styled-components"

import {db} from '@/firebase';
import { userInformation } from "@/stores/userAuth.js"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router";


function Recommend({recommend}){
  const [userInfo] = useRecoilState(userInformation);
  const inputValue = useRef();
  const uid = useParams();
  console.log(recommend[2].id==false)
  const sendHandler = () =>{  
    const userRef = doc(db,"UserWrite",uid.id);
    const userSnap = getDoc(userRef);   
    userSnap.then((item)=>{
      recommend = item.data().recommend;
      recommend.push({
        id:userInfo.nickname,
        time: Date(),
        content: inputValue.current.value,
        commendimg : userInfo.profileImage,
      })
      inputValue.current.value = "";
      updateDoc(userRef,{ recommend : recommend}).then(()=>{ location.reload()})   
    });
  }
  return(
    <Div>
      <h2>댓글 {recommend.length}</h2>
      <ul>
        {/* <li className="recommend-list">
          <img src="https://firebasestorage.googleapis.com/v0/b/potato-market-lab18.appspot.com/o/default_profile.png?alt=media&token=bdb0de59-063c-42f9-823d-34e5d7b254c3" alt="사진" />
          <div className="recommend-wrapper">
            <span>닉네임</span>
            <span className="time-span">시간</span> 
          </div>
          <span className="content">zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz</span>
        </li> */}
        {recommend.length>0?
         <>{recommend.map(({content,id,time,commendimg},index)=>(
          <li className="recommend-list" key={index}>
          <img src={commendimg?commendimg:"https://firebasestorage.googleapis.com/v0/b/potato-market-lab18.appspot.com/o/default_profile.png?alt=media&token=bdb0de59-063c-42f9-823d-34e5d7b254c3"} alt="사진" />
          <div className="recommend-wrapper">
            <span>{id?id:'수상한 고구마'}</span>
            <span className="time-span">{time.slice(3,23)}</span> 
          </div>
          <span className="content">{content}</span>
        </li>
        ))}</>
        :<h3>아직 댓글이 없습니다.</h3>}

      </ul>
      <div className="input-div">
        <img src={userInfo.profileImage?userInfo.profileImage:"https://firebasestorage.googleapis.com/v0/b/potato-market-lab18.appspot.com/o/default_profile.png?alt=media&token=bdb0de59-063c-42f9-823d-34e5d7b254c3"} alt="본인 프로필" />
        <input ref={inputValue} type="text" />
        <button onClick={sendHandler}>게시</button>
      </div>
    </Div>
  )
}

const Div = styled.div`
  padding:20px 0;
  border-bottom: 1px solid rgb(233, 236, 239);
  img{
    border-radius: 50%;
    width:50px;
    height: 50px;
  }
  span{
    font-weight: 600;
  }
  h2{
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .recommend-list{
    height: 80px;
    display:flex;
    position: relative;
  }
  .time-span{
    font-weight: 500;
    font-size:16px;
    color: #92959b;
  }
  .recommend-wrapper{
    left:65px;
    position: absolute;
  }
  .input-div{
    margin-top:10px;
    gap:15px;
    position: relative;
    display:flex;
    justify-content: center
  }
  .content{
    word-wrap: break-word;
    display:inline;
    margin-left: 15px;
    margin-top: 20px;
    max-width:580px;
  }
  .input-div input{
    border: 1px solid rgb(209, 211, 216);
    border-radius: 12px;
    width:80%;
    padding:0 70px 0 10px;
  }
  .input-div input:focus{
    outline: none;
  }
  .input-div button{
    top:15px;
    position: absolute;
    right:15px;
    border:none;
    background-color: inherit;
    color:#4e6ae9;
    font-weight: 700;
  }
`

export default Recommend