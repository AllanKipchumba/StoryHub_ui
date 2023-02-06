import React, { useEffect, useState } from "react";
import { Pagination } from "../../../pagination/Pagination";
import { RevealOnScroll } from "../../../RevealOnScroll/RevealOnScroll";
import { Post } from "../../post/Post";
import styles from "./SimilarPosts.module.scss";

export const SimilarPosts = ({ category, id }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const similarPosts = posts
    .filter((post) => post.category === category && post._id !== id)
    .sort()
    .reverse();
  const currentPosts = similarPosts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //FETCH POSTS FROM DB
  useEffect(() => {
    try {
      fetch("https://storyhub-api.onrender.com/api/posts/")
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
            {currentPosts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={similarPosts.length}
        />
      </RevealOnScroll>
    );
  }
};
