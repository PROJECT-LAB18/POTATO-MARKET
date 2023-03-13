import styled from 'styled-components';

const Bgcolor = styled.div`
  color: red;
`
export default function ChatInfo() {
  return (
    <article>

    <section className='mainChat-header'>
      <img src="" alt="상대방 프로필" />
      <button type='button'>더보기</button>
      <div>
        <div>알림음 끄기</div>
        <div>대화상대 차단하기</div>
        <div>채팅방 나가기</div>
      </div>
    </section>
    <section>
      <div>제품사진</div>
      <Bgcolor>
      <div>
        <span>제품명</span>
        <span>제품가격</span>
      </div>
      </Bgcolor>
      <div>
       판매중
      </div>
    </section>


  </article>
  );
}

