import React, { useEffect, useState } from "react";
import "./posts.scss";
import { Post } from "./post/Post";
import { useSelector, useDispatch } from "react-redux";
import { loadingStart, loadingStop } from "../../Redux/slices/loginSlice";
import MoonLoader from "react-spinners/MoonLoader";
import { useLocation } from "react-router-dom";
import axios from "axios";

const override = {
  display: "block",
  margin: "0 auto",
};

export const Posts = () => {
  const [category, setCategory] = useState("");
  const { loading } = useSelector((store) => store["logIn"]);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [getPosts, setPosts] = useState([]);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    if (!category) {
    } else {
      try {
        window.location.replace(`/?cat=${category}`);
      } catch (error) {
        console.log(error);
      }
    }
  }, [category]);

  useEffect(() => {
    dispatch(loadingStart());
    // console.log(search);
    try {
      const fetchPosts = async () => {
        const res = await axios.get(
          "http://localhost:5000/api/posts/" + search
        );
        setPosts(res.data);
        dispatch(loadingStop());
      };
      fetchPosts();
    } catch (error) {
      console.log(error);
      dispatch(loadingStop());
    }
  }, [search]);

  return (
    <>
      <div className="posts">
        {loading ? (
          <MoonLoader
            loading={loading}
            color="#ff0581"
            margin={4}
            size={40}
            cssOverride={override}
          />
        ) : (
          <>
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
              {getPosts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
