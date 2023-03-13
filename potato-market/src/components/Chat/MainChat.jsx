import classes from '@/styles/mainChatStyle.module.css'
import ChatInfo from '@/components/Chat/ChatInfo';

export default function MainChat() {
  return (
    <article className={classes.main}>
        <ChatInfo/>

     <section >
      
      <span>000님은 당근페이 사용자예요. 채팅방에서 바로 송금할 수 있어요.</span>

      </section>
      <div>시간</div> 
      <section>
        <img src="" alt="상대방 프로필 사진" />
        <div>
          <span>
            채팅내용
          </span>
          <div>시간</div>
        </div>
        <div>시간</div> 
        <div>
          <div>
          <span>시간</span>
          <span>읽음</span>
          </div>
          <span>
            채팅내용
          </span>
        </div>

      </section>
      <section>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      <div>
        <button type='button'> <img src="" alt="이미지" /></button>
        <button type='button'> <img src="" alt="이미지" /></button>
        <button type='button'> <img src="" alt="이미지" /></button>
        <button type='button'>전송</button>
      </div>
      </section>
    </article>
  );
}

