"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Cookies from "js-cookie";
import styles from "./page.module.css";
<<<<<<< HEAD
import { LoginForm } from "@/components/login-form";
import { useSearchParams } from "next/navigation";
import { SignupForm } from "@/components/register-form";
import { ModeToggle } from "@/components/mode-toggle";
=======
import { Loader } from "../components/loader";
>>>>>>> ed2ac37a2abf3bed560189c2ac07b5e44523f664

const uri = process.env.NEXT_PUBLIC_API;
console.log(uri);

<<<<<<< HEAD
const Loader = () => (
  <div className={styles.center}>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
    <div className={styles.wave}></div>
  </div>
);

const Login = (props) => {
  const { loading, setLoading } = props;
=======
const Login = ({loading, setLoading}) => {
>>>>>>> ed2ac37a2abf3bed560189c2ac07b5e44523f664
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const handleLogin = async () => {
    if (username === "" || password === "") {
      setErr("username or password cannot be empty");
<<<<<<< HEAD
    } else if (username.length < 3 || password.length < 3) {
      setErr("username or password cannot be less than 3 letters");
=======
      return;
    } else if (username.length < 3 || password.length < 3) {
      setErr("username or password cannot be less than 3 letters");
      return;
    }
    setLoading(true)
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
>>>>>>> ed2ac37a2abf3bed560189c2ac07b5e44523f664
    } else {
      setLoading(true);
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
      console.log(request);
      const response = await request.json();
      if (request.ok) {
        Cookies.set("jwtToken", response.jwtToken, { expires: 7 });
        router.replace("/");
      } else {
        setErr(response.err);
      }
      setLoading(false);
    }
    setLoading(false)
  };

  return (
<<<<<<< HEAD
    <LoginForm
      username={username}
      password={password}
      show={show}
      setUsername={setUsername}
      setPassword={setPassword}
      setShow={setShow}
      err={err}
      setErr={setErr}
      handleLogin={handleLogin}
      loading={loading}
    />
=======
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
          {loading?(<Loader/>):(<button onClick={handleLogin}>Login</button>)}
      {err.length > 0 && <p>{err}</p>}
    </div>
>>>>>>> ed2ac37a2abf3bed560189c2ac07b5e44523f664
  );
  // return (
  //   <div className={styles.form}>
  //     <label htmlFor="username">Username</label>
  //     <input
  //       id="username"
  //       value={username}
  //       onChange={(e) => setUsername(e.target.value)}
  //     />
  //     <label htmlFor="password">Password</label>
  //     <input
  //       id="password"
  //       type="password"
  //       value={password}
  //       onChange={(e) => setPassword(e.target.value)}
  //     />
  //     {loading ? (
  //       <button className={styles.loading} disabled>
  //         <span className={styles.hidden}>Loading</span>
  //         <Loader />
  //       </button>
  //     ) : (
  //       <button onClick={handleLogin} className={styles.btn1}>
  //         Login
  //       </button>
  //     )}
  //     {err.length > 0 && <p>{err}</p>}
  //   </div>
  // );
};

<<<<<<< HEAD
const Register = (props) => {
  const { loading, setLoading } = props;
=======
const Register = ({loading, setLoading}) => {
>>>>>>> ed2ac37a2abf3bed560189c2ac07b5e44523f664
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const handleRegister = async () => {
    if (username === "" || password === "") {
      setErr("username or password cannot be empty");
<<<<<<< HEAD
    } else if (username.length < 3 || password.length < 3) {
      setErr("username or password cannot be less than 3 letters");
=======
      return;
    } else if (username.length < 3 || password.length < 3) {
      setErr("username or password cannot be less than 3 letters");
      return;
    }
    setLoading(true)
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
>>>>>>> ed2ac37a2abf3bed560189c2ac07b5e44523f664
    } else {
      setLoading(true);
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
      setLoading(false);
    }
    setLoading(false)
  };
  return (
<<<<<<< HEAD
    <SignupForm
      username={username}
      password={password}
      show={show}
      setUsername={setUsername}
      setPassword={setPassword}
      setShow={setShow}
      err={err}
      setErr={setErr}
      handleRegister={handleRegister}
      loading={loading}
    />
  );
  //   return (
  //     <div className={styles.form}>
  //       <label htmlFor="username">Username</label>
  //       <input
  //         id="username"
  //         value={username}
  //         onChange={(e) => setUsername(e.target.value)}
  //       />
  //       <label htmlFor="password">Password</label>
  //       <input
  //         id="password"
  //         type="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //       {loading ? (
  //         <button className={styles.loading} disabled>
  //           <span className={styles.hidden}>Loading</span>
  //           <Loader />
  //         </button>
  //       ) : (
  //         <button onClick={handleRegister} className={styles.btn1}>
  //           Register
  //         </button>
  //       )}
  //       {err.length > 0 && <p>{err}</p>}
  //     </div>
  //   );
};

const Wrapper = () => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const login = searchParams.get("signup") !== "true" ? true : false;
  return (
    <div className="flex items-center justify-center flex-grow">
      {login ? (
        <Login loading={loading} setLoading={setLoading} />
      ) : (
        <Register loading={loading} setLoading={setLoading} />
      )}
=======
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
          {loading?(<Loader/>):(<button onClick={handleRegister}>Register</button>)}
      {err.length > 0 && <p>{err}</p>}
>>>>>>> ed2ac37a2abf3bed560189c2ac07b5e44523f664
    </div>
  );
};

export default function Auth() {
<<<<<<< HEAD
  // const [login, setLogin] = useState(true);
  // useEffect(() => {
  //   setLogin(searchParams.get("signup") !== "true" ? true : false);
  // }, [searchParams.get("signup")]);
  return (
    <div className="flex flex-col h-screen">
      <Wrapper />
=======
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
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
        {login ? <Login loading={loading} setLoading={setLoading} /> : <Register loading={loading} setLoading={setLoading} />}
      </div>
>>>>>>> ed2ac37a2abf3bed560189c2ac07b5e44523f664
    </div>
  );
}
