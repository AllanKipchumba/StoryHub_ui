import React, { useMemo, useEffect, useState } from "react";
import "./singlepost.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RenderBody } from "./RenderBody";
import { SAVE_URL, STORE_POST } from "../../../Redux/slices/postDetailsSlice";
import { Timestamp } from "../Timestamp";
import { SimilarPosts } from "./similarPosts/SimilarPosts";
import Notiflix, { Loading } from "notiflix";

export const SinglePost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((store) => store["auth"]);
  let email;
  let loggedinUser;
  let token;
  if (user) {
    email = user.user.email;
    loggedinUser = email.substring(0, email.indexOf("@"));
    token = user.token;
  }
  const headers = useMemo(() => {
    if (user) {
      const headers = { Authorization: `Bearer ${token}` };
      return headers;
    }
  }, [token, user]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState("");

  //   FETCH A POST BY ID
  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      const res = await axios({
        method: "get",
        url: `https://storyhub-api.onrender.com/api/posts/${id}`,
      });
      setPost(res.data.post);
      setAuthor(res.data.postOwner);
      setLoading(false);
      dispatch(SAVE_URL(""));
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
                  <p>
                    By: &nbsp;
                    <span className="font-bold capitalize text-[#eb0202]">
                      {author}
                    </span>
                  </p>
                  <Timestamp createdAt={post.createdAt} />
                </div>
              </div>
            </div>

            <RenderBody
              headers={headers}
              id={id}
              author={author}
              post={post}
              b
              loggedinUser={loggedinUser}
            />
          </div>

          <SimilarPosts category={post.category} id={id} />
        </>
      )}
    </>
  );
};
