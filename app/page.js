"use client";

import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import OnlineBar from "./components/OnlineBar";
import ChatBox from "./components/ChatBox";
import styles from "./page.module.css";

const socket = io("https://chat-app-server-red-seven.vercel.app/", {
  autoConnect: false,
});
const uri = process.env.NEXT_PUBLIC_API;

const compStatus = {
  loading: "loading",
  success: "success",
  error: "error",
};
console.log(socket.id);

const Success = (props) => {
  const {
    profile,
    onlineUserList,
    roomsList,
    setOnlineUserList,
    activeRoomId,
    setActiveRoomId,
    setMessageList,
    messageList,
    setRoomsList,
  } = props;
  const handleLogout = () => {
    socket.emit("userDisconnect", profile);
    Cookies.remove("jwtToken");
    router.replace("/login");
  };
  const handleSend = (msg, setMsg) => {
    const msgObj = { id: v4(), msg, sentBy: profile };
    // console.log(socket.id);
    socket.emit("send-message", msgObj, activeRoomId);
    setMessageList((prev) => [...prev, msgObj]);
    setMsg("");
  };

  useEffect(() => {
    const getMessages = async () => {
      setMessageList(null);
      const url = `${uri}/rooms/${activeRoomId}/messages`;
      const request = await fetch(url);
      const response = await request.json();
      if (request.ok) {
        setMessageList(response);
      }
    };
    // const updateMessageList = async () => {
    //   const url = `${uri}/rooms/${activeRoom.roomId}/updateMessageList`;
    //   const options = {
    //     method: "PUT",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       messageList,
    //     }),
    //   };
    //   const request = await fetch(url, options);
    //   const response = await request.json();
    //   console.log(response);
    // };
    if (activeRoomId !== null) {
      getMessages();
    }
  }, [activeRoomId]);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    const updateOnline = async () => {
      const url = `${uri}/users/updateOnline/${profile.userId}`;
      const options = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ online: true }),
      };
      const request = await fetch(url, options);
      const response = await request.json();
      console.log(response);
    };

    const updateOffline = async () => {
      const url = `${uri}/users/updateOnline/${profile.userId}`;
      const options = {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ online: false }),
      };
      const request = await fetch(url, options);
      const response = await request.json();
      console.log(response);
    };
    socket.connect();
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    socket.emit("userConnect", profile);
    socket.emit("connectRooms", roomsList);
    setOnlineUserList((prev) =>
      prev.findIndex((e) => e.userId === profile.userId) === -1
        ? [...prev, profile]
        : [...prev]
    );
    // socket.emit("userConnect", profile);
    // setOnlineUserList((prev) =>
    //   prev.findIndex((e) => e.userId === profile.userId) === -1
    //     ? [...prev, profile]
    //     : [...prev]
    // );
    // socket.on("recive-message", (msg, roomId) => {
    //   console.log(msg);
    // });
    // socket.on("disconnect", () => {
    //   socket.emit("userDisconnect", profile);
    // });
    socket.on("userDisconnect", (profile) => {
      setOnlineUserList((prev) => [
        ...prev.filter((item) => item.userId !== profile.userId),
      ]);
    });
    socket.on("userConnect", (profile) => {
      setOnlineUserList((prev) =>
        prev.findIndex((e) => e.userId === profile.userId) === -1
          ? [...prev, profile]
          : [...prev]
      );
    });
    socket.on("receive-message", (msgObj, roomId) => {
      console.log(roomId);
      if (roomId === activeRoomId) {
        setMessageList((prev) =>
          prev.findIndex((e) => e.id === msgObj.id) !== -1
            ? [...prev]
            : [...prev, msgObj]
        );
      }
    });
    socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    window.onbeforeunload = () => {
      socket.emit("userDisconnect", profile);
      // Cookies.remove("jwtToken");
    };
  }, []);
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <Header profile={profile} handleLogout={handleLogout} />
        <div className={styles.contentCon}>
          <SideBar
            roomsList={roomsList}
            activeRoomId={activeRoomId}
            setActiveRoomId={setActiveRoomId}
            setMessageList={setMessageList}
            profile={profile}
          />
          <ChatBox
            activeRoom={
              activeRoomId !== null
                ? roomsList.filter((e) => e.roomId === activeRoomId)[0]
                : null
            }
            profile={profile}
            messageList={messageList}
            setMessageList={setMessageList}
            handleSend={handleSend}
          />
          <OnlineBar
            onlineUserList={onlineUserList}
            setRoomsList={setRoomsList}
            roomsList={roomsList}
            profile={profile}
            setActiveRoomId={setActiveRoomId}
          />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // const [userList, setUserList] = useState(null);
  const [onlineUserList, setOnlineUserList] = useState(null);
  const [profile, setProfile] = useState(null);
  const [roomsList, setRoomsList] = useState(null);
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [messageList, setMessageList] = useState(null);
  const [compState, setCompState] = useState(compStatus.loading);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    // const getUsers = async () => {
    //   const url = `${uri}/users`;
    //   const request = await fetch(url);
    //   const response = await request.json();
    //   if (request.ok) {
    //     setUserList(response);
    //   } else {
    //     setCompState(compStatus.error);
    //   }
    // };
    const getOnlineUsers = async () => {
      const url = `${uri}/onlineUsers`;
      const request = await fetch(url);
      const response = await request.json();
      if (request.ok) {
        setOnlineUserList(response);
      } else {
        setCompState(compStatus.error);
      }
    };
    const getRooms = async () => {
      const url = `${uri}/rooms`;
      const options = {
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      };
      const request = await fetch(url, options);
      const response = await request.json();
      if (request.ok) {
        setRoomsList(response);
        console.log(response);
      } else {
        setCompState(compStatus.error);
      }
    };
    const getProfile = async () => {
      const url = `${uri}/profile`;
      const options = {
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      };
      const request = await fetch(url, options);
      const response = await request.json();
      if (request.ok) {
        setProfile(response);
      } else {
        setCompState(compStatus.error);
      }
    };
    const sendRequests = () => {
      setCompState(compStatus.loading);
      // getUsers();
      getProfile();
      getRooms();
      getOnlineUsers();
    };

    sendRequests();
    setCompState((prev) =>
      prev !== compStatus.error ? compStatus.success : compStatus.error
    );
  }, []);

  // useEffect(() => {
  //   const updateOnline = async () => {
  //     const url = `${uri}/users/updateOnline/${profile.userId}`;
  //     const options = {
  //       method: "PUT",
  //       headers: {
  //         "content-type": "application/json",
  //         authorization: `Bearer ${jwtToken}`,
  //       },
  //       body: JSON.stringify({ online: true }),
  //     };
  //     const request = await fetch(url, options);
  //     const response = await request.json();
  //     console.log(response);
  //   };
  //   const updateOffline = async () => {
  //     const url = `${uri}/users/updateOnline/${profile.userId}`;
  //     const options = {
  //       method: "PUT",
  //       headers: {
  //         "content-type": "application/json",
  //         authorization: `Bearer ${jwtToken}`,
  //       },
  //       body: JSON.stringify({ online: false }),
  //     };
  //     const request = await fetch(url, options);
  //     const response = await request.json();
  //     console.log(response);
  //   };
  //   if (compState === compState.success) {
  //     socket.on("connect", () => {
  //       socket.emit("userConnect", profile);
  //       socket.emit("connectRooms", roomsList);
  //       updateOnline();
  //       setOnlineUserList((prev) => [...prev, profile]);
  //     });
  //     socket.on("recive-message", (msg, roomId) => {
  //       console.log(msg);
  //     });
  //     socket.on("userDisconnect", (profile) => {
  //       setOnlineUserList((prev) =>
  //         prev.filter((item) => item.userId !== profile.userId)
  //       );
  //     });
  //     socket.on("userConnect", (profile) => {
  //       setOnlineUserList((prev) => [...prev, profile]);
  //     });
  //   }

  //   return () => {
  //     if (profile !== null) {
  //       socket.emit("userDisconnect", profile);
  //       updateOffline();
  //     }
  //   };
  // }, [compState]);

  // const [messages, setMessages] = useState([]);
  // const [msg, setMsg] = useState("");

  // const sendMsg = (roomId) => {
  //   setMessages((prev) => [...prev, { id: v4(), msg }]);
  //   socket.emit("send-message", msg, roomId);
  // };
  if (
    compState === compStatus.success &&
    roomsList !== null &&
    profile !== null &&
    onlineUserList !== null
  ) {
    // console.log("success");
    // console.log(roomsList);
    // return (
    //   <div className={styles.home}>
    //     <div className={styles.container}>
    //       <Header />
    //       <div className={styles.contentCon}>
    //         <SideBar
    //           roomsList={roomsList}
    //           activeRoomId={activeRoomId}
    //           setActiveRoomId={setActiveRoomId}
    //         />
    //         <ChatBox
    //           activeRoom={roomsList.filter((e) => e.roomId === activeRoomId)[0]}
    //         />
    //         <OnlineBar onlineUserList={onlineUserList} />
    //       </div>
    //     </div>
    //   </div>
    // );
    return (
      <Success
        activeRoomId={activeRoomId}
        onlineUserList={onlineUserList}
        setOnlineUserList={setOnlineUserList}
        setActiveRoomId={setActiveRoomId}
        profile={profile}
        roomsList={roomsList}
        messageList={messageList}
        setMessageList={setMessageList}
        setRoomsList={setRoomsList}
      />
    );
  } else if (compState === compStatus.error) {
    console.log("error");
    return (
      <div className={styles.home}>
        <div className={styles.container}>
          <Header />
          <div className={styles.error}>
            <p>Failed to load</p>
          </div>
        </div>
      </div>
    );
  } else {
    console.log("loading");
    return (
      <div className={styles.loadingBody}>
        <div className={styles.ring}>
          Loading
          <span className={styles.span}></span>
        </div>
      </div>
    );
  }
}
