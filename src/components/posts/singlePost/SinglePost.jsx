import React from "react";
import "./singlepost.scss";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loadingStart, loadingStop } from "../../../Redux/slices/loginSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineDelete } from "react-icons/md";

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
  const [hover, setHover] = useState(false);
  const [addComment, setAddComment] = useState(false);
  //access post id
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  //   FETCH POST BY ID
  useEffect(() => {
    dispatch(loadingStart());
    const fetchPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data.post);
      setAuthor(res.data.postOwner);
      dispatch(loadingStop());
    };
    fetchPost();
  }, [dispatch, path]);

  // REFACTOR TO USE NOTIFLIX
  // DELETE POST
  const deletePost = async () => {
    try {
      // alert user to delete
      //USE NOIFLIX
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

  // UPDATE POST
  const updatePost = async () => {
    const updates = {
      title,
      description,
    };
    //alert user to update post
    // REFACTOR TO USE NOTIFLIX
    try {
      if (window.confirm("Update Post")) {
        await axios.patch("http://localhost:5000/api/posts/" + path, updates, {
          headers,
        });
        setUpdateMode(false);
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //LIKE POST
  const [likes, setLikes] = useState([]);
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
      // toast error message from server
      toast(error.response.data);
    }
  };

  //GET LIKES ON POST
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
        console.log(error);
      }
    };
    getLikesOnPost();
  });

  //COMMENT POST
  //'commented' state to trigger a re-render of get comments on post
  const [commented, setCommented] = useState(false);
  const [comment, setComment] = useState("");
  const commentPost = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: `http://localhost:5000/api/post/comment/${path}`,
        data: { comment },
        headers: headers,
      });
      //trigger a re-render on get comments when a new comment is made
      setCommented(!commented);
      toast("Commented post");
      setAddComment(!addComment);
    } catch (error) {
      console.log(error);
    }
  };

  //GET COMMENTS ON POST
  const [commentsOnPost, setCommentsOnPost] = useState();
  const [hasComments, setHasComments] = useState();
  const [numberOfComments, setNumberOfComments] = useState();
  // hook rendered when the page loads and when a new comment is made
  useEffect(() => {
    const getCommentsOnPost = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:5000/api/post/comment/${path}`,
          headers: headers,
        });

        //query if the posts has comments
        res.data.length !== 0 ? setHasComments(true) : setHasComments(false);

        setCommentsOnPost(res.data);
        setNumberOfComments(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getCommentsOnPost();
  }, [commented]);

  //LIKE COMMENT
  const likeComment = async (commentID) => {
    try {
      await axios({
        method: "put",
        url: `http://localhost:5000/api/post/comment/${commentID}/like`,
        data: {},
        headers: headers,
      });
    } catch (error) {
      //toastify error message
      toast(error.response.data);
    }
  };

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
        <div className="singlepost rounded-3xl !mx-auto md:max-w-[80%]">
          <div className={`image`}>
            <img src={post.imageURL} alt={post.title} className={`img`} />
          </div>
          <div className={`post-title mx-auto text-center`}>
            <div className="flex gap-4">
              {/* FOR OPTIMISATION */}
              {/* SHOW IF UPDATEMODE*/}
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
                  <h1 className="font-semibold uppercase">{post.title}</h1>
                  {/* display edit and delete icons if the logged in user is the post owner */}

                  {/* SHOW IF AUTHOR */}
                  {author === user?.user.username && (
                    <div className="flex gap-3">
                      <FiEdit
                        className="icon"
                        onClick={() => setUpdateMode(true)}
                      />
                      <MdDeleteOutline className="icon" onClick={deletePost} />
                    </div>
                  )}
                </>
              )}
            </div>

            <div>
              {/* AUTHOR */}
              <Link to={`/?author=${author}`}>
                <p>
                  By: &nbsp;
                  <span className="font-bold capitalize text-[#ff0581]">
                    {author}
                  </span>
                </p>
              </Link>

              <p className=" text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* SOW IF UPDATEMODE */}
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
              <div className="description">{post.description}</div>
              <div>
                {/* LIKE AND COMMENT ICONS */}
                {/* display like and comment icons */}
                <div className="mt-6 flex gap-5">
                  <div className="flex gap-1">
                    {/*  LIKE POST */}
                    <AiOutlineLike
                      className="icon icons-LC"
                      onClick={() => {
                        likePost();
                      }}
                    />
                    {/* display number of likes */}
                    {likes !== 0 && <p>{likes}</p>}

                    {/* Notify user that they have liked the posts already */}
                    <ToastContainer autoClose={2000} hideProgressBar={true} />
                  </div>

                  <div className="flex gap-1">
                    <FaRegComment
                      className="icon icons-LC"
                      onClick={() => setAddComment(!addComment)}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    />
                    {/* Show Number of comments */}
                    {numberOfComments !== 0 && <p>{numberOfComments}</p>}
                  </div>

                  {/* display tool tip conditionally */}
                  {hover && !addComment && (
                    <p className="italic text-sm font-semi-bold">
                      Click to add comment.
                    </p>
                  )}
                  {addComment && hover && (
                    <p className="italic text-sm font-semi-bold">
                      Click to close.
                    </p>
                  )}
                </div>

                {/*COMMENT POST  */}
                {/* SHOW IF ADDCOMMENT */}
                {addComment && (
                  <div className="mt-14 w-[80%] ">
                    <form onSubmit={commentPost}>
                      <textarea
                        placeholder="Add comment..."
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

                {/*DISPLAY COMMENTS */}
                {/* SHOW IF HAD COMMENTS */}
                {hasComments && (
                  <>
                    <div className="comments-container p-10 mt-10 lg:max-w-[70%] mx-auto">
                      <p className="text-center font-bold tracking-[2px]">
                        {numberOfComments === 1 ? (
                          <p>1 comment</p>
                        ) : (
                          <p>{numberOfComments} comments</p>
                        )}
                      </p>

                      {/*Map through all the comments */}
                      {commentsOnPost?.map((comment, index) => {
                        return (
                          <div key={index} className="mt-5 comments">
                            <div key={comment._id} className="comment">
                              <div className=" mb-2 text-[#ff0581] flex justify-start gap-3">
                                <p className="capitalize text-sm font-semibold">
                                  {comment.authorName}
                                </p>
                                <p className="text-xs italic">
                                  {new Date(comment.createdAt).toLocaleString()}
                                </p>
                              </div>
                              <hr />
                              <p className="align-justify">{comment.comment}</p>
                              <div className="mt-2 flex gap-2">
                                {/* LIKE COMMENT  */}
                                <AiOutlineLike
                                  className="icon icons-LC"
                                  onClick={() => {
                                    likeComment(comment._id);
                                    //trigger a re-render on getComments on post to update the new like
                                    setCommented(!commented);
                                  }}
                                />

                                {/* display number of likes on comment */}
                                {comment.likes.length !== 0 && (
                                  <p>{comment.likes.length}</p>
                                )}

                                {/* delete comment if you are author */}
                                {comment.authorName === user?.user.username && (
                                  <MdOutlineDelete
                                    className="icon icons-LC"
                                    onClick={async () => {
                                      //DELETE COMMENT
                                      try {
                                        //Alert user that they are about to delete comment
                                        // USE NOTIFLIX
                                        if (window.confirm("Delete comment?")) {
                                          await axios({
                                            method: "delete",
                                            url: `http://localhost:5000/api/post/comment/${comment._id}`,
                                            headers: headers,
                                          });
                                          //trigger a re-render on get comments
                                          setCommented(!commented);
                                          //toastify deletion
                                          toast("Deleted comment");
                                        } else {
                                          return false;
                                        }
                                      } catch (error) {
                                        console.log(error);
                                      }
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
