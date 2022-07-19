import React, { useEffect, useRef } from "react";
import "./login.scss";
import login from "./assests/login.svg";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="login max-w-[1240px] flex-col p-4 mx-auto grid grid-cols-3 gap-10">
        <img src={login} alt="/" />

        <div className="col-span-2 py-8">
          <form onSubmit={submitForm}>
            <h1>
              welcome to story
              <span className="text-[#ff0581]">Hub</span>
            </h1>

            <label>Email</label>
            <div className="inputWrapper flex flex-row gap-2">
              <HiOutlineMail className="icon" />
              <input
                type="email"
                placeholder="Input Email"
                className="py-4 input"
                ref={emailRef}
              />
            </div>

            <label>Password</label>
            <div className="inputWrapper flex flex-row gap-2">
              <AiOutlineUnlock className="icon" />
              <input
                type="password"
                placeholder="Input password"
                className="py-4 input"
                ref={passwordRef}
              />
            </div>

            <button type="submit">sign in</button>

            <p>
              new blogger? <span>create account</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
