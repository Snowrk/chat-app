"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { ChevronLeft } from "lucide-react";

const ChatHeader = (props) => {
  const { roomDetails, setActiveRoomId } = props;
  const { roomName } = roomDetails;
  return (
    <div className="flex items-center md:border-b-2">
      <button
        className="bg-transparent p-0 m-0 border-none pl-3"
        onClick={() => setActiveRoomId(null)}
      >
        <ChevronLeft strokeWidth={3} size={25} color="#075985" />
      </button>
      <div className="flex items-center gap-2 p-4">
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarFallback className="rounded-lg font-display bg-sky-900">{`${
            roomName[0]
          }${roomName[roomName.length - 1]}`}</AvatarFallback>
        </Avatar>
        <p>{roomName}</p>
      </div>
    </div>
  );
};

// const MsgItem = ({ item, profile, keys }) => {
//   const [loading, setLoading] = useState(true);
//   const [decrypted, setDecrypted] = useState(null);
//   useEffect(() => {
//     async function setVal() {
//       const newVal = await decryptMessage(item.msg, keys.privateKey);
//       setDecrypted(newVal);
//       setLoading(false);
//     }
//     setVal();
//   }, []);
//   if (loading) {
//     return;
//   }
//   return (
//     <li
//       className={
//         item.sentBy.userId === profile.userId ? styles.self : styles.others
//       }
//     >
//       <p className={styles.username}>{item.sentBy.userName}</p>
//       <p>{decrypted}</p>
//     </li>
//   );
// };

const MessageBox = (props) => {
  const { messageList, profile, activeRoomId, decryptKey } = props;
  const scrollRef = useRef(null);
  const refPoint = useRef(null);
  // const [list, setList] = useState(null);
  console.log(messageList);
  // console.log("list", list);
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
      <div className="flex items-center flex-grow">
        <p>Loading</p>
      </div>
    );
  }
  return (
    <div
      className="flex flex-col flex-grow p-4 bg-black border-t-2 md:border-none border-slate-800 rounded-tl-2xl rounded-tr-2xl md:rounded-none h-40 overflow-auto"
      ref={scrollRef}
    >
      <ul className="flex-grow list-none p-0 m-0 flex flex-col gap-[0.8rem] ">
        {messageList !== null ? (
          messageList.map((item) => (
            <li
              key={item.id}
              className={
                item.sentBy.userId === profile.userId
                  ? "self-start max-w-64 break-words rounded-tl-0 rounded-tr-[0.3rem] rounded-br-[0.3rem] rounded-bl-[0.3rem] pt-[0.3rem] pb-[0.3rem] pl-[0.8rem] pr-[0.8rem] bg-emerald-950"
                  : "self-end max-w-64 break-words rounded-tl-0 rounded-tr-[0.3rem] rounded-br-[0.3rem] rounded-bl-[0.3rem] pt-[0.3rem] pb-[0.3rem] pl-[0.8rem] pr-[0.8rem] bg-sky-950"
              }
            >
              <p className="text-orange-400 text-sm mb-1 font-bold">
                {item.sentBy.userName}
              </p>
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
  const { handleSend } = props;

  return (
    <div className="flex items-center gap-2 bg-black md:bg-zinc-900 md:border-t-2 p-4">
      <Input
        className="border-gray-500"
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type a message"
      />
      <Button
        onClick={() => handleSend(msg, setMsg)}
        disabled={msg.length > 0 ? false : true}
      >
        <Send />
      </Button>
    </div>
  );
};

const Success = (props) => {
  const {
    activeRoom,
    profile,
    messageList,
    setMessageList,
    handleSend,
    setActiveRoomId,
    activeRoomId,
    decryptKey,
  } = props;
  const chatBoxRef = useRef(null);
  return (
    <div
      className="flex flex-col flex-grow w-full md:border-r-2 max-h-screen"
      ref={chatBoxRef}
    >
      <ChatHeader roomDetails={activeRoom} setActiveRoomId={setActiveRoomId} />
      <MessageBox
        messageList={messageList}
        profile={profile}
        activeRoom={activeRoom}
        setMessageList={setMessageList}
        activeRoomId={activeRoomId}
        decryptKey={decryptKey}
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
  const defaultRef = useRef(null);
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
      className="flex flex-col justify-center items-center w-full border-r-2"
      ref={defaultRef}
    >
      <p>your chats apper here</p>
    </div>
  );
};

const ChatBox = (props) => {
  const {
    activeRoom,
    profile,
    messageList,
    setMessageList,
    handleSend,
    view,
    setActiveRoomId,
    activeRoomId,
    decryptKey,
  } = props;
  console.log("chatbox");
  return activeRoomId === null ? (
    <Default view={view} />
  ) : (
    <Success
      activeRoom={activeRoom}
      profile={profile}
      messageList={messageList}
      setMessageList={setMessageList}
      handleSend={handleSend}
      view={view}
      setActiveRoomId={setActiveRoomId}
      activeRoomId={activeRoomId}
      decryptKey={decryptKey}
    />
  );
};

export default ChatBox;
