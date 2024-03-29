import React from "react";
import { Link } from "react-router-dom";
import { Timestamp } from "../Timestamp";
import styles from "./randomPosts.module.scss";

export const RandomPosts = ({ randomPosts }) => {
  return (
    <div className={styles.wrapper}>
      {randomPosts.map((post) => {
        const { _id, category, title, createdAt } = post;
        return (
          <div key={_id} className={styles.content}>
            <div className="line-subtitle">
              <div className="line"></div>
              <div className="subtitle">{category}</div>
            </div>
            <Link to={`/post/${_id}`}>
              <h3>{title}</h3>
            </Link>
            <Timestamp createdAt={createdAt} />
          </div>
        );
      })}
    </div>
  );
};
