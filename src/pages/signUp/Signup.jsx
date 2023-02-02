import React, { useEffect, useState } from "react";
import styles from "./signup.module.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineUnlock } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_SUCCESS } from "../../Redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { PasswordStrengthIndicator } from "../../components/passwordStrengthIndicator/PasswordStrengthIndicator";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Regex email validation
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

  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     setLoading(true);
  //   }
  // }, [formErrors, isSubmit]);

  const formValues = {
    email,
    password,
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        formValues
      );
      dispatch(AUTH_SUCCESS(res.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.signup}>
      <div className={styles["form-wrapper"]}>
        <form onSubmit={submitForm}>
          <h1>
            Sign up to story<span>Hub</span>
          </h1>
          <h5>
            Already a member?
            <Link to="/login">
              <span>Log in</span>
            </Link>
          </h5>

          <label>Email</label>
          <div className={styles.inputWrapper}>
            <HiOutlineMail className={styles.icon} />
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <p className={styles.error}>{formErrors.email}</p>

          <label>Password</label>
          <div className={styles.inputWrapper}>
            <AiOutlineUnlock className={styles.icon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onFocus={() => setShowIndicator(true)}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <span
              className={`${styles.icon} ${styles["pass-icon"]}`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className={styles.icon} />
              ) : (
                <AiOutlineEye className={styles.icon} />
              )}
            </span>
          </div>

          <button
            type="submit"
            className={!passComplete && `${styles["btn-disabled"]}`}
            disabled={!passComplete}
          >
            {loading ? (
              <BeatLoader loading={loading} color="#fff" margin={4} size={17} />
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
  );
};
