"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import styles from "./page.module.css";

const uri = process.env.NEXT_PUBLIC_API;

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleLogin = async () => {
    const url = `${uri}/login`;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const request = await fetch(url, options);
    const response = await request.json();
    if (request.ok) {
      Cookies.set("jwtToken", response.jwtToken, { expires: 7 });
      router.replace("/");
    } else {
      setErr(response.err);
    }
  };
  return (
    <div className={styles.form}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {err.length > 0 && <p>{err}</p>}
    </div>
  );
};

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleRegister = async () => {
    const url = `${uri}/register`;
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    const request = await fetch(url, options);
    const response = await request.json();
    if (request.ok) {
      Cookies.set("jwtToken", response.jwtToken, { expires: 7 });
      router.replace("/");
    } else {
      setErr(response.err);
    }
  };
  return (
    <div className={styles.form}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {err.length > 0 && <p>{err}</p>}
    </div>
  );
};

export default function Auth() {
  const [login, setLogin] = useState(true);
  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button
            onClick={() => setLogin(true)}
            className={login ? `${styles.btn} ${styles.active}` : styles.btn}
          >
            Login
          </button>
          <button
            onClick={() => setLogin(false)}
            className={!login ? `${styles.btn} ${styles.active}` : styles.btn}
          >
            Register
          </button>
        </div>
        {login ? <Login /> : <Register />}
      </div>
    </div>
  );
}
