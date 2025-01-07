"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import { LoginForm } from "@/components/login-form";
import { useSearchParams } from "next/navigation";
import { SignupForm } from "@/components/register-form";
import { ModeToggle } from "@/components/mode-toggle";

const uri = process.env.NEXT_PUBLIC_API;
// console.log(uri);

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
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const handleLogin = async () => {
    if (username === "" || password === "") {
      setErr("username or password cannot be empty");
    } else if (username.length < 3 || password.length < 3) {
      setErr("username or password cannot be less than 3 letters");
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
    setLoading(false);
  };

  return (
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

const Register = ({ loading, setLoading }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const handleRegister = async () => {
    if (username === "" || password === "") {
      setErr("username or password cannot be empty");
    } else if (username.length < 3 || password.length < 3) {
      setErr("username or password cannot be less than 3 letters");
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
    setLoading(false);
  };
  return (
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
    </div>
  );
};

export default function Auth() {
  // const [login, setLogin] = useState(true);
  // useEffect(() => {
  //   setLogin(searchParams.get("signup") !== "true" ? true : false);
  // }, [searchParams.get("signup")]);
  return (
    <div className="flex flex-col h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Wrapper />
      </Suspense>
    </div>
  );
}
