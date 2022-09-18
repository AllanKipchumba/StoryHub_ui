import React from "react";
import "./singlepost.scss";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Link } from "react-router-dom";
import axios from "axios";
import { loadingStart, loadingStop } from "../../../Redux/slices/loginSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//custom css for cliploader animation
const override = {
  display: "block",
  margin: "0 auto",
};

export const SinglePost = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store["logIn"]);
  const token = user.token;
  const headers = { Authorization: `Bearer ${token}` };
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [tooltip, hideTooltip] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [comment, setComment] = useState("");
  const [commentForm, setCommentForm] = useState(false);
  const [likes, setLikes] = useState([]);
  //for react toastify
  const [errorMessage, setErrorMessage] = useState("");
  //access post id
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  //   get individual posts by id
  useEffect(() => {
    dispatch(loadingStart());
    const fetchPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data.post);
      setAuthor(res.data.postOwner);
      dispatch(loadingStop());
    };
    fetchPost();
  }, []);

  // delete post
  const deletePost = async () => {
    try {
      // alert user to delete
      if (window.confirm(`Delete ${post.title}?`)) {
        // send Bearer tokens along with axios
        await axios.delete("http://localhost:5000/api/posts/" + path, {
          headers,
        });
        window.location.replace("/");
      } else {
        return false;
      }
      // redirect to home page
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  // update Post
  const updatePost = async () => {
    const updates = {
      title,
      description,
    };
    //alert user to update post
    try {
      if (window.confirm("Update Post")) {
        const res = await axios.patch(
          "http://localhost:5000/api/posts/" + path,
          updates,
          { headers }
        );
        setUpdateMode(false);
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //change bgColor of like icon onClick
  const changeBgColor = () => {
    // toggle
    setIsActive((current) => !current);
  };

  //like post
  const likePost = async () => {
    try {
      const res = await axios({
        method: "put",
        url: `http://localhost:5000/api/post/${path}/like`,
        headers: headers,
        data: {},
      });
      //record new like to update the number of likes on post
      setLikes(res.data.likes.length);
    } catch (error) {
      // get error message from server
      console.log(error.response.data);

      setErrorMessage(error.response.data);
      toast(errorMessage);

      //get http status code
      console.log(error.response.status);
    }
  };

  //get likes on a post
  useEffect(() => {
    const getLikesOnPost = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:5000/api/post/${path}/likes`,
          headers: headers,
        });
        //record the number of likes on the post
        setLikes(res.data);
      } catch (error) {
        console.log(error.response.data);
        // get error message from server
        console.log(error.response.data);
        //get http status code
        console.log(error.response.status);
      }
    };
    getLikesOnPost();
  }, [likes]);

  //comment post
  const commentPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:5000/api/post/comment/${path}`,
        data: { comment },
        headers: headers,
      });

      console.log(res.data.comment);
      toast("Commented post");
      setCommentForm(!commentForm);
    } catch (error) {
      console.log(error);
    }
  };

  //get comments on a post
  useEffect(() => {
    const getCommentsOnPost = async () => {
      const res = await axios({
        method: "get",
        url: `http://localhost:5000/api/post/comment/${path}`,
      });
    };
    getCommentsOnPost();
  }, []);

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
        <div className="singlepost !mx-auto md:max-w-[70%]">
          <div>
            <div className="flex gap-4">
              {updateMode ? (
                <>
                  <input
                    type="text"
                    placeholder={`Edit title: ${post.title}`}
                    value={title}
                    className="input"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <h1 className="font-semibold mb-3 uppercase">{post.title}</h1>
                  {/* display edit and delete icons if the logged in user is the post owner */}
                  {author === user?.user.username && (
                    <div className="flex gap-3">
                      <FiEdit
                        className="icon"
                        onClick={() => setUpdateMode(true)}
                        data-tip
                        data-for="editPost"
                        onMouseEnter={() => hideTooltip(true)}
                        onMouseLeave={() => {
                          hideTooltip(false);
                          setTimeout(() => hideTooltip(true), 50);
                        }}
                      />
                      <MdDeleteOutline
                        className="icon"
                        onClick={deletePost}
                        // tooltip props
                        data-tip
                        data-for="deletePost"
                        onMouseEnter={() => hideTooltip(true)}
                        onMouseLeave={() => {
                          hideTooltip(false);
                          setTimeout(() => hideTooltip(true), 50);
                        }}
                      />
                      {/* tooltip to display text on mouse over delete and edit icons */}
                      {tooltip && (
                        <ReactTooltip
                          id="deletePost"
                          place="top"
                          effect="solid"
                        >
                          Delete post
                        </ReactTooltip>
                      )}

                      {tooltip && (
                        <ReactTooltip id="editPost" place="top" effect="solid">
                          Edit post
                        </ReactTooltip>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-2 text-[#ff0581]">
              <Link to={`/?author=${author}`}>
                <p
                  // tooltip props
                  data-tip
                  data-for="showAuthorPosts"
                  onMouseEnter={() => hideTooltip(true)}
                  onMouseLeave={() => {
                    hideTooltip(false);
                    setTimeout(() => hideTooltip(true), 50);
                  }}
                >
                  Posted by {author},
                </p>
              </Link>

              {tooltip && (
                <ReactTooltip id="showAuthorPosts" place="top" effect="solid">
                  Show all posts by {author}
                </ReactTooltip>
              )}

              <p> {new Date(post.createdAt).toDateString()}</p>
            </div>
          </div>

          {updateMode ? (
            <>
              <textarea
                className="input"
                placeholder="Edit post body"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="7"
                cols="50"
              />
              {/* edit button */}
              <div className="mt-10">
                <button onClick={updatePost} className="edit-btn">
                  Update
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3">
              <div>{post.description}</div>

              <div>
                {/* display like and comment icons */}
                <div className="mt-6 flex gap-5">
                  <div className="flex gap-1">
                    {/*  LIKE POST */}
                    <AiOutlineLike
                      className="icon icons-LC"
                      onClick={() => {
                        changeBgColor();
                        likePost();
                      }}
                      //change icon color on click
                      style={{ color: isActive && "#D10068" }}
                    />
                    {/* display post likes */}
                    <p>{likes}</p>

                    {/* Notify user that they have liked the posts already */}
                    <ToastContainer />
                  </div>
                  <div>
                    <FaRegComment
                      className="icon icons-LC"
                      onClick={() => setCommentForm(!commentForm)}
                    />
                  </div>
                </div>

                {/*COMMENT POST  */}
                {commentForm && (
                  <div className="mt-4 w-[80%] ml-8">
                    <form onSubmit={commentPost}>
                      <label className="text-[grey]">Write comment</label>
                      <textarea
                        placeholder="comment"
                        rows="3"
                        cols="8"
                        className="input"
                        onChange={(e) => setComment(e.target.value)}
                        required
                      />
                      <button className="comment-btn" type="submit">
                        Comment
                      </button>
                    </form>
                  </div>
                )}

                {/* display comments on the post */}
                <div className="mt-10">
                  <div>
                    <p>username</p>
                    <p>time</p>
                  </div>
                  <p>comment</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
