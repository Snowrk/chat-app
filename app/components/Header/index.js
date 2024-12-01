import styles from "./index.module.css";
const Header = (props) => {
  const { profile, handleLogout } = props;
  return (
    <div className={styles.header}>
      <h1>Chat App</h1>
      <div className={styles.user}>
        <div className={styles.item}>
          {profile.profileImgUrl !== null ? (
            <img src={profile.profileImgUrl} alt="user icon" />
          ) : (
            <div className={styles.circle}>
              <p>{profile.userName[0]}</p>
            </div>
          )}
          <p>{profile.userName}</p>
        </div>
        <button onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default Header;
