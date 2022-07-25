import React, { useEffect, useRef, useState } from "react";
import "./signup.scss";
import image from "./assets/signup.svg";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";

export const Signup = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/auth/register", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      // console.log(res.data.user);
      res.data && window.location.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="signup max-w-[1240px] flex-col p-4 mx-auto grid md:grid-cols-4 gap-10">
        <div className="intro col-span-2">
          <div className="mb-6 mt-12 sm:mt-0">
            <h1 className="py-4">
              story<span className="text-[#ff0581]">Hub</span>,
            </h1>
            <p>
              A place where amazing posts can be written to inspire self and
              others.
            </p>
          </div>
          <img src={image} alt="/" />
        </div>

        <div className=" col-span-2 py-8">
          <form onSubmit={submitForm}>
            <h1>
              sign up to story<span className="text-[#ff0581]">Hub</span>
            </h1>
            <p className="mb-4">
              Already a member?{" "}
              <span className="text-[#ff0581] hover:text-[#d10068] hover:cursor-pointer">
                Log In
              </span>
            </p>

            <label>Username</label>
            <div className="inputWrapper">
              <AiOutlineUser className="icon" />
              <input
                type="text"
                placeholder="Create Username"
                ref={usernameRef}
                className="input"
                required
              />
            </div>

            <label>Email</label>
            <div className="inputWrapper">
              <HiOutlineMail className="icon" />
              <input
                type="emailRef"
                placeholder="Enter your Email"
                ref={emailRef}
                className="input"
                required
              />
            </div>

            <label>Password</label>
            <div className="inputWrapper">
              <AiOutlineUnlock className="icon" />
              <input
                type="password"
                placeholder="Create Password"
                ref={passwordRef}
                className="input "
                required
              />
            </div>

            <button type="submit">Create Account</button>

            <BeatLoader
              loading={loading}
              color="#ff0581"
              margin={4}
              size={15}
              className=" mt-4 ml-[80px]"
            />

            {error && (
              <span className="mt-[15px] text-[#ff0581]">
                Something went wrong!
              </span>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
