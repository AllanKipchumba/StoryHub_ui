import React from "react";
import { useState } from "react";
import { Header } from "../../components/header/Header";
import { Posts } from "../../components/posts/Posts";
import "./home.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      // console.log(res.data);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <div>
        <Header />
        <Posts posts={posts} />
      </div>
    </>
  );
};
