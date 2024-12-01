"use client";

import { useState } from "react";
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
  if (messageList === null) {
    return (
      <div className={styles.messageBox}>
        <p>Loading</p>
      </div>
    );
  }
  return (
    <div className={styles.messageBox}>
      <ul className={styles.msg}>
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
  const { activeRoom, profile, messageList, setMessageList, handleSend } =
    props;
  return (
    <div className={styles.chatBox}>
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

const Default = () => {
  return (
    <div className={styles.default}>
      <p>your chats apper here</p>
    </div>
  );
};

const ChatBox = (props) => {
  const { activeRoom, profile, messageList, setMessageList, handleSend } =
    props;
  return activeRoom === null ? (
    <Default />
  ) : (
    <Success
      activeRoom={activeRoom}
      profile={profile}
      messageList={messageList}
      setMessageList={setMessageList}
      handleSend={handleSend}
    />
  );
};

export default ChatBox;
