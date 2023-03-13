/* eslint-disable import/no-unresolved */
import styled from 'styled-components';

import { gray1, gray8, gray3, gray7 } from '@/styles/Global'

import defaultProfile from '@/assets/default_profile.png'

import question from '@/assets/question.svg'

import checkSVG from '@/assets/check.svg'

import productImg from '@/assets/제품사진.png'

const Layout = styled.article`

    display: flex;
    flex-direction: column;
    width: 312px;
    min-width: 312px;
    justify-content: space-between;
    font-family: "Roboto";
    ul,li,ol { list-style: none}
  ;
`
const Nickname= styled.section`
display: flex;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  border-bottom: 1px solid ${gray1};
  font-weight: bold;

`
const NotReadMessage = styled.section`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: .75rem;
  color: ${gray7};
  padding: 0 6px;
  height: 44px;
  min-height: 44px;
  border-bottom: 1px solid ${gray1};
    button {
      border: none;
      background: transparent;
      font-size:.75rem;
      justify-items: center;
    }

    img {
      width:18px; 
      height:18px;
    }
  
`
const PreviewList = styled.section`
    li {
    display: flex;
    border-bottom:1px solid ${gray3};
    flex-direction:row;
    justify-content: space-between;
    flex: 1 0 0%clg;
    padding: 16px;
    align-items: center;
  }
  div{
    display: flex;
    &:first-child{
      color: ${gray8};
      display: flex;
      align-items: center;
      .chat-preview{
        flex-direction: column;
        font-size: 12px;
        div:first-child{
          margin-bottom: 4px;
        }
        .other-name{
          color: #212122;
          font-weight: bold;
          margin-right: 6px;
        }
        
      }
      .last-talk{
        /* overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap; */
      }
    }
    .product-preview{
      margin-left:10px;
    }
  }
  img.other-profile{
    border-radius:50%;
    margin-right: 10px;
    border: 1px solid ${gray3};
  }

  `
const Question= styled.div`
    border-top: 1px solid ${gray3};
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 56px;
    min-height: 56px;
    padding-left: 10px;
    a {
    text-decoration: none; 
    font-size: 14px;
    color: ${gray7};
    margin-right: 4px;
    };

  `
const SVGQuestion=styled.img.attrs({ src:`${question}`})`
align-items: center;
width : 15px;
margin-bottom: 3px;
`
export default function ChatList() {
  return (
    <Layout>
      <main>
              <Nickname>
                   닉네임
              </Nickname>
          <NotReadMessage>
            안읽은 메세지만 보기 
            <button type='button'>
              <img src={checkSVG} alt="안읽은 메세지만 보기" />
            </button>
          </NotReadMessage>
          <PreviewList>
            <ul>
              <li className='chat-list'> 
                <div>
                  <img className='other-profile' src={defaultProfile} width='40px' alt="프로필" />
                  <div className='chat-preview'>
                    <div>
                      <span className='other-name'>상대방</span>
                      <span className='other-location'>지역</span>
                      <span>﹒</span>
                      <span className='real-daytime'>날짜</span>
                    </div>
                    <div className='last-talk'>
                        <span>마지막 대화</span>
                    </div>
                  </div>
                </div>
            <div className='product-preview' >
              <img src={productImg} width='40px' alt="제품사진" />
            </div>
            </li>
          </ul>
        </PreviewList>
      </main>


        <Question>
          <a href='#'>
          자주묻는 질문
          </a>
          <SVGQuestion/>
        </Question>
    </Layout>
  );
}

