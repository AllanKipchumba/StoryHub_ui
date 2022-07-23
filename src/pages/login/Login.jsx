import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import login from "./assests/login.svg";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <>
      <div className="login max-w-[1240px] flex-col p-4 mx-auto grid md:grid-cols-3 gap-10">
        <img src={login} alt="/" className="col-span-1 w-[50%]" />

        <div className="col-span-2 py-8 ">
          <form onSubmit={submitForm}>
            <h1>
              Login to your story
              <span className="text-[#ff0581]">Hub</span> account
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
            <BeatLoader
              loading={loading}
              color="#ff0581"
              margin={4}
              size={15}
              className="ml-[100px]"
            />

            <p>
              new blogger? <span>create account</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
