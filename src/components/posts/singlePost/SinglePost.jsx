import React from "react";
import "./singlepost.scss";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const SinglePost = () => {
  const { user } = useSelector((store) => store["logIn"]);
  const token = user.token;
  const headers = { Authorization: `Bearer ${token}` };
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState("");

  //   update mode
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();

  //access post id
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data.post);
      setAuthor(res.data.postOwner);
    };
    fetchPost();
  }, [path]);
  return (
    <>
      <div className="singlepost">
        <div>
          <h1>{post.title}</h1>
          <div>
            <p>Author: {author}</p>
            <p>{new Date(post.createdAt).toDateString()}</p>
          </div>
        </div>
        <div>{post.description}</div>
      </div>
    </>
  );
};
