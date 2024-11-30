import styles from "./index.module.css";

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
  const { item } = props;
  return (
    <li className={styles.userItem}>
      <UserIcon item={item} />
      <p>{item.userName}</p>
    </li>
  );
};

const OnlineBar = (props) => {
  const { onlineUserList } = props;
  return (
    <div className={styles.onlineBar}>
      <div className={styles.header}>
        <h1>Active Users</h1>
      </div>
      <ul className={styles.userList}>
        {onlineUserList.map((item) => (
          <User item={item} key={item.userId} />
        ))}
      </ul>
    </div>
  );
};

export default OnlineBar;
