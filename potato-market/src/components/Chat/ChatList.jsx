import styled from 'styled-components';
import defaultProfile from '../../assets/default_profile.png'
const Layout = styled.article`
    display: flex;
    width: 312px;
    min-width: 312px;
    flex-direction: column;
    justify-content: space-between;
    ul,li,ol { list-style: none}
    font-family: "Roboto";
  ;
`
const Nickname= styled.section`
  align-items: center;
  padding: 30px 20px;
  border-bottom: 1px solid;
  font-weight: bold;

`
const NotReadMessage = styled.section`
display: flex;
 justify-content: end;
 align-items: center;
 font-size: .75rem;
 height: 44px;
 min-height: 44px;
 padding:6px;
 border-bottom: 1px solid;
 button {
  border: none;
  background: transparent;
  font-size:.75rem}
`
const Question= styled.div`
  border: 1px solid ;
  a {
  text-decoration: none; 
  color: initial;
  };
`
const PreviewList = styled.section`
li {
    display: flex;
    flex-direction:row;
    padding: 16px;
    align-items: center;
    }
    div{
      &:first-child{
        display: flex;
        align-items: center;     
      }
      &:nth-child(2){
        background-color: blue;
        text-align: end; 
        font-size: 14px;
      }
    }
    img{
      
      border-radius:50%;
      margin-right: 10px;
   }


`
export default function ChatList() {
  return (
    <Layout>
              <Nickname>
                   닉네임
              </Nickname>
          <NotReadMessage>
            안읽은 메세지만 보기 
            <button type='button'>체크</button>
          </NotReadMessage>
          <PreviewList>
            <ul>
              <li>
                <div>
                  <img src={defaultProfile} width='40px' alt="프로필" />
                </div>
                <div>
                  <span>상대방</span>
                  <span>지역</span>
                  <span>﹒</span>
                  <span>날짜</span>
              </div>
<div>

                  <span>마지막 대화</span>
</div>
            <div>제품사진</div>
            </li>
          </ul>
        </PreviewList>
        <Question>
          <a href='#'>
          자주묻는 질문
          <img src="" alt="?" />
          </a>
        </Question>
    </Layout>
  );
}

