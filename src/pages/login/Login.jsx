import React, { useEffect, useState } from "react";
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
  loadingStart,
  loadingStop,
} from "../../Redux/slices/loginSlice";
import { Link } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const { fetching, error, loading } = useSelector((store) => store["logIn"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});

  const formValues = {
    email,
    password,
  };

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    dispatch(loadingStart());
    setFormErrors(validate(formValues));

    try {
      const res = await axios.post("/auth/login", formValues);
      // update user state
      dispatch(loginSuccess(res.data)) && window.location.replace("/");
      dispatch(loadingStop());
    } catch (error) {
      dispatch(loginFail());
      dispatch(loadingStop());
      console.log(error);
    }
  };

  // FORM VALIDATION
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <>
      <div className="login max-w-[1240px] flex-col mx-auto grid md:grid-cols-3 gap-10">
        <img src={login} alt="/" className="col-span-1 w-[50%]" />

        <div className="col-span-2 py-8 ">
          <form onSubmit={submitForm}>
            <h1>
              Login to your story
              <span className="text-[#ff0581]">Hub</span> account
            </h1>

            {error && (
              <p className="text-[red]">
                Failed to login! check your credentials!
              </p>
            )}

            <label>Email</label>
            <div className="inputWrapper flex flex-row gap-2">
              <HiOutlineMail className="icon" />
              <input
                type="email"
                placeholder="Input Email"
                className="input py-4"
                // ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="error">{formErrors.email}</p>

            <label>Password</label>
            <div className="inputWrapper flex flex-row gap-2">
              <AiOutlineUnlock className="icon" />
              <input
                type="password"
                placeholder="Input password"
                className="py-4 input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p className="error">{formErrors.password}</p>

            <button type="submit">
              {loading ? (
                <BeatLoader
                  loading={fetching}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                `Sign in`
              )}
            </button>

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
