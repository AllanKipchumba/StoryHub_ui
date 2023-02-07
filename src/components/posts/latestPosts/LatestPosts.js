import React from "react";
import { Post } from "../post/Post";
import styles from "./newpost.module.scss";

export const LatestPosts = ({ latestPosts }) => {
  return (
    <div className={styles["latest-posts"]}>
      <h3 className="hover:no-underline">Latest Posts</h3>
      <div className="underLine"></div>
      <div className=" py-3 m-auto grid grid-cols-2 lg:grid-cols-3 gap-6 md:10">
        {latestPosts.map((post) => (
          <Post key={post._id} post={post} latest={styles.latest} />
        ))}
      </div>
    </div>
  );
};
