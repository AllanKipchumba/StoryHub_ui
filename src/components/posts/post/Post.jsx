import React from "react";
import "./post.scss";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  return (
    <>
      <div className="post max-w-[1240px] mx-auto flex">
        <div>
          <div>
            <h1 className="capitalize text-2xl py-2">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h1>
            {/* access post's timestamp */}
            <p className="mb-3">{new Date(post.createdAt).toDateString()}</p>
          </div>
          <p className="text-[#292929]">{post.description}</p>
        </div>
      </div>
    </>
  );
};
