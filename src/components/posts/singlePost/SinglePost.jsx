import React, { useMemo } from "react";
import "./singlepost.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { RenderBody } from "./RenderBody";
import { STORE_POST } from "../../../Redux/slices/postDetailsSlice";
import { Timestamp } from "../Timestamp";
import { SimilarPosts } from "./similarPosts/SimilarPosts";
import Notiflix, { Loading } from "notiflix";

export const SinglePost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((store) => store["auth"]);
  const email = user.user.email;
  const loggedinUser = email.substring(0, email.indexOf("@"));
  const token = user.token;
  const headers = useMemo(() => {
    const headers = { Authorization: `Bearer ${token}` };
    return headers;
  }, [token]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState("");

  //   FETCH A POST BY ID
  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      const res = await axios({
        method: "get",
        url: `http://localhost:5000/api/posts/${id}`,
      });
      setPost(res.data.post);
      setAuthor(res.data.postOwner);
      setLoading(false);
    };
    fetchPost();
  }, [dispatch, id]);

  dispatch(STORE_POST(post));

  return (
    <>
      {loading ? (
        Notiflix.Loading.circle("Fetching data. Please wait...", {
          svgColor: "#eb0202",
          backgroundColor: "rgba(0,0,0,0.85)",
        })
      ) : (
        <>
          {Loading.remove()}
          <div className="singlepost ">
            <div className="headline">
              <img src={post.imageURL} alt={post.title} className="img" />

              <div className={`post-title `}>
                <h1>{post.title}</h1>
                <div>
                  <Link to={`/?author=${author}`}>
                    <p>
                      By: &nbsp;
                      <span className="font-bold capitalize text-[#eb0202]">
                        {author}
                      </span>
                    </p>
                  </Link>

                  <Timestamp createdAt={post.createdAt} />
                </div>
              </div>
            </div>

            <RenderBody
              headers={headers}
              id={id}
              author={author}
              post={post}
              loggedinUser={loggedinUser}
            />
          </div>

          <SimilarPosts category={post.category} id={id} />
        </>
      )}
    </>
  );
};
