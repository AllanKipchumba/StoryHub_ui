import React from "react";
import { useState } from "react";
import { Header } from "../../components/header/Header";
import { Posts } from "../../components/posts/Posts";
import "./home.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { loadingStart, loadingStop } from "../../Redux/slices/loginSlice";

const override = {
  display: "block",
  margin: "0 auto",
};

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { loading } = useSelector((store) => store["logIn"]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingStart());
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
      dispatch(loadingStop());
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <div>
        <Header />

        {loading ? (
          <ClipLoader
            loading={loading}
            color="#ff0581"
            margin={4}
            size={80}
            cssOverride={override}
          />
        ) : (
          <Posts posts={posts} />
        )}
      </div>
    </>
  );
};
