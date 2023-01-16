import React, { useEffect, useState } from "react";
import styles from "../signUp/signup.module.scss";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUnlock,
} from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import { useSelector, useDispatch } from "react-redux";
import {
  loginStart,
  loginFail,
  loginSuccess,
  loadingStart,
  loadingStop,
} from "../../Redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PasswordStrengthIndicator } from "../../components/passwordStrengthIndicator/PasswordStrengthIndicator";

export const Login = () => {
  const { fetching, error, loading } = useSelector((store) => store["logIn"]);
  const [email, setEmail] = useState("testuser3@gmail.com");
  const [password, setPassword] = useState("123456Aa");
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
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
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formValues
      );
      // update user state
      dispatch(loginSuccess(res.data));
      dispatch(loadingStop());
      navigate("/");
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

    return errors;
  };

  return (
    <>
      <div className={styles.signup}>
        <div className={styles["form-wrapper"]}>
          <form onSubmit={submitForm}>
            <h1>
              Login to your story
              <span>Hub</span> account
            </h1>

            {error && (
              <p className={styles.error}>
                Failed to login! check your credentials!
              </p>
            )}

            <label>Email</label>
            <div className={styles.inputWrapper}>
              <HiOutlineMail className={styles.icon} />
              <input
                type="email"
                placeholder="Input email"
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
                placeholder="Input password"
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
            <p className="error">{formErrors.password}</p>

            <button
              type="submit"
              className={!passComplete && `${styles["btn-disabled"]}`}
              disabled={!passComplete}
            >
              {loading ? (
                <BeatLoader
                  loading={fetching}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                `Login`
              )}
            </button>

            <PasswordStrengthIndicator
              passLength={passLength}
              passNumber={passNumber}
              passLetter={passLetter}
              showIndicator={showIndicator}
            />

            <h5>
              New to storyHub?{" "}
              <Link to="/signup">
                <span>create account</span>
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </>
  );
};
