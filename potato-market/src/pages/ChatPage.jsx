/* eslint-disable import/no-unresolved */
import ChatList from "@/components/Chat/ChatList";
import MainChat from "@/components/Chat/MainChat";
import classes from "@/styles/chatLayout.module.css";

export default function ChatPage() {
  return (
    <>
      <main className={classes.main}>
        <ChatList />
        <MainChat />
      </main>
    </>
  );
};
