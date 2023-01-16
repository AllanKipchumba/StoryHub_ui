import React, { useEffect, useState } from "react";
import "./signup.scss";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUser,
} from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../Redux/slices/loginSlice";
import { useDispatch } from "react-redux";
import { PasswordStrengthIndicator } from "../../components/passwordStrengthIndicator/PasswordStrengthIndicator";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  //pasword strength states
  const [passLetter, setPassLetter] = useState(false);
  const [passNumber, setPassNumber] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passComplete, setPassComplete] = useState(false);

  //monitor if requirements for strong password are met
  useEffect(() => {
    //check lowercase and uppercase
    password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
      ? setPassLetter(true)
      : setPassLetter(false);

    //check for numbers
    password.match(/([0-9])/) ? setPassNumber(true) : setPassNumber(false);

    //check if password is greater than 8
    password.length > 5 ? setPassLength(true) : setPassLength(false);

    //all criteria is met
    passLetter && passNumber && passLength
      ? setPassComplete(true)
      : setPassComplete(false);
  }, [password, passLength, passLetter, passNumber]);

  const formValues = {
    email,
    password,
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
    }
  }, [formErrors, isSubmit]);

  const submitForm = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    try {
      const res = await axios.post(
        "http://https://localhost:5000/api/auth/register",
        formValues
      );
      //update user state in store
      dispatch(loginSuccess(res.data));
      setLoading(false);
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  // FORM VALIDATION LOGIC
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    return errors;
  };

  return (
    <>
      <div className="signup ">
        <div className="form-wrapper">
          <form onSubmit={submitForm}>
            <h1>
              sign up to story<span>Hub</span>
            </h1>
            <h5>
              Already a member?{" "}
              <Link to="/login">
                <span>Log in</span>
              </Link>
            </h5>

            <label>Email</label>
            <div className="inputWrapper">
              <HiOutlineMail className="icon" />
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
            <p className="error">{formErrors.email}</p>

            <label>Password</label>
            <div className="inputWrapper">
              <AiOutlineUnlock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create Password"
                value={password}
                onFocus={() => setShowIndicator(true)}
                onChange={(e) => setPassword(e.target.value)}
                className="input "
              />
              <span
                className="icon pass-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="icon" />
                ) : (
                  <AiOutlineEye className="icon" />
                )}
              </span>
            </div>
            {/* <p className="error">{formErrors.password}</p> */}

            <button
              type="submit"
              className={!passComplete && "btn-disabled"}
              disabled={!passComplete}
            >
              {loading ? (
                <BeatLoader
                  loading={loading}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                `Register`
              )}
            </button>

            <PasswordStrengthIndicator
              passLength={passLength}
              passNumber={passNumber}
              passLetter={passLetter}
              showIndicator={showIndicator}
            />
          </form>
        </div>
      </div>
    </>
  );
};
