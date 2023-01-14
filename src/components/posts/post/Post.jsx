import React from "react";
import styles from "./post.module.scss";
import { Link } from "react-router-dom";
import { Timestamp } from "../Timestamp";
// import { useSelector } from "react-redux";

export const Post = ({ post }) => {
  // const { user } = useSelector((store) => store["logIn"]);
  return (
    <>
      <div className={`${styles.post}`}>
        <div>
          <div>
            <img src={post.imageURL} alt={post.title} className={styles.img} />
          </div>

          <div className={styles["post-title"]}>
            <p className="category">{post.category}</p>
            <h1>
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h1>

            <Timestamp createdAt={post.createdAt} />
          </div>
        </div>
      </div>
    </>
  );
};
