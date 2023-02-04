import React from "react";
import styles from "./passwordStrengthIndicator.module.scss";
import { FaCheck } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";

export const PasswordStrengthIndicator = ({
  passLength,
  passNumber,
  passLetter,
  showIndicator,
}) => {
  return (
    <div
      className={`${styles["password-strength"]} ${
        showIndicator ? styles["show-indicator"] : styles["hide-indicator"]
      }`}
    >
      <ul>
        <p>Password Strength Indicator</p>
        <li
          className={
            passLetter ? `${styles["pass-green"]}` : `${styles["pass-red"]}`
          }
        >
          <span>
            {passLetter ? <FaCheck /> : <GoPrimitiveDot />}
            &nbsp; &nbsp; &nbsp; Lowercase & Uppercase
          </span>
        </li>
        <li
          className={
            passNumber ? `${styles["pass-green"]}` : `${styles["pass-red"]}`
          }
        >
          <span>
            {passNumber ? <FaCheck /> : <GoPrimitiveDot />}
            &nbsp; &nbsp; &nbsp; Numbers (0-9)
          </span>
        </li>

        <li
          className={
            passLength ? `${styles["pass-green"]}` : `${styles["pass-red"]}`
          }
        >
          <span>
            {passLength ? <FaCheck /> : <GoPrimitiveDot />}
            &nbsp; &nbsp; &nbsp; At least 6 characters
          </span>
        </li>
      </ul>
    </div>
  );
};
