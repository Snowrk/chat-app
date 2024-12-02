import { useEffect, useRef } from "react";
import styles from "./index.module.css";

const uri = process.env.NEXT_PUBLIC_API;

const ChatItcon = (props) => {
  const { item } = props;
  return (
    <div>
      {item.imgUrl !== null ? (
        <img src={item.imgUrl} alt="chat icon" />
      ) : (
        <div className={styles.circle}>
          <p>{item.roomName[0]}</p>
        </div>
      )}
    </div>
  );
};

const Chat = (props) => {
  const { item, setActiveRoomId, activeRoomId, setMessageList, setView } =
    props;
  const getMessages = async () => {
    const url = `${uri}/rooms/${item.roomId}/messages`;
    const request = await fetch(url);
    const response = await request.json();
    if (request.ok) {
      setMessageList(response);
    }
  };
  const connectToRoom = () => {
    setActiveRoomId(item.roomId);
    setView("chatbox");
  };
  return (
    <li
      className={
        activeRoomId === item.roomId
          ? `${styles.roomItem} ${styles.active}`
          : `${styles.roomItem} ${styles.inactive}`
      }
    >
      <button onClick={connectToRoom}>
        <ChatItcon item={item} />
        <p>{item.roomName}</p>
      </button>
    </li>
  );
};

const SideBar = (props) => {
  const {
    roomsList,
    activeRoomId,
    setActiveRoomId,
    setMessageList,
    view,
    setView,
  } = props;
  const sideBarRef = useRef(null);
  const handleResize = () => {
    // console.log(sideBarRef.current);
    if (sideBarRef.current !== null) {
      if (window.innerWidth <= 600 && view !== "sidebar") {
        sideBarRef.current.classList.remove(`${styles.show}`);
        sideBarRef.current.classList.add(`${styles.hide}`);
      } else {
        sideBarRef.current.classList.remove(`${styles.hide}`);
        sideBarRef.current.classList.add(`${styles.show}`);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, [view]);
  return (
    <div
      className={
        window.innerWidth <= 600 && view !== "sidebar"
          ? `${styles.sideBar} ${styles.hide}`
          : `${styles.sideBar} ${styles.show}`
      }
      ref={sideBarRef}
    >
      <div className={styles.header}>
        <h1>Chats</h1>
      </div>
      <ul className={styles.roomsList}>
        {roomsList.map((item) => (
          <Chat
            item={item}
            setActiveRoomId={setActiveRoomId}
            activeRoomId={activeRoomId}
            setMessageList={setMessageList}
            key={item.roomId}
            setView={setView}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
