import React from "react";
import "./post.scss";
import postImage from "./assets/blog-post.svg";

export const Post = () => {
  return (
    <>
      <div className="post max-w-[1240px] mx-auto grid md:grid-cols-3 gap-2">
        <div>
          <img
            src={postImage}
            alt="/"
            className="image w-[200px] mx-auto my-4"
          />
        </div>

        <div className="flex flex-col justify-center md:col-span-2">
          <h1 className="capitalize md:text-4xl sm:text-3xl text-2xl md:mx-0 py-2">
            a peek into scandavia's origin
          </h1>
          <p className="text-[#292929]">
            Steve Holt! No, I did not kill Kitty. However, I am going to oblige
            and answer the nice officer’s questions because I am an honest man
            with no secrets to hide. I don’t criticize you! And if you’re
            worried about criticism, sometimes a diet is the best defense.
          </p>

          <a>Read More</a>
        </div>
      </div>
    </>
  );
};
