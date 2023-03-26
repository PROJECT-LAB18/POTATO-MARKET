import { useEffect, useState } from 'react';

import imageCompression from "browser-image-compression";
import { useRecoilState } from "recoil";
import styled from 'styled-components';

import icon_temp4 from "@/assets/icon_temp4.svg";
import profileBg from "@/assets/profile-bg.svg";
import LoadingSpinner from '@/components/LoadingSpinner';
import LoginState from '@/components/LoginState';
import { PopWrapper } from '@/components/Popup';

import Product from "@/components/product";

import { storage, usersRef, userWriteRef, auth } from '@/firebase';
import { userId, userInformation } from '@/stores/userAuth';
import { ContainerGlobalStyle } from '@/styles/ContainerGlobalStyle';
import { CustomButton } from '@/styles/CustomButton';
import { gray4, gray5, primaryColor } from '@/styles/Global';
import ProductList from '@/styles/ProductList';

function MyPage() {
  const [render, setRender] = useState(false);
  const [userUid, setUserUid] = useRecoilState(userId);
  const [userInfo, setUserInfo] = useRecoilState(userInformation);
  const [newArr, setNewArr] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showLeavePopup, setShowLeavePopup] = useState(false);
  const [modifiedProfileForm, setModifiedProfileForm] = useState({
    newNickname: userInfo.nickname,
    newProfileImage: null,
  });

  useEffect(() => {
    const query = userWriteRef.where('userId', '==', userUid); // 현재 사용자의 uid와 일치하는 문서 가져오기
    query.onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((doc) => ({ // 각 문서 객체화
        id: doc.id, // 객체의 아이디 값 지정
        ...doc.data() // 기존 데이터들을 객체 형태로 받아옴
      }));
      docs.sort((b, a) => a.date - b.date);
      setNewArr(docs);
      setRender(true);
    });
  }, [userUid]);

  const handleInputChange = (e) => {
    setModifiedProfileForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileInputChange = async (e) => {
    const uploadedImage = e.target.files[0];
    const options = { // 이미지 최적화 옵션
      maxSizeMB: 0.1, // 이미지 최대 용량
      maxWidthOrHeight: 100, // 최대 넓이/높이
      useWebWorker: true,
    };
    if (uploadedImage) {
      const compressedFile = await imageCompression(uploadedImage, options);
      setModifiedProfileForm(prevState => ({
        ...prevState,
        newProfileImage: compressedFile
      }));
    }
  };

  const handleProfileEdit = async (e) => {
    e.preventDefault();

    const oldImageUrl = userInfo.profileImage;
    const oldImageRef = storage.refFromURL(oldImageUrl);
    const newImageRef = storage.ref().child('profileImages/' + (new Date().getTime() + Math.random().toString(36).substr(2, 5)));

    // 신규 프로필사진 업로드
    const newImageUrl = await newImageRef
      .put(modifiedProfileForm.newProfileImage)
      .then((snapshot) => snapshot.ref.getDownloadURL());

    // 과거 프로필사진 storage에서 제거
    if (oldImageUrl === "https://firebasestorage.googleapis.com/v0/b/potato-market-lab18.appspot.com/o/default_profile.png?alt=media&token=8d1123dc-f7dd-4439-a8e3-881b1ce4a401") {
      const updateObj = {
        nickname: modifiedProfileForm.newNickname,
        profileImage: newImageUrl,
      };
      usersRef.doc(userUid).update(updateObj).then(() => {
        setShowEditPopup(false);
        location.reload();
      });
    } else {
      oldImageRef.delete().then(() => {
        const updateObj = {
          nickname: modifiedProfileForm.newNickname,
          profileImage: newImageUrl,
        };
        usersRef.doc(userUid).update(updateObj).then(() => {
          setShowEditPopup(false);
          location.reload();
        });
      })
    }
  };

  const handleLeave = () => {
    auth.currentUser.delete().then(() => {
      console.log("회원 삭제 완료");
      setUserUid(null);
      setUserInfo({
        location: "",
        agree: "",
        email: "",
        nickname: "",
        phoneNumber: "",
        profileImage: "",
      });
      window.location.replace("/");
    }).catch(function (error) {
      console.log(error.message);
    });
  }

  return (
    <>
      {userUid == null ? <LoginState state="login" /> :
        <Main className="wrapper">
          <ContainerGlobalStyle />
          <h2 className="articleTitle">마이페이지</h2>
          <MyProfile>
            <div className="basicInfo">
              <img alt="내 프로필 사진" className="profileImage" src={userInfo.profileImage} />
              <span className="intro">
                <b aria-label="내 주소" className="location">
                  "{userInfo.location.sido} {userInfo.location.sigungu} {userInfo.location.bname}"
                </b>
                에서 🥔를 캐는<br />
                나는
                <b aria-label="내 닉네임" className="nickname">{userInfo.nickname}</b>
              </span>
              <Temperature>
                <img alt="매너온도 아이콘" className="face" src={icon_temp4} />
                <div className="right-box">
                  <span className="text">36.5 ℃</span>
                  <div className="gauge">
                    <span className="gauge_bar" style={{ width: 36 + '%' }}></span>
                  </div>
                </div>
              </Temperature>
              <div className="button-wrapper">
                <CustomButton type="submit" onClick={() => { setShowEditPopup(true); }}>회원정보 변경</CustomButton>
                <CustomButton type="submit" onClick={() => { setShowLeavePopup(true); }}>회원탈퇴</CustomButton>
              </div>
            </div>
          </MyProfile>
          <h2 className="articleTitle">나의 매물</h2>
          <ProductList >
            {render
              ? newArr.map(({ content, title, price, side, imgsrc, id, check, heart }, index) => (
                <Product key={index} check={check} content={content} heart={heart} id={id} imgsrc={imgsrc} price={price} side={side} title={title} />
              ))
              : <LoadingSpinner className="loading" />
            }
          </ProductList>
          {showEditPopup &&
            <ProfileEdit>
              <div className="pop">
                <form>
                  <fieldset>
                    <h3>회원정보 수정</h3>
                    <ul className="form-list">
                      <li className="form-item">
                        <label htmlFor="newNickname">닉네임</label>
                        <input
                          id="newNickname"
                          name="newNickname"
                          placeholder="닉네임을 입력해주세요"
                          type="text"
                          value={modifiedProfileForm.newNickname}
                          onChange={handleInputChange}
                        />
                      </li>
                      <li className="form-item">
                        <label htmlFor="newProfileImage">프로필 사진</label>
                        <div className="profile-image-wrapper">
                          <img
                            alt="프로필 이미지사진 미리보기"
                            className="profile-image-preview"
                            src={
                              modifiedProfileForm.newProfileImage
                                ? URL.createObjectURL(modifiedProfileForm.newProfileImage)
                                : userInfo.profileImage
                            }
                          />
                          <input
                            accept=".png, .jpg, .jpeg, .svg"
                            id="newProfileImage"
                            type="file"
                            onChange={handleFileInputChange}
                          />
                        </div>
                      </li>
                    </ul>
                  </fieldset>
                </form>
                <div className="button-wrapper">
                  <button type="button" onClick={handleProfileEdit}>수정</button>
                  <button type="button" onClick={() => { setShowEditPopup(false); }}>취소</button>
                </div>
              </div>
            </ProfileEdit>
          }
          {showLeavePopup &&
            <ProfileDelete>
              <div className="pop">
                <p>정말로 회원 탈퇴하시겠습니까?</p>
                <div className="button-wrapper">
                  <button type="button" onClick={handleLeave}>탈퇴</button>
                  <button type="button" onClick={() => { setShowLeavePopup(false); }}>취소</button>
                </div>
              </div>
            </ProfileDelete>
          }
        </Main>
      }
    </>
  )
};

const Main = styled.main`
  padding-bottom: 40px;
  h2 {
    line-height: 36px;
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 45px;
  }
`;

const MyProfile = styled.section`
  .basicInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 640px;
    margin: 0 auto 100px;
    padding: 30px 10px;
    box-sizing: border-box;
    border-radius: 10px;
    box-shadow: 0 3px 7px 3px rgb(0 0 0 / 7%);
    background: url(${profileBg}) center center;
    .profileImage {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin-bottom: 20px;
      border-radius: 50%;
      border: 1px solid ${gray5};
    }
    .intro {
      margin-bottom: 6px;
      line-height: 30px;
      font-size: 14px;
      text-align: center;
    }
    .location {
      padding: 0px 4px;
      color: ${primaryColor};
      font-size: 18px;
      line-height: 24px;
      margin: 0 3px;
    }
    .nickname {
      padding: 0 4px;
      font-size: 24px;
      font-weight: 700;
      line-height: 30px;
    }
    .uid {
      font-size: 12px;
      color: ${gray5};
      vertical-align: top;
    }
    .button-wrapper {
      display: flex;
      gap: 8px;
    }
    @media screen and (max-width: 767px) {
      width: calc(100% - 60px);
    }
  }
`;

const Temperature = styled.div`
  display: flex;
  width: 360px;
  padding: 20px;
  box-sizing: border-box;
  .face {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .right-box {
    flex: 1;
  }
  .text {
    color: rgb(49,158,69);
    font-weight: 700;
    font-size: 16px;
  }
  .gauge {
    position: relative;
    width: 100%;
    height: 8px;
    margin: 4px 0;
    border-radius: 2.5px;
    background-color: rgb(233,236,239);
    &_bar {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      border-radius: 2.5px;
      background-color: rgb(49,158,69);
    }
  }
  @media screen and (max-width: 767px) {
    max-width: 360px;
    width: 100%;
  }
`;

const ProfileEdit = styled(PopWrapper)`
  .pop {
    display: flex;
    flex-direction: column;
    width: calc(100% - 100px);
    min-width: 300px;
    max-width: 500px;
    box-sizing: border-box;
    form {
      padding: 20px 40px 10px;
    }
  }
  h3 {
    font-size: 22px;
    font-weight: 700;
    line-height: 30px;
    text-align: center;
    margin: 10px 0 20px;
  }
  .form-item {
    display: flex;
    margin-bottom: 12px;
  }
  label {
    display: inline-block;
    flex-shrink: 0;
    width: 100px;
    font-weight: 700;
    line-height: 44px;
    cursor: pointer;
  }
  input[type="text"],
  input[type="file"]::file-selector-button {
    width: 100%;
    height: 44px;
    padding: 9px 20px;
    background-color: white;
    border: 1px solid ${gray4};
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[type="file"] {
    width: 100%;
    &::file-selector-button {
      color: ${primaryColor};
      font-weight: 600;
      cursor: pointer;
    }
  }
  .profile-image-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .profile-image-preview {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid ${gray5};
  }
  .button-wrapper {
    display: flex;
  }
`;

const ProfileDelete = styled(PopWrapper)`
.pop {
    display: flex;
    flex-direction: column;
    width: calc(100% - 100px);
    min-width: 300px;
    max-width: 500px;
    box-sizing: border-box;
    p {
      color: #FC6767;
      font-size: 16px;
    }
  }
.button-wrapper {
    display: flex;
  }
`;

export default MyPage;