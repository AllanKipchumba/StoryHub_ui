import React, { useState } from "react";
import styles from "../signUp/signup.module.scss";
import { HiOutlineMail } from "react-icons/hi";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { RevealOnScroll } from "../../components/RevealOnScroll/RevealOnScroll";
import { toast } from "react-toastify";

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Regex email validation
  const validate = (email) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!email) {
      errors.email = "Email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validate(email));

    try {
      const res = await axios({
        method: `post`,
        url: "https://storyhub-api.onrender.com/api/auth/resetpassword",
        data: {
          email,
        },
      });
      toast.success("Email sent");
      setEmailSent(true);
      setLoading(false);
      console.log(res.data);
      setEmail("");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <RevealOnScroll>
      <div className={`${styles.signup}  mt-[5rem] !mb-[7rem]`}>
        <div className={styles["form-wrapper"]}>
          <form onSubmit={submitEmail}>
            {emailSent && (
              <h2 className="text-[#eb0202] mx-auto">
                Check your email for the reset link
              </h2>
            )}
            <h1>Enter email for password reset link</h1>

            <label>Email</label>
            <div className={styles.inputWrapper}>
              <HiOutlineMail className={styles.icon} />
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <p className={styles.error}>{formErrors.email}</p>

            <button type="submit">
              {loading ? (
                <BeatLoader
                  loading={loading}
                  color="#fff"
                  margin={4}
                  size={17}
                />
              ) : (
                `Send`
              )}
            </button>
          </form>
        </div>
      </div>
    </RevealOnScroll>
  );
};
