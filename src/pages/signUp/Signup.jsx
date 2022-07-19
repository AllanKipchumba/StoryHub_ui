import React, { useEffect, useRef } from "react";
import "./signup.scss";
import image from "./assets/signup.svg";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";

export const Signup = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="signup max-w-[1240px] flex-col p-4 mx-auto grid grid-cols-3 gap-10">
        <div>
          <div>
            <h1>
              story<span className="text-[#ff0581]">hub</span>
            </h1>
            <p>
              A place where amazing posts can be written to inspire self and
              others.
            </p>
          </div>
          <img src={image} alt="/" />
        </div>

        <div className="col-span-2 py-8">
          <form onSubmit={submitForm}>
            <h1>sign up to storyHub</h1>
            <p>
              Already a member? <span>Log In</span>
            </p>

            <label>Username</label>
            <div className="inpputWrapper">
              <AiOutlineUser className="icon" />
              <input
                type="text"
                placeholder="Input Username"
                ref={usernameRef}
              />
            </div>

            <label>Email</label>
            <div className="inpputWrapper">
              <HiOutlineMail className="icon" />
              <input type="email" placeholder="Input Email" ref={emailRef} />
            </div>

            <label>Password</label>
            <div className="inpputWrapper">
              <AiOutlineUnlock className="icon" />
              <input type="password" placeholder="Input" ref={passwordRef} />
            </div>

            <button type="submit">Create an Account</button>
          </form>
        </div>
      </div>
    </>
  );
};
