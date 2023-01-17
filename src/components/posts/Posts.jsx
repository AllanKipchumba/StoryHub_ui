import React, { useEffect, useState } from "react";
import "./posts.scss";
import { useSelector, useDispatch } from "react-redux";
import { loadingStart, loadingStop } from "../../Redux/slices/loginSlice";
import MoonLoader from "react-spinners/MoonLoader";
import { STORE_POSTS } from "../../Redux/slices/postSlice";
import { LatestPosts } from "./latestPosts/LatestPosts";
import { AllPosts } from "./AllPosts";
import { Slider } from "./slider/Slider";
import { RandomPosts } from "./randomPosts/RandomPosts";

const override = {
  display: "block",
  margin: "0 auto",
};

export const Posts = () => {
  const { loading } = useSelector((store) => store["logIn"]);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  const getLatestPosts = [...posts].slice(-4);
  const latestPosts = [...getLatestPosts].reverse();

  //FETCH POSTS FROM DB
  useEffect(() => {
    dispatch(loadingStart());
    try {
      fetch("http://localhost:5000/api/posts/")
        .then((response) => response.json())
        .then((data) => {
          setPosts(data);
          dispatch(loadingStop());
        });
    } catch (error) {
      console.log(error);
      dispatch(loadingStop());
    }
  }, [dispatch]);

  //dispatch posts to store
  posts.length !== 0 && dispatch(STORE_POSTS(posts));

  return (
    <>
      <div className="posts md:mx-[3rem] lg:mx-[4rem]">
        {loading ? (
          <MoonLoader
            loading={loading}
            color="#ff0581"
            margin={4}
            size={40}
            cssOverride={override}
          />
        ) : (
          <>
            <Slider />
            <RandomPosts />
            <LatestPosts latestPosts={latestPosts} />
            <AllPosts posts={posts} />
          </>
        )}
      </div>
    </>
  );
};
