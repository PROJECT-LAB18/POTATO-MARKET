import styled from 'styled-components';
import ChatInfo from '../components/Chat/ChatInfo';
import ChatList from '../components/Chat/ChatList';
import MainChat from '../components/Chat/MainChat';
const Rayout = styled.div`
  display: flex;
`
export default function ChatPage() {
  return (
    <>
    <Rayout>
        <ChatList/>
        <ChatInfo/>
        <MainChat/>
    </Rayout>

    </>
  );
}

