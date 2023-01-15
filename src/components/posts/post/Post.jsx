import React from "react";
import styles from "./post.module.scss";
import { Link } from "react-router-dom";
import { Timestamp } from "../Timestamp";
// import { useSelector } from "react-redux";

export const Post = ({ post, latest }) => {
  // const { user } = useSelector((store) => store["logIn"]);
  const { title: originalTitle } = post;
  let title;

  originalTitle.length < 30
    ? (title = originalTitle)
    : (title = originalTitle.substring(0, 30).concat("..."));

  return (
    <>
      <div className={`${styles.post}`}>
        <div>
          <div>
            <img src={post.imageURL} alt={post.title} className={styles.img} />
          </div>

          <div className={`${styles["post-title"]} ${latest}`}>
            <div className="line-subtitle">
              <div className="line"></div>
              <div className="subtitle">{post.category}</div>
            </div>
            <h3>
              <Link to={`/post/${post._id}`}>{title}</Link>
            </h3>

            <Timestamp createdAt={post.createdAt} />
          </div>
        </div>
      </div>
    </>
  );
};
