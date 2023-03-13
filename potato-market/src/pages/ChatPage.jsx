
import classes from '@/styles/chatLayout.module.css'

import ChatList from '../components/Chat/ChatList';

import MainChat from '../components/Chat/MainChat';

export default function ChatPage() {
  return (
    <>
    <main className={classes.main}>

        <ChatList/>
        <MainChat/>

    </main>
    </>

  );
}

