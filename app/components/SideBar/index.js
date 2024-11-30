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
  const { item, setActiveRoomId, activeRoomId, setMessageList } = props;
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
    getMessages();
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
  const { roomsList, activeRoomId, setActiveRoomId, setMessageList } = props;
  return (
    <div className={styles.sideBar}>
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
          />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
