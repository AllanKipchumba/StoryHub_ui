import React from "react";
import "./posts.scss";
import { Post } from "./post/Post";

export const Posts = ({ posts }) => {
  return (
    <>
      <div className="posts">
        <h1 className="md:px-16">
          <span>latest</span> stories
        </h1>

        <div className="py-5">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
    </>
  );
};
