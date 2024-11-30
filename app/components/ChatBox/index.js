"use client";

import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { io } from "socket.io-client";
import styles from "./index.module.css";

const socket = io("http://localhost:3001/");
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
  const { messageList, profile, activeRoom, setMessageList } = props;
  useEffect(() => {
    socket.on("receive-message", (msgObj, roomId) => {
      console.log(roomId);
      if (roomId === activeRoom.roomId) {
        setMessageList((prev) =>
          prev.findIndex((e) => e.id === msgObj.id) !== -1
            ? [...prev]
            : [...prev, msgObj]
        );
      }
    });
  }, []);
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
  const { roomId, setMessageList, profile } = props;
  const handleSend = () => {
    const msgObj = { id: v4(), msg, sentBy: profile };
    socket.emit("send-message", msgObj, roomId);
    setMessageList((prev) => [...prev, msgObj]);
  };
  return (
    <div className={styles.inputBox}>
      <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={handleSend} disabled={msg.length > 0 ? false : true}>
        Send
      </button>
    </div>
  );
};

const Success = (props) => {
  const { activeRoom, profile, messageList, setMessageList } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getMessages = async () => {
      const url = `${uri}/rooms/${activeRoom.roomId}/messages`;
      const request = await fetch(url);
      const response = await request.json();
      if (request.ok) {
        setMessageList(response);
        setLoading(false);
      }
    };
    const updateMessageList = async () => {
      const url = `${uri}/rooms/${activeRoom.roomId}/updateMessageList`;
      const options = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          messageList,
        }),
      };
      const request = await fetch(url, options);
      const response = await request.json();
      console.log(response);
    };
    getMessages();
  }, []);

  return (
    <div className={styles.chatBox}>
      <ChatHeader roomDetails={activeRoom} />
      <MessageBox
        messageList={messageList}
        profile={profile}
        loading={loading}
        activeRoom={activeRoom}
        setMessageList={setMessageList}
      />
      <InputBox
        setMessageList={setMessageList}
        roomId={activeRoom.roomId}
        profile={profile}
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
  const { activeRoom, profile, messageList, setMessageList } = props;
  return activeRoom === null ? (
    <Default />
  ) : (
    <Success
      activeRoom={activeRoom}
      profile={profile}
      messageList={messageList}
      setMessageList={setMessageList}
    />
  );
};

export default ChatBox;
