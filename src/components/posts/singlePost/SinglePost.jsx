import React, { useMemo } from "react";
import "./singlepost.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { RenderBody } from "./RenderBody";
import { STORE_POST } from "../../../Redux/slices/postDetailsSlice";
import { Timestamp } from "../Timestamp";
import { SimilarPosts } from "./similarPosts/SimilarPosts";

//custom css for cliploader animation
const override = {
  display: "block",
  margin: "0 auto",
};

export const SinglePost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((store) => store["logIn"]);
  const email = user.user.email;
  const loggedinUser = email.substring(0, email.indexOf("@"));
  const token = user.token;
  const headers = useMemo(() => {
    const headers = { Authorization: `Bearer ${token}` };
    return headers;
  }, [token]);
  const { posts } = useSelector((store) => ["posts"]);
  console.log(posts);

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
        <ClipLoader
          className="loader"
          loading={loading}
          color="#ff0581"
          margin={4}
          size={50}
          cssOverride={override}
        />
      ) : (
        <>
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
              description={post.description}
              post={post}
              loggedinUser={loggedinUser}
            />
          </div>

          <SimilarPosts />
        </>
      )}
    </>
  );
};
