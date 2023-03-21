import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom";

import {doc, getDoc, updateDoc, increment, onSnapshot, deleteDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import styled from "styled-components"

import close_button from "../assets/closebutton.svg"
import LoadingSpinner from "../components/LoadingSpinner";
import Product from "../components/product"
import SwiperPhoto from "../components/swiper"
import { WriteInput } from "../components/WriteForm";

import icon_temp4 from "@/assets/icon_temp4.svg"
import {db, userWriteRef} from '@/firebase';

import { userInformation } from "@/stores/userAuth.js"
import moneyUnit from "@/utils/moneyUnit";

function Detailarticle(){
  const [propsdata, setPropsdata] = useState({
    title : null,
    side : null, 
    date : null,
    price : null,
    content : null,
    heart : null,
    chat : null,
    check : null,
    imgsrc : null,
    userId : null,
    nickname: null,
    profileImage: null,
    location: null,
  })
  
  const uid = useParams();
  const [render, Setrender] = useState(0);
  let [myBoard] = useState(0);
  const userRef = doc(db, "UserWrite", uid.id);
  const userSnap = getDoc(userRef);
  const [userId] = useRecoilState(userInformation);

  if(userId.uid == propsdata.userId){
    myBoard = 1;
  }
  useEffect(()=>{
    window.scrollTo(0, 0);
    const newObj = {
      check : increment(1)
    };
    updateDoc(userRef,newObj).then(()=>{ userSnap.then((res)=>{
      setPropsdata(res.data());
      Setrender(1);
    })})
    ;
  }, [uid])

  return (
    <>
      {render?<Productdetail chat={propsdata.chat} check={propsdata.check} content={propsdata.content} data={propsdata.data} heart={propsdata.heart} imgsrc={propsdata.imgsrc} location={propsdata.location} nickname={propsdata.nickname} price={propsdata.price} profileImage={propsdata.profileImage} side={propsdata.side} state={myBoard} title={propsdata.title}  
        />:<LoadingSpinner/>}
    </>
  )
}

function Productdetail({state,title,side,nickname,profileImage,location,temperature,date,price,content,heart,chat,check,imgsrc}){
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [render, Setrender] = useState(0);
  const [clickModified, setClickModified] = useState(0);
  const [clickDelete, setClickDelete] = useState(0);
  const [heartArr, setHeart] = useState([]);
  const clickButton = () => {setClick(click?0:1)}
  
  const uid = useParams();
  const userRef = doc(db, "UserWrite", uid.id);
  const userSnap = getDoc(userRef);
  const [modifiedContent, setModifiedContent] = useState({
    modifiedTitle: title,
    modifiedPrice: price,
    modifiedContent: content
  });

  const onChangeHandler = (e) => {
    setModifiedContent((prev)=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(()=>{
    onSnapshot(userWriteRef,(snapshot)=>{
      const newArr = snapshot.docs.map(doc=>{
        return {
          id : doc.id,
          ...doc.data()
        }
      })
      newArr.sort((b, a) => a.heart - b.heart);
      setHeart(newArr.slice(0, 6));
      Setrender(1);
    })
  },[])

  const modifyBorderContent = ()=>{
    setClickModified(1);
    updateDoc(userRef, {
      title: title,
      price: price,
      content: content,
    })
  }

  return (
    <Main>
      <Section>
        <button aria-label="화면 클릭 하면 확대가능합니다." className="image-button" type="button" onClick={clickButton}>
          <SwiperPhoto imgsrc={imgsrc[0]!==undefined?imgsrc:"https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/no_image.jpg?alt=media&token=d2d005ba-9dbb-40cb-bd61-4d47f5118b2c"} />
        </button>

        {
          click ?
          <div className="module-swiper">
            <button className="a11yhidden-button" type="button" onClick={clickButton}>
              <img alt="닫기 버튼" src={close_button} />
            </button>
            <SwiperPhoto imgsrc={imgsrc[0]!==undefined?imgsrc:"https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/no_image.jpg?alt=media&token=d2d005ba-9dbb-40cb-bd61-4d47f5118b2c"}/>
          </div>
          : null
        }
        
        <Link className="profile" href="naver.com" rel="noopener noreferrer" target="_blank" to={`/HotArticles`} >
          <div className="left-profile">
            <img alt="프로필 사진" className="profile-image" src={profileImage} />
            <div>
              <span className="nickname">{nickname}</span>
              <span className="address">{location.sido} {location.sigungu} {location.bname}</span>
            </div>
          </div>
          <div className="right-profile">
            <div>
              <span className="temperature">{temperature} ℃</span>
              <span className="thermometer"></span>
            </div>
            <img alt="당근 온도 이모티콘" className="temperature-image" src={icon_temp4} />
          </div>
        </Link>
        <div className="article">
          <h2 className="title">
            {title}
          </h2>
          <div className="side-title">
            <span>{side}</span>
            <span>{date}일 전</span>
          </div>
          <p className="price">
            {moneyUnit(price)}원
          </p>
          <p className="content">
            {content}
          </p>
          <div className="counting-group">
            <span>관심 {heart} </span>
            <span>채팅 {chat} </span>
            <span>조회 {check} </span>
          </div>
          <div className="button-list">
            {state?
            <>
              <CustomButton onClick={modifyBorderContent}>수정</CustomButton>
              <CustomButton red onClick={()=>{setClickDelete(1)}}>삭제</CustomButton>
            </>:                    
            <CustomButton>채팅하기</CustomButton>         
            }
          </div>
        </div>
      </Section>
      <Section>
        <div className="best-product-group">
          <h2>당근마켓 인기중고</h2>
          <Link rel="noopener noreferrer" to={`/HotArticles`} >더 구경하기</Link>
        </div>

        <div className="best-product">
        {render?heartArr.map(({content,title,price, side,imgsrc,location,id,heart,check},index)=>(
          <Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} location={location} price={price} side={side} title={title} />
        )):<LoadingSpinner className="loading"/>}
        </div>
      </Section>
      {clickDelete?
      <DeleteDiv>
        <form>
          <h3>정말로 삭제하시겠습니까?</h3>
          <div className="button-wrapper">
            <CustomButton red onClick={(e)=>{
              e.preventDefault();  
              deleteDoc(doc(db,"UserWrite",uid.id)).then(()=>{navigate("/HotArticles");})
            }}>삭제</CustomButton>
            <CustomButton onClick={()=>{setClickDelete(0)}}>취소</CustomButton>
          </div>
        </form>
      </DeleteDiv>:
      null      
      }

      {clickModified?
      <ModifiedDiv>
        <form>
          <h2>게시글 수정</h2>
          <div className="input-wrapper">
          <WriteInput className="title-input" name="modifiedTitle" type="text" value={modifiedContent.modifiedTitle} onChange={onChangeHandler}/>
          <WriteInput className="price-input" name="modifiedPrice" type="number" value={modifiedContent.modifiedPrice} onChange={onChangeHandler}/>
          </div>
          <WriteInput content className="content-input" name="modifiedContent" type="text" value={modifiedContent.modifiedContent} onChange={onChangeHandler}/>
          <div className="button-wrapper">
            <CustomButton onClick={()=>{setClickModified(0)}}>취소</CustomButton>
            <CustomButton className="modifie-button" onClick={()=>{ 
              const newObj = {
                content: modifiedContent.modifiedContent,
                price: modifiedContent.modifiedPrice,
                title: modifiedContent.modifiedTitle,
              };
              updateDoc(userRef,newObj).then(()=>{ userSnap.then(()=>{
                location.reload();
              })})
            }}>수정</CustomButton>
          </div>
        </form>
      </ModifiedDiv>:null  
    } 
    </Main>
  )
}

Productdetail.defaultProps={
  title:'제목을 입력해주세요.',
  side:'가구',
  nickname : '닉네임',
  address : '인천시 부평구 산곡동',
  temperature : '36.5',
  date : '1',
  price : '500',
  content : '판매 완료',
  heart : '0',
  chat : '0',
  check : '0',
  imgsrc : ["https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8E%E1%85%B5.png?alt=media&token=f23ce701-2450-495f-8166-2e1049699b2b",
    "https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8E%E1%85%B5.png?alt=media&token=f23ce701-2450-495f-8166-2e1049699b2b",
    "https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8E%E1%85%B5.png?alt=media&token=f23ce701-2450-495f-8166-2e1049699b2b",
    "https://firebasestorage.googleapis.com/v0/b/patato-market.appspot.com/o/%E1%84%80%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8E%E1%85%B5.png?alt=media&token=f23ce701-2450-495f-8166-2e1049699b2b"]
}

const DeleteDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top:0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.54);
  position: fixed;
  z-index:100;
  & .button-wrapper{
    display:flex;
    gap:20px;
  }
  button:first-child{
    border: none;
  }
  & h3{
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 24px;
  }
  & form{
    border-radius: 20px;
    background-color: white;
    width: 503px;
    height: 100px;
    padding: 40px 0px;
    display: flex;
    align-items: center;
    flex-flow: column;
  }
`
const ModifiedDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  top:0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.54);
  position: fixed;
  z-index:100;
  & .input-wrapper{
    display:flex;
    width:100%;
    justify-content: center;
    gap:20px;
  }
  & .title-input{
    width: 507px;
    height: 38px;
  }
  & .price-input{
    width: 150px;
  }
  & .content-input{
    width: 673.5px;
    height: 288px;
    margin-bottom: 40px;
  }
  & .button-wrapper{
    display:flex;
    gap:20px;
  }
  & .modifie-button{
    background: #CFA36E;
    color:white;
  }
  & .modifie-button:hover{
    background: #a58258;
  }
  & form{
    border-radius: 20px;
    background-color: white;
    width: 803px;
    height: 500px;
    padding: 40px 0px;
    display: flex;
    align-items: center;
    flex-flow: column;
  }
  & h2{
    font-weight: 600;
    font-size: 32px;
    margin-bottom: 24px;
  }
`
const CustomButton = styled.button`
  & .BoardDeleteButton{
    border: 1px solid #FFFFFF;
  }
  cursor:pointer;
    width: 99px;
    height: 40px;
    color : ${props => props.red ? '#FFFFFF' : '#212124'};
    background: ${props => props.red ? '#CFA36E' : '#FFFFFF'};
    border: 1px solid #D1D3D8;
    border-radius: 4px;
    font-weight: 700;
    font-size: 16px;
    &:hover{
    background: ${props => props.red ? '#a7845b' : '#D1D3D8'};
    transition: .5s;
  }
`

const Main = styled.main`
  & a{
    color:black;
  }
  display:flex;
  flex-flow:column;
  align-items: center;
  width:100%;
  margin-top: 40px;
  margin-bottom: 40px;
`
const Section = styled.section`
  width:677px;
  & .swiper{
    height: 500px;
    border-radius: 8px;
    overflow:hidden;
  }
  & .swiper img{
    width:100%;
    height: 100%;
  }
  & .profile{
    text-decoration: none;
    margin: 24px 0;
    height: 42px;
    display:flex;
    flex-flow:row;
    justify-content: space-between;
  }
  & .profile span{
    display:inline-block;
  }
  & .left-profile, & .right-profile{
    display:flex;
    align-items: center;     
    flex-flow:row;
  }
  & .right-profile{
    text-align: right;
  }
  & .right-profile div{
    gap:8px;
  }
  & .left-profile div,& .right-profile div{
    display:flex;
    flex-flow:column;
  }
  & .left-profile div{
    margin-left: 8px;
  }
  .nickname{
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 5px;
  }
  .address{
    font-weight: 400;
    font-size: 13px;
  }
  & .right-profile div{
    margin-right:8px;
  }
  .temperature{
    font-size: 16px;
    font-weight: 700;
    color: #319E45;
  }
  & .profile-image{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 3px;
  }
  & .temperature-image{
    width: 30px;
    height: 30px;
    border-radius: 20px;
  }

  & .best-product{
    display:inline-block;
    margin-top: 10px;
  }
  & .best-product .product{
    margin:30px 11px;
  }
  & .article{
    position:relative;
    padding: 36px 0;
    border-bottom: 1px solid #E9ECEF;
    border-top: 1px solid #E9ECEF;
  }
  & .title{
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 8px;
  }
  & .side-title{
    font-weight: 400;
    font-size: 13px;
    color: #868E96;
    margin-bottom:12px;
  }
  & .side-title span:first-child::after{
    content: '•';
    margin-right:5px;
  }
  & .price{
    font-weight: 700;
    font-size: 17px;
    margin-bottom:22px;
  }
  & .content{
    font-weight: 400;
    font-size: 17px;
    margin-bottom: 50px;
  }
  & .counting-group{
    color: #868E96;
    font-weight: 400;
    font-size: 13px;
  }
  & .counting-group span::after{
    content:'•';
  }
  & .counting-group span:last-child::after{
    content:'';
  }
  & .best-product-group{
    display:flex;
    justify-content: space-between;
    margin-top:35.45px;
  }
  & .best-product-group h2{
    font-weight: 600;
    font-size: 18px;
  }
  & .best-product-group a{
    color: #CFA36E;
    font-weight: 400;
    font-size: 15px;
    text-decoration: none;
  }

  & .thermometer{
    background: rgb(49,158,69);
    background: linear-gradient(90deg, rgba(49,158,69,1) 50%, rgba(233,236,239,1) 38%);
    width: 100px;
    height: 4px;
  }
  & .button-list{
    position: absolute;
    right:0;
    bottom:27px;
  }
  & .button-list button{
    margin-left:18px;    
  }
  & .button-list button:nth-child(2){
    border: none;
  }
  & .module-swiper{
    top:0;
    left:0;
    z-index:999;
    position:fixed;
    width:100%;
    height:100%;
  }
  & .module-swiper .swiper{
    background-color: black;
    height:100%;
  }
  & .module-swiper .swiper-slide-active{
    text-align: center;
  }
  & .module-swiper img{
    max-width:1200px;
    max-height:100%;
    width:100%;
    height:auto;
  }
  & .module-swiper .swiper-pagination-bullet{
    position: relative;
    bottom:10px;
    width:50px;
    height:50px; 
  }
  & .a11yhidden-button{
    border:0;
    position:absolute;
    right:20%;
    color:white;
    font-size:80px;
    top:0;
    z-index:9999;
    background-color: inherit;
  }
  & .image-button{
    cursor:pointer;
    background-color: inherit;
    border:0;
    width:100%;
  }
`

export default Detailarticle;