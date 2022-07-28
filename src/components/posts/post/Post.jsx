import React from "react";
import "./post.scss";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
  return (
    <>
      <div className="post mt-4 max-w-[1240px]">
        <div>
          <div>
            <h1 className="capitalize font-medium">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </h1>

            <p className="mb-3 mt-3 italic font-light">
              {new Date(post.createdAt).toDateString()}
            </p>
          </div>

          <button>
            <Link to={`/post/${post._id}`}>Read More</Link>
          </button>
        </div>
      </div>
    </>
  );
};
