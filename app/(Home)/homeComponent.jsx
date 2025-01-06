"use client";

import { useState, useEffect } from "react";
import { socket } from "@/socket";
import ChatBox from "@/components/chatbox";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Image from "next/image";
import { v4 } from "uuid";
import { decryptMessage, encryptMessage } from "../functions";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { DotButton, useDotButton } from "../../components/cauroselDotButtons";
import "../globals.css";
import MobileChats from "@/components/mobile-chats";
import MobileOnlineUsers from "@/components/mobile-online-users";
import { MobileNavUser } from "@/components/mobile-nav-user";
import { Account } from "@/components/Account";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const uri = process.env.NEXT_PUBLIC_API;

// const activeRoom = {
//   roomId: 1,
//   roomName: "Global",
// };

// const messageList = [
//   {
//     id: 1,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "yo",
//   },
//   {
//     id: 2,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 3,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 4,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 5,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 6,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "yo",
//   },
//   {
//     id: 7,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 8,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 9,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "yo",
//   },
//   {
//     id: 10,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 11,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "yo",
//   },
//   {
//     id: 12,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 13,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 14,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "whatsup",
//   },
//   {
//     id: 15,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 16,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "whatsup",
//   },
//   {
//     id: 17,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 18,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "whatsup",
//   },
//   {
//     id: 19,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 20,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "whatsup",
//   },
//   {
//     id: 21,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "yo",
//   },
//   {
//     id: 22,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 23,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 24,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 25,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 26,
//     sentBy: {
//       userId: 2,
//       userName: "user1",
//     },
//     msg: "yo",
//   },
//   {
//     id: 27,
//     sentBy: {
//       userId: 2,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 28,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 29,
//     sentBy: {
//       userId: 2,
//       userName: "user1",
//     },
//     msg: "yo",
//   },
//   {
//     id: 30,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 31,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "yo",
//   },
//   {
//     id: 32,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 33,
//     sentBy: {
//       userId: 2,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 34,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "whatsup",
//   },
//   {
//     id: 35,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 36,
//     sentBy: {
//       userId: 2,
//       userName: "user1",
//     },
//     msg: "whatsup",
//   },
//   {
//     id: 37,
//     sentBy: {
//       userId: 2,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 38,
//     sentBy: {
//       userId: 2,
//       userName: "user1",
//     },
//     msg: "whatsup",
//   },
//   {
//     id: 39,
//     sentBy: {
//       userId: 1,
//       userName: "user1",
//     },
//     msg: "hello",
//   },
//   {
//     id: 40,
//     sentBy: {
//       userId: 2,
//       userName: "user1",
//     },
//     msg: "whatsup",
//   },
// ];

// const profile = {
//   userId: 1,
//   userName: "user1",
// };

// const chatsList = [
//   {
//     id: 1,
//     name: "Global",
//   },
//   {
//     id: 2,
//     name: "Private1234567890123456789012345678901234567890",
//   },
//   {
//     id: 3,
//     name: "Private2",
//   },
//   {
//     id: 4,
//     name: "Private3",
//   },
//   {
//     id: 5,
//     name: "Private4",
//   },
//   {
//     id: 6,
//     name: "Private5",
//   },
//   {
//     id: 7,
//     name: "Private6",
//   },
//   {
//     id: 8,
//     name: "Private7",
//   },
//   {
//     id: 9,
//     name: "Private8",
//   },
//   {
//     id: 10,
//     name: "Private9",
//   },
// ];

// const onlineList = [
//   {
//     id: 1,
//     name: "User1",
//   },
//   {
//     id: 2,
//     name: "User2",
//   },
//   {
//     id: 3,
//     name: "User3",
//   },
//   {
//     id: 4,
//     name: "User4",
//   },
//   {
//     id: 5,
//     name: "User5",
//   },
//   {
//     id: 6,
//     name: "User6",
//   },
//   {
//     id: 7,
//     name: "User7",
//   },
//   {
//     id: 8,
//     name: "User8",
//   },
//   {
//     id: 9,
//     name: "User9",
//   },
//   {
//     id: 10,
//     name: "User10",
//   },
// ];

const dotInfo = [
  {
    name: "Chats",
  },
  {
    name: "Online Users",
  },
];

// const user = {
//   name: "shadcn",
//   email: "m@example.com",
//   avatar: "/avatars/shadcn.jpg",
// };

const compStatus = {
  loading: "loading",
  failed: "failed",
  success: "success",
};

export default function Home({ secret }) {
  const jwtToken = Cookies.get("jwtToken");
  const router = useRouter();
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [api, setApi] = useState();
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api);
  const [view, setView] = useState("Mobile");
  const [viewAccount, setViewAccount] = useState(false);
  const [messageList, setMessageList] = useState(null);
  const [onlineList, setOnlineList] = useState([]);
  const [profile, setProfile] = useState(null);
  const [chatsList, setChatsList] = useState([]);
  const [loading, setLoading] = useState(compStatus.loading);
  const [enKey, setEnKey] = useState([]);
  const showAccount = () => {
    setActiveRoomId(null);
    setViewAccount(true);
  };
  const closeAccount = () => {
    setViewAccount(false);
  };
  const handleResize = () => {
    if (window.innerWidth <= 900) {
      setView("Mobile");
    } else {
      setView("Desktop");
    }
  };
  const handleSend = async (msg, setMsg) => {
    const encryptMsg = await encryptMessage(msg, enKey[0]);
    const msgObj = {
      id: v4(),
      msg: encryptMsg,
      sentBy: profile,
      type: "encrypted",
    };
    // console.log(socket.id);
    // console.log("msgObj", msgObj);
    socket.emit("send-message", msgObj, activeRoomId);
    setMessageList((prev) => [
      ...prev,
      { id: msgObj.id, msg, sentBy: msgObj.sentBy, type: msgObj.type },
    ]);
    setMsg("");
  };
  const handleLogout = () => {
    socket.emit("userDisconnect", profile);
    Cookies.remove("jwtToken");
    router.replace("/login");
  };
  const createPrivateRoom = async (item) => {
    const url = `${uri}/rooms/private`;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        roomName: `${profile.userName}-${item.userName}`,
        userId: profile.userId,
        friendId: item.userId,
        type: "private",
      }),
    };
    const request = await fetch(url, options);
    const response = await request.json();
    if (request.ok) {
      // console.log(response);
      setChatsList((prev) => [...prev, response]);
      setActiveRoomId(response.roomId);
    }
  };
  const connectPrivateRoom = (item) => {
    if (profile.userId === item.userId) {
      return;
    }
    const idx = chatsList.findIndex(
      (e) =>
        e.roomName ===
        (`${profile.userName}-${item.userName}` ||
          `${item.userName}-${profile.userName}`)
    );
    console.log("idx", idx);
    if (idx === -1) {
      createPrivateRoom(item);
    } else {
      setActiveRoomId(chatsList[idx].roomId);
    }
  };
  useEffect(() => {
    async function getEnKey() {
      const url = `${uri}/${activeRoomId}/keys`;
      const options = {
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      };
      const request = await fetch(url, options);
      const response = await request.json();
      if (request.ok && response.keys) {
        const publicKey = await window.crypto.subtle.importKey(
          "jwk",
          response.keys[1],
          {
            name: "RSA-OAEP",
            hash: "SHA-256",
          },
          true,
          ["encrypt"]
        );
        setEnKey([publicKey, response.keys[0], activeRoomId]);
      } else {
        console.log("Error while fetching encryption key", response);
      }
    }
    if (activeRoomId !== null) {
      getEnKey();
    }
  }, [activeRoomId]);
  useEffect(() => {
    const sendRequest = () => {
      setLoading(compStatus.loading);
      const url1 = `${uri}/onlineUsers`;
      const url2 = `${uri}/rooms`;
      const url3 = `${uri}/profile`;
      const options = {
        headers: {
          authorization: `Bearer ${jwtToken}`,
        },
      };
      const promise1 = fetch(url1, options);
      const promise2 = fetch(url2, options);
      const promise3 = fetch(url3, options);
      Promise.all([promise1, promise2, promise3])
        .then((values) => {
          const [request1, request2, request3] = values;
          Promise.all([request1.json(), request2.json(), request3.json()]).then(
            (responses) => {
              const [response1, response2, response3] = responses;
              setOnlineList(response1);
              setChatsList(response2);
              setProfile(response3);
              setLoading(compStatus.success);
            }
          );
        })
        .catch((e) => {
          setLoading(compStatus.failed);
        });
    };
    sendRequest();
  }, []);

  useEffect(() => {
    async function mapResponse(arr) {
      const newArr = [];
      arr.forEach((item) => {
        if (item.type === "encrypted") {
          const decrypted = decryptMessage(item.msg, enKey[1], secret);
          const { id, sentBy } = item;
          newArr.push({ id, msg: decrypted, sentBy });
        } else {
          newArr.push(item);
        }
      });
      return newArr;
    }
    const getMessages = async () => {
      setMessageList(null);
      const url = `${uri}/rooms/${activeRoomId}/messages`;
      const request = await fetch(url);
      const response = await request.json();
      if (request.ok) {
        const msgs = await mapResponse(response);
        setMessageList(msgs);
      }
    };
    if (enKey.length !== 0) {
      getMessages();
    }
  }, [enKey]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });
    // socket.onAny((event, ...args) => {
    //   console.log(event, args);
    // });
    // socket.onAnyOutgoing((event, ...args) => {
    //   console.log(event, args);
    // });
    if (window.innerWidth <= 900) {
      setView("Mobile");
    } else {
      setView("Desktop");
    }
    window.addEventListener("resize", handleResize, false);
  }, []);

  useEffect(() => {
    if (profile !== null) {
      socket.emit("userConnect", profile);
      socket.emit("connectRooms", chatsList);
      setOnlineList((prev) =>
        prev.findIndex((e) => e.userId === profile.userId) === -1
          ? [...prev, profile]
          : [...prev]
      );
      socket.on("userDisconnect", (profile) => {
        setOnlineList((prev) => [
          ...prev.filter((item) => item.userId !== profile.userId),
        ]);
      });
      socket.on("userConnect", (profile) => {
        setOnlineList((prev) =>
          prev.findIndex((e) => e.userId === profile.userId) === -1
            ? [...prev, profile]
            : [...prev]
        );
      });

      window.onfocus = () => {
        socket.emit("userConnect", profile);
      };
      window.onblur = () => {
        socket.emit("userDisconnect", profile);
      };
      window.onbeforeunload = () => {
        socket.emit("userDisconnect", profile);
        // Cookies.remove("jwtToken");
      };
    }
  }, [profile, chatsList]);

  useEffect(() => {
    const setDecryptedMsg = async (msgObj) => {
      if (enKey[1] !== undefined) {
        if (msgObj.type === "encrypted") {
          const decrypted = await decryptMessage(msgObj.msg, enKey[1], secret);
          const { id, sentBy } = msgObj;
          msgObj = { id, msg: decrypted, sentBy };
        }
        setMessageList((prev) =>
          prev.findIndex((e) => e.id === msgObj.id) !== -1
            ? [...prev]
            : [...prev, msgObj]
        );
      }
    };
    socket.on("receive-message", (msgObj, roomId) => {
      // console.log(roomId);
      // console.log(activeRoomId);
      // console.log(roomId === activeRoomId);
      if (roomId === activeRoomId) {
        // console.log("here");
        setDecryptedMsg(msgObj);
      }
    });
  }, [activeRoomId, enKey]);
  // console.log("Home", {
  //   chatsList,
  //   profile,
  //   onlineList,
  //   loading,
  //   activeRoomId,
  //   view,
  //   viewAccount,
  //   messageList,
  //   enKey,
  // });

  if (
    loading === compStatus.loading ||
    chatsList.length === 0 ||
    onlineList.length === 0 ||
    profile === null
  ) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (view === "") {
    return <div></div>;
  }
  if (view === "Mobile") {
    return (
      <>
        <div className="border-b-2 border-slate-800 rounded-br-2xl rounded-bl-2xl h-[80px] flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Image width={40} height={40} src="/message.png" alt="logo" />
            <p className="font-display text-3xl text-sky-600">ChatApp</p>
          </div>
          <MobileNavUser profile={profile} logout={handleLogout} />
        </div>
        {activeRoomId === null ? (
          <Carousel className="w-full flex flex-col" setApi={setApi}>
            <CarouselContent className="m-0">
              <CarouselItem className="p-0">
                <div>
                  <Card className="h-[calc(100vh-80px-80px)] flex flex-col flex-grow border-none">
                    <CardContent className="flex flex-col flex-grow p-0">
                      <MobileChats
                        chatsList={chatsList}
                        activeRoomId={activeRoomId}
                        setActiveRoomId={setActiveRoomId}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem className="p-0">
                <div>
                  <Card className="h-[calc(100vh-80px-80px)] flex flex-col flex-grow border-none">
                    <CardContent className="flex flex-col flex-grow p-0">
                      <MobileOnlineUsers
                        onlineList={onlineList}
                        connectPrivateRoom={connectPrivateRoom}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>

            <div className="flex items-center h-[80px] justify-evenly border-t-2 border-slate-800 rounded-tl-2xl rounded-tr-2xl">
              {scrollSnaps.map((_, index) => {
                console.log(index);
                return (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={"pt-1 pb-1 pl-4 pr-4 rounded-2xl".concat(
                      index === selectedIndex
                        ? " bg-sky-600 text-slate-200"
                        : " text-slate-400"
                    )}
                  >
                    <p>{dotInfo[index].name}</p>
                  </DotButton>
                );
              })}
            </div>
          </Carousel>
        ) : (
          <ChatBox
            messageList={messageList}
            profile={profile}
            activeRoom={
              activeRoomId !== null
                ? chatsList.filter((e) => e.roomId === activeRoomId)[0]
                : null
            }
            setActiveRoomId={setActiveRoomId}
            handleSend={handleSend}
            decryptKey={enKey}
          />
        )}
      </>
    );
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar
          activeRoomId={activeRoomId}
          setActiveRoomId={setActiveRoomId}
          showAccount={showAccount}
          profile={profile}
          chatsList={chatsList}
          onlineList={onlineList}
          logout={handleLogout}
          setChatsList={setChatsList}
          connectPrivateRoom={connectPrivateRoom}
        />
        {viewAccount ? (
          <Account closeAccount={closeAccount} />
        ) : (
          <ChatBox
            messageList={messageList}
            profile={profile}
            activeRoom={
              activeRoomId !== null
                ? chatsList.filter((e) => e.roomId === activeRoomId)[0]
                : null
            }
            activeRoomId={activeRoomId}
            setActiveRoomId={setActiveRoomId}
            handleSend={handleSend}
            decryptKey={enKey}
          />
        )}
      </SidebarProvider>
    </>
  );
}
