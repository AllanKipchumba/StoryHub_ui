import React, { useEffect, useState } from "react";
import "./posts.scss";
import { Post } from "./post/Post";

export const Posts = ({ posts }) => {
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  useEffect(() => {
    if (!category) {
    } else {
      try {
        window.location.replace(`/?cat=${category}`);
      } catch (error) {
        window.location.replace("/");
      }
    }
  }, [category]);

  return (
    <>
      <div className="posts">
        <div className="mx-auto grid grid-cols-2 md:grid-cols-3">
          <h1 className="md:px-16 font-bold tracking-[2.72px] text-[16px] capitalize">
            <span>latest</span> stories
          </h1>
          <div className="input" id="category">
            <select onChange={handleChange}>
              <option>select category</option>
              <option value="education">Education</option>
              <option value="news">News</option>
              <option value="health">Health</option>
              <option value="engineering">Engineering</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className=" py-3 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      </div>
    </>
  );
};
