import { v4 } from "uuid";
import styles from "./index.module.css";

const uri = process.env.NEXT_PUBLIC_API;

const UserIcon = (props) => {
  const { item } = props;
  return (
    <div>
      {item.profileImgUrl !== null ? (
        <img src={item.profileImgUrl} alt="user icon" />
      ) : (
        <div className={styles.circle}>
          <p>{item.userName[0]}</p>
        </div>
      )}
    </div>
  );
};

const User = (props) => {
  const { item, roomsList, profile, setActiveRoomId, setRoomsList } = props;
  const createPrivateRoom = async () => {
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
      console.log(response);
      setRoomsList((prev) => [...prev, response]);
      setActiveRoomId(response.roomId);
    }
  };
  const connectPrivateRoom = () => {
    if (profile.userId === item.userId) {
      return;
    }
    const idx = roomsList.findIndex(
      (e) => e.roomName === `${profile.userName}-${item.userName}`
    );
    if (idx === -1) {
      createPrivateRoom();
    } else {
      setActiveRoomId(roomsList[idx].roomId);
    }
  };
  return (
    <li className={styles.userItem}>
      <button onClick={connectPrivateRoom}>
        <UserIcon item={item} />
        <p>{item.userName}</p>
      </button>
    </li>
  );
};

const OnlineBar = (props) => {
  const { onlineUserList, roomsList, setRoomsList, setActiveRoomId, profile } =
    props;
  return (
    <div className={styles.onlineBar}>
      <div className={styles.header}>
        <h1>Active Users</h1>
      </div>
      <ul className={styles.userList}>
        {onlineUserList.map((item) => (
          <User
            item={item}
            key={item.userId}
            roomsList={roomsList}
            setRoomsList={setRoomsList}
            profile={profile}
            setActiveRoomId={setActiveRoomId}
          />
        ))}
      </ul>
    </div>
  );
};

export default OnlineBar;
