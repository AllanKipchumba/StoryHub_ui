import React, { useEffect, useState } from "react";
import "./signup.scss";
import image from "./assets/signup.svg";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { Link } from "react-router-dom";
import { objectTraps } from "immer/dist/internal";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const formValues = {
    username,
    email,
    password,
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      // console.log(formValues);
    }
  }, [formErrors]);

  const submitForm = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    if (!Object.keys(formErrors).length) {
      try {
        const res = await axios.post("/auth/register", formValues);
        console.log(res.data.user);
        // res.data && window.location.replace("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // FORM VALIDATION LOGIC
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
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
              <Link to="/login">
                <span className="text-[#ff0581] hover:text-[#d10068] hover:cursor-pointer">
                  Log In
                </span>
              </Link>
            </p>

            <label>Username</label>
            <div className="inputWrapper">
              <AiOutlineUser className="icon" />
              <input
                type="text"
                placeholder="Create Username"
                onChange={(e) => setUsername(e.target.value)}
                className="input"
              />
            </div>
            <p className="error">{formErrors.username}</p>

            <label>Email</label>
            <div className="inputWrapper">
              <HiOutlineMail className="icon" />
              <input
                type="emailRef"
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
            <p className="error">{formErrors.email}</p>

            <label>Password</label>
            <div className="inputWrapper">
              <AiOutlineUnlock className="icon" />
              <input
                type="password"
                placeholder="Create Password"
                onChange={(e) => setPassword(e.target.value)}
                className="input "
              />
            </div>
            <p className="error">{formErrors.password}</p>

            <button type="submit">
              {loading ? (
                <BeatLoader
                  loading={loading}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                `Create Account`
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
