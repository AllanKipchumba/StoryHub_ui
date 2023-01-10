import React, { useState } from "react";
import "./write.scss";
import write from "./assets/write.svg";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { loadingStart, loadingStop } from "../../Redux/slices/loginSlice";

export const Write = () => {
  const { user, loading } = useSelector((store) => store["logIn"]);
  const author = user.user.username;
  const token = user.token;
  const headers = { Authorization: `Bearer ${token}` };
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch(loadingStart());

    const newPost = {
      title,
      description,
    };
    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/posts/",
        data: newPost,
        headers: headers,
      });
      dispatch(loadingStop());
      // change route to read new post
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="write max-w-[1240px] flex-col p-4 mx-auto grid md:grid-cols-5 gap-10">
        <div className="intro sm:ml-[50px] col-span-2 flex sm:flex-row md:flex-col ">
          <div>
            <h1 className="font-bold">
              Welcome <span className="uppercase text-[#ff0581]">{author}</span>
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
          <input
            type="text"
            Placeholder="Post Title"
            className="input"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Content</label>
          <textarea
            placeholder="Write your content here"
            rows="15"
            cols="60"
            className="input"
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <button type="submit">
            {loading ? (
              <BeatLoader loading={loading} color="#fff" margin={4} size={17} />
            ) : (
              `Publish`
            )}
          </button>
        </form>
      </div>
    </>
  );
};
