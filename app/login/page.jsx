"use client";

import SimpleReactValidator from "simple-react-validator";
import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "./login.module.scss";
import { Form, Button, Spinner } from "react-bootstrap";
import cls from "classnames";
import { useRouter, redirect } from "next/navigation";
import { loginUser } from "@/lib/login";

export default function Login() {
  const router = useRouter();
  const validator = useRef(new SimpleReactValidator());

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(0);

  const signIn = async () => {
    if (
      validator.current.fieldValid("username") &&
      validator.current.fieldValid("password")
    ) {
      setLoading(true);
      const user = await loginUser(username, password).then((user) => {
        if (user !== undefined) {
          router.push("/employees");
          setUsername("");
          setPassword("");
        } else {
          alert("please enter valid information");
        }
        setLoading(false);
      });
    } else {
      validator.current.showMessages();
      setUpdate(1);
    }
  };

  const checkInputs = () => {
    if (validator.allValid()) {
      alert("good");
    } else alert("bad");
  };
  return (
    <div className={styles.formWrapper}>
      <div className={styles.signinForm}>
        <div className={cls(styles.form)}>
          <h1 className=" w-[100%] text-black-900 text-2xl underline mb-[15%] ">
            Admin dashboard:
          </h1>
          <label htmlFor="username" className={styles.label}>
            <input
              id="username"
              type="text"
              name="username"
              className={styles.input}
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className={styles.span}>username</span>
            {validator.current.message(
              "username",
              username,
              "required|string",
              { className: "text-danger" }
            )}
          </label>
          <label htmlFor="password" className={styles.label}>
            <input
              id="password"
              type="password"
              name="password"
              className={styles.input}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={styles.span}>password</span>
            {validator.current.message(
              "password",
              password,
              "required|string|min:8",
              { className: "text-danger" }
            )}
          </label>
          <button
            className={cls(
              "hover:bg-[#0077b6] ease-out duration-300",
              styles.btn
            )}
            onClick={() => signIn()}
            type="submit"
          >
            {loading ? <>Signing in...</> : <>sign in</>}
          </button>
        </div>
      </div>
    </div>
  );
}
