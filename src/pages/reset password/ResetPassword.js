import React, { useEffect, useState } from "react";
import styles from "../signUp/signup.module.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineUnlock } from "react-icons/ai";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AUTH_SUCCESS } from "../../Redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { PasswordStrengthIndicator } from "../../components/passwordStrengthIndicator/PasswordStrengthIndicator";
import { RevealOnScroll } from "../../components/RevealOnScroll/RevealOnScroll";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [passLetter, setPassLetter] = useState(false);
  const [passNumber, setPassNumber] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passComplete, setPassComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useParams();

  //monitor password strength
  useEffect(() => {
    password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
      ? setPassLetter(true)
      : setPassLetter(false);

    password.match(/([0-9])/) ? setPassNumber(true) : setPassNumber(false);

    password.length > 5 ? setPassLength(true) : setPassLength(false);

    passLetter && passNumber && passLength
      ? setPassComplete(true)
      : setPassComplete(false);
  }, [password, passLength, passLetter, passNumber]);

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios({
        method: `put`,
        url: `http://localhost:5000/api/auth/reset/${token}`,
        data: {
          newPassword: password,
        },
      });
      setLoading(false);
      setPassword("");
      console.log(res.data);
      dispatch(AUTH_SUCCESS(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <RevealOnScroll>
      <div className={`${styles.signup}  mt-[5rem] !mb-[8rem]`}>
        <div className={styles["form-wrapper"]}>
          <form onSubmit={resetPassword}>
            <h1> Enter your new Password here</h1>

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
                <BeatLoader
                  loading={loading}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                `Reset`
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
    </RevealOnScroll>
  );
};
