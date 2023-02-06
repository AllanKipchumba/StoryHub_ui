import React, { useEffect, useState } from "react";
import "./posts.scss";
import { useDispatch } from "react-redux";
import { STORE_POSTS } from "../../Redux/slices/postSlice";
import { LatestPosts } from "./latestPosts/LatestPosts";
import { AllPosts } from "./AllPosts";
import { Slider } from "./slider/Slider";
import { RandomPosts } from "./randomPosts/RandomPosts";
import Notiflix, { Loading } from "notiflix";

export const Posts = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const getLatestPosts = [...posts].slice(-4);
  const latestPosts = [...getLatestPosts].reverse();
  const [loading, setLoading] = useState(false);

  //FETCH POSTS FROM DB
  useEffect(() => {
    setLoading(true);
    try {
      fetch("https://storyhub-api.onrender.com/api/posts/")
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

  //dispatch posts to store
  posts.length !== 0 && dispatch(STORE_POSTS(posts));

  const randomPosts = posts
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  //shuffle posts
  // const shuffleArray = (array) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     let temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // };

  // const shufflePosts = shuffleArray(posts.slice());

  return (
    <>
      <div className="posts md:mx-[3rem] lg:mx-[4rem]">
        {loading ? (
          Notiflix.Loading.circle("Fetching data. Please wait...", {
            svgColor: "#eb0202",
            backgroundColor: "rgba(0,0,0,0.5)",
          })
        ) : (
          <>
            {Loading.remove()}
            <Slider />
            <RandomPosts randomPosts={randomPosts} />
            <LatestPosts latestPosts={latestPosts} />
            <AllPosts posts={posts} />
          </>
        )}
      </div>
    </>
  );
};
