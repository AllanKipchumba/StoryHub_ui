import React from "react";
import "./singlepost.scss";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { loadingStart, loadingStop } from "../../../Redux/slices/loginSlice";
import ClipLoader from "react-spinners/ClipLoader";

import { RenderTitleConditionally } from "./RenderTitleConditionally";
import { RenderBodyConditionally } from "./RenderBodyConditionally";
import { toast } from "react-toastify";

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
  const [addComment, setAddComment] = useState(false);
  //access post id
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  //get name of the logged in user
  const email = user.user.email;
  const loggedinUser = email.substring(0, email.indexOf("@"));

  //receive comment._id from child
  const [commentID, setCommentID] = useState("");
  const handleDataFromChild = (childData) => {
    setCommentID(childData);
  };

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
      toast.error(error.response.data);
    }
  };

  const deleteComment = async () => {
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
          <div className="image">
            <img src={post.imageURL} alt={post.title} className="img" />
          </div>
          <div className={`post-title mx-auto text-center`}>
            <div className="flex gap-4">
              <RenderTitleConditionally
                updateMode={updateMode}
                title={post.title}
                loggedinUser={loggedinUser}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
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

          <RenderBodyConditionally
            author={author}
            updateMode={updateMode}
            description={description}
            changeDescription={(e) => setDescription(e.target.value)}
            updatePost={updatePost}
            post={post}
            likePost={() => {
              likePost();
            }}
            likes={likes}
            showAddcommentForm={() => setAddComment(!addComment)}
            numberOfComments={numberOfComments}
            addComment={addComment}
            commentPost={commentPost}
            setComment={(e) => setComment(e.target.value)}
            hasComments={hasComments}
            commentsOnPost={commentsOnPost}
            likeComment={() => {
              likeComment(commentID);
              //trigger a re-render on getComments on post to update the new like
              setCommented(!commented);
            }}
            deleteComment={deleteComment}
            handleData={handleDataFromChild}
            cancelUpdate={() => setUpdateMode(false)}
            loggedinUser={loggedinUser}
            editPost={() => setUpdateMode(true)}
            deletePost={deletePost}
          />
        </div>
      )}
    </>
  );
};
