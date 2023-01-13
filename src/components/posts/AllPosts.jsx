import React from "react";
import { Post } from "./post/Post";

export const AllPosts = ({ posts }) => {
  return (
    <div>
      <div className="mx-auto mt-3 grid grid-cols-2 md:grid-cols-3">
        <h1 className=" font-bold tracking-[2.72px] text-[16px] capitalize">
          All Posts
        </h1>
      </div>

      <div className=" py-3 m-auto grid grid-cols-2 md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>

      {/* PAGINATION */}
    </div>
  );
};
