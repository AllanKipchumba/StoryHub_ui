import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./myposts.module.scss";

export const MyPosts = () => {
  const { user } = useSelector((store) => store["auth"]);

  let token;
  if (user) {
    token = user.token;
  }
  const headers = useMemo(() => {
    if (user) {
      const headers = { Authorization: `Bearer ${token}` };
      return headers;
    }
  }, [token, user]);
  useEffect(() => {
    const fetchMyPosts = async () => {};
  }, []);
  return (
    <div className={styles.myposts}>
      <h3>MyPosts</h3>
    </div>
  );
};
