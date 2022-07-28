import React from "react";
import { Header } from "../../components/header/Header";
import { Posts } from "../../components/posts/Posts";
import "./home.scss";

export const Home = () => {
  return (
    <div>
      <Header />
      <Posts />
    </div>
  );
};
