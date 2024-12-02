"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./index.module.css";

const uri = process.env.NEXT_PUBLIC_API;

const ChatHeader = (props) => {
  const { roomDetails } = props;
  const { roomName, imgUrl } = roomDetails;
  return (
    <div className={styles.chatHeader}>
      {imgUrl !== null ? (
        <img src={imgUrl} alt="group profile" />
      ) : (
        <div className={styles.circle}>
          <p>{roomName[0]}</p>
        </div>
      )}
      <p>{roomName}</p>
    </div>
  );
};

const MessageBox = (props) => {
  const { messageList, profile } = props;
  const scrollRef = useRef(null);
  const refPoint = useRef(null);
  useEffect(() => {
    if (scrollRef.current !== null) {
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messageList]);
  if (messageList === null) {
    return (
      <div className={styles.messageBox}>
        <p>Loading</p>
      </div>
    );
  }
  return (
    <div className={styles.messageBox} ref={scrollRef}>
      <ul className={styles.msg} ref={refPoint}>
        {messageList !== null ? (
          messageList.map((item) => (
            <li
              key={item.id}
              className={
                item.sentBy.userId === profile.userId
                  ? styles.self
                  : styles.others
              }
            >
              <p className={styles.username}>{item.sentBy.userName}</p>
              <p>{item.msg}</p>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
};

const InputBox = (props) => {
  const [msg, setMsg] = useState("");
  const { roomId, setMessageList, profile, handleSend } = props;

  return (
    <div className={styles.inputBox}>
      <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button
        onClick={() => handleSend(msg, setMsg)}
        disabled={msg.length > 0 ? false : true}
      >
        Send
      </button>
    </div>
  );
};

const Success = (props) => {
  const { activeRoom, profile, messageList, setMessageList, handleSend, view } =
    props;
  const chatBoxRef = useRef(null);
  const handleResize = () => {
    if (chatBoxRef.current !== null) {
      if (window.innerWidth <= 600 && view !== "chatbox") {
        chatBoxRef.current.classList.add(`${styles.hide}`);
      } else {
        chatBoxRef.current.classList.remove(`${styles.hide}`);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, [view]);
  return (
    <div
      className={
        window.innerWidth <= 600 && view !== "chatbox"
          ? `${styles.chatBox} ${styles.hide}`
          : styles.chatBox
      }
      ref={chatBoxRef}
    >
      <ChatHeader roomDetails={activeRoom} />
      <MessageBox
        messageList={messageList}
        profile={profile}
        activeRoom={activeRoom}
        setMessageList={setMessageList}
      />
      <InputBox
        setMessageList={setMessageList}
        roomId={activeRoom.roomId}
        profile={profile}
        handleSend={handleSend}
      />
    </div>
  );
};

const Default = (props) => {
  const { view } = props;
  const defaultRef = useRef(null);
  const handleResize = () => {
    if (defaultRef.current !== null) {
      if (window.innerWidth <= 600 && view !== "chatbox") {
        defaultRef.current.classList.add(`${styles.hide}`);
      } else {
        defaultRef.current.classList.remove(`${styles.hide}`);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, [view]);
  // useEffect(() => {
  //   if (defaultRef.current !== null) {
  //     if (window.innerWidth < 600) {
  //       defaultRef.current.classList.add(`${styles.hide}`);
  //     } else {
  //       defaultRef.current.classList.remove(`${styles.hide}`);
  //     }
  //   }
  // }, [window.innerWidth]);
  return (
    <div
      className={
        window.innerWidth <= 600 && view !== "chatbox"
          ? `${styles.default} ${styles.hide}`
          : styles.default
      }
      ref={defaultRef}
    >
      <p>your chats apper here</p>
    </div>
  );
};

const ChatBox = (props) => {
  const { activeRoom, profile, messageList, setMessageList, handleSend, view } =
    props;
  return activeRoom === null ? (
    <Default view={view} />
  ) : (
    <Success
      activeRoom={activeRoom}
      profile={profile}
      messageList={messageList}
      setMessageList={setMessageList}
      handleSend={handleSend}
      view={view}
    />
  );
};

export default ChatBox;
