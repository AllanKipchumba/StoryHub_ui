import React from "react";
import "./write.scss";
import write from "./assets/write.svg";

export const Write = () => {
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="write max-w-[1240px] flex-col p-4 mx-auto grid md:grid-cols-5 gap-10">
        <div className="intro sm:ml-[50px] col-span-2 flex sm:flex-row md:flex-col ">
          <div>
            <h1 className="font-bold">
              Welcome <span className="capitalize text-[#ff0581]">foo</span>
            </h1>
            <p className="mt-2 mb-4">Create and publish your posts here</p>
          </div>
          <img
            src={write}
            alt="/"
            className="w-[50%] md:w-[100%] md:mt-[40px]"
          />
        </div>

        <form onSubmit={submitForm} className="col-span-3">
          <label>Title</label>
          <input type="text" Placeholder="Post Title" className="input" />

          <label>Category</label>
          <select placeholder="Choose Category" className="input">
            <option value="social">Social</option>
            <option value="news">News</option>
            <option value="politics">Politics</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="philosophy">Philosophy</option>
          </select>

          <label>Content</label>
          <textarea
            placeholder="Write your content here"
            rows="15"
            cols="60"
            className="input"
          ></textarea>

          <button type="submit">Publish</button>
        </form>
      </div>
    </>
  );
};
