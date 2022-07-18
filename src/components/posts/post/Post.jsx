import React from "react";
import "./post.scss";

export const Post = () => {
  return (
    <>
      <div className="post grid">
        <h1 className="capitalize md:text-4xl sm:text-3xl text-2xl md:mx-0 py-2">
          a peek into scandavia's origin
        </h1>
        <p>
          Steve Holt! No, I did not kill Kitty. However, I am going to oblige
          and answer the nice officer’s questions because I am an honest man
          with no secrets to hide. I don’t criticize you! And if you’re worried
          about criticism, sometimes a diet is the best defense.
        </p>

        <a>Read More</a>
      </div>
    </>
  );
};
