import React, { useState } from "react";
import styles from "../signUp/signup.module.scss";
import { HiOutlineMail } from "react-icons/hi";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineUnlock,
} from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_SUCCESS } from "../../Redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RevealOnScroll } from "../../components/RevealOnScroll/RevealOnScroll";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({});
  const [authFail, setAuthFail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { previousURL } = useSelector((store) => store["post"]);
  const postURL = previousURL.substring(previousURL.indexOf("/post"));
  const redirectUser = () => {
    previousURL.includes("post") ? navigate(`${postURL}`) : navigate("/");
  };

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

  const formValues = {
    email,
    password,
  };

  const requestLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validate(formValues));

    try {
      const res = await axios.post(
        "https://storyhub-api.onrender.com/api/auth/login",
        formValues
      );
      dispatch(AUTH_SUCCESS(res.data));
      setLoading(false);
      redirectUser();
    } catch (error) {
      setLoading(false);
      setAuthFail(true);
      console.log(error);
    }
  };

  return (
    <RevealOnScroll>
      <div className={`${styles.signup} `}>
        <div className={styles["form-wrapper"]}>
          <form onSubmit={requestLogin}>
            <h1>
              Login to Story
              <span>Hub</span>
            </h1>

            <h5 className="!pb-4">
              New to storyHub? &nbsp;
              <Link to="/signup">
                <span>Create account</span>
              </Link>
            </h5>

            {authFail && (
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
                required
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
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
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

            <button type="submit">
              {loading ? (
                <BeatLoader
                  loading={loading}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                `Login`
              )}
            </button>

            <h5 className="!mt-8">
              Forgot password? &nbsp;
              <Link to="/reset">
                <span>Reset password</span>
              </Link>
            </h5>
          </form>
        </div>
      </div>
    </RevealOnScroll>
  );
};
