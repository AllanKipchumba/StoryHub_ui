import React from "react";
import "./posts.scss";
import { Post } from "./post/Post";

export const Posts = () => {
  return (
    <>
      <div className="posts">
        <h1>
          <span>latest</span> stories
        </h1>

        <div className="py-5">
          <Post />
        </div>
      </div>
    </>
  );
};
