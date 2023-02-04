import React, { useEffect, useState } from "react";
import { RevealOnScroll } from "../../../RevealOnScroll/RevealOnScroll";
import { Post } from "../../post/Post";
import styles from "./SimilarPosts.module.scss";

export const SimilarPosts = ({ category, id }) => {
  const [posts, setPosts] = useState([]);

  //get posts with the same category name
  const similarPosts = posts.filter(
    (post) => post.category === category && post._id !== id
  );

  //FETCH POSTS FROM DB
  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/posts/")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (similarPosts.length !== 0) {
    return (
      <RevealOnScroll>
        <div className={styles.similarPosts}>
          <h3 className="hover:no-underline">Similar Posts</h3>
          <div className="underLine"></div>
          <div className={styles["show-similar-posts"]}>
            {similarPosts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </div>
        </div>
      </RevealOnScroll>
    );
  }
};
