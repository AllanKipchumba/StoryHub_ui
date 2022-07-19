import React from "react";
import "./posts.scss";
import { Post } from "./post/Post";

export const Posts = () => {
  return (
    <>
      <div className="posts">
        <h1 className="md:px-16">
          <span>latest</span> stories
        </h1>

        <div className="py-5">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </>
  );
};
