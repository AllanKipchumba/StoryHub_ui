import React, { useEffect, useState } from "react";
import "./posts.scss";
import { Post } from "./post/Post";
import { useSelector, useDispatch } from "react-redux";
import { loadingStart, loadingStop } from "../../Redux/slices/loginSlice";
import MoonLoader from "react-spinners/MoonLoader";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const override = {
  display: "block",
  margin: "0 auto",
};

export const Posts = () => {
  const { loading } = useSelector((store) => store["logIn"]);
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);

  //FETCH POSTS FROM DB
  useEffect(() => {
    dispatch(loadingStart());
    // console.log(search);
    try {
      const fetchPosts = async () => {
        const res = await axios.get(
          "https://allan-storyhub-api.herokuapp.com/api/posts/" + search
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
            </div>

            <div className=" py-3 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>

            {/* PAGINATION */}
            <div className="pagination flex">
              <div className=" mx-auto flex">
                <div className="flex gap-2">
                  {skip > 0 && (
                    <>
                      <GrLinkPrevious className="icon" />
                      <button
                        className="mr-10"
                        onClick={() => setSkip(skip - 1)}
                      >
                        <Link to={`/?skip=${skip}`}>Previous</Link>
                      </button>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSkip(skip + 1)}>
                    <Link to={`/?skip=${skip}`}>Next</Link>
                  </button>
                  <GrLinkNext className="icon" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
