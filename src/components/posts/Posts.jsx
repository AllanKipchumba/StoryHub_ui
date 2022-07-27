import React from "react";
import "./posts.scss";
import { Post } from "./post/Post";

export const Posts = ({ posts }) => {
  return (
    <>
      <div className="posts">
        <h1 className="md:px-16 font-bold tracking-[2.72px] text-[16px] capitalize">
          <span>latest</span> stories
        </h1>

        <div className=" py-3 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
    </>
  );
};
