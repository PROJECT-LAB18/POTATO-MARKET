import { useRef, useEffect } from "react";
import { useParams } from "react-router";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRecoilState } from "recoil"
import styled from "styled-components"

import { db } from '@/firebase';
import { userInformation } from "@/stores/userAuth.js"
import { gray5, primaryColor } from "@/styles/global";

function Recommend({ recommend }) {
  const [userInfo] = useRecoilState(userInformation);
  const inputValue = useRef();
  const uid = useParams();

  useEffect(()=>{    
    inputValue.current.value = "";
  })
  const sendHandler = () =>{
    if(inputValue.current.value==="") return;
    
    const userRef = doc(db,"UserWrite",uid.id);
    const userSnap = getDoc(userRef);   
    userSnap.then((item)=>{
      recommend = item.data().recommend;
      recommend.push({
        id: userInfo.nickname,
        time: Date(),
        content: inputValue.current.value,
        commendimg: userInfo.profileImage,
      })
      inputValue.current.value = "";
      updateDoc(userRef, { recommend: recommend }).then(() => { location.reload() })
    });
  }
  return (
    <Div>
      <h2>댓글 {recommend.length}</h2>
      <ul>
        {recommend.length > 0 ?
          <>{recommend.map(({ content, id, time, commendimg }, index) => (
            <li key={index} className="recommend-list">
              <img alt="사진" src={commendimg ? commendimg : "https://firebasestorage.googleapis.com/v0/b/potato-market-lab18.appspot.com/o/default_profile.png?alt=media&token=8d1123dc-f7dd-4439-a8e3-881b1ce4a401"} />
              <div className="recommend-wrapper">
                <span>{id ? id : '수상한 고구마'}</span>
                <span className="time-span">{time.slice(3, 23)}</span>
              </div>
              <span className="content">{content}</span>
            </li>
          ))}</>
          : <p>아직 댓글이 없습니다.</p>}

      </ul>
      <div className="input-div">
        <img alt="본인 프로필" src={userInfo.profileImage?userInfo.profileImage:"https://firebasestorage.googleapis.com/v0/b/potato-market-lab18.appspot.com/o/default_profile.png?alt=media&token=8d1123dc-f7dd-4439-a8e3-881b1ce4a401"} />
        <input ref={inputValue} type="text" />
        <button type="button" onClick={sendHandler}>게시</button>
      </div>
    </Div>
  )
}

const Div = styled.div`
  padding: 35px 0;
  border-bottom: 1px solid rgb(233, 236, 239);
  img{
    border-radius: 50%;
    width:50px;
    height: 50px;
  }
  span{
    font-weight: 700;
  }
  h2{
    font-weight: 600;
    font-size: 19px;
    margin-bottom: 20px;
  }
  p{
    margin-bottom: 20px;
  }
  .recommend-list{
    height: 75px;
    display: flex;
    position: relative;
  }
  .time-span{
    margin-left: 5px;
    font-weight: 400;
    font-size: 11px;
    color: ${gray5};
    letter-spacing: .5px;
  }
  .recommend-wrapper{
    left: 65px;
    position: absolute;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 6px;
  }
  .input-div{
    margin-top: 10px;
    gap: 15px;
    position: relative;
    display: flex;
    justify-content: center
  }
  .content{
    word-wrap: break-word;
    display: inline;
    margin-left: 15px;
    margin-top: 27px;
    max-width: 580px;
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
    padding 10px 15px;
    top: 7px;
    position: absolute;
    right: 10px;
    border: none;
    background-color: inherit;
    color: ${primaryColor};
    font-weight: 700;
  }
`

export default Recommend