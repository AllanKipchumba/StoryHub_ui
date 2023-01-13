import React from "react";
import { Post } from "./post/Post";

export const LatestPosts = ({ latestPosts }) => {
  return (
    <div>
      <div className="mx-auto mt-3 grid grid-cols-2 md:grid-cols-3">
        <h1 className=" font-bold tracking-[2.72px] text-[16px] capitalize">
          Latest Posts
        </h1>
      </div>

      <div className=" py-3 m-auto grid grid-cols-2 md:grid-cols-3 gap-10">
        {latestPosts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};
