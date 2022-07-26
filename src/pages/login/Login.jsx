import React, { useEffect, useRef, useState } from "react";
import "./login.scss";
import login from "./assests/login.svg";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  loginStart,
  loginFail,
  loginSuccess,
} from "../../Redux/slices/loginSlice";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  // access state from redux store
  const loginState = useSelector((store) => store["logIn"]);
  const { user, fetching, error } = loginState;
  // console.log(loginState);

  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      // update user state
      dispatch(loginSuccess(res.data));
    } catch (error) {
      dispatch(loginFail());
      console.log(error);
    }
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
              loading={fetching}
              color="#ff0581"
              margin={4}
              size={15}
              className="ml-[100px]"
            />

            <p>
              new blogger?{" "}
              <Link to="/signup">
                <span>create account</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
