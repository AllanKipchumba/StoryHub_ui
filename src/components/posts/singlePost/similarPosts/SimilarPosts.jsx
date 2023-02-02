import React, { useEffect, useState } from "react";
import styles from "./SimilarPosts.module.scss";

export const SimilarPosts = ({ category }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const similarPosts = posts.filter((post) => post.category === category);
  console.log(similarPosts);

  //FETCH POSTS FROM DB
  useEffect(() => {
    setLoading(true);
    try {
      fetch("http://localhost:5000/api/posts/")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <div>
        <h1>Similar Posts</h1>
      </div>
      <div></div>
    </div>
  );
};
