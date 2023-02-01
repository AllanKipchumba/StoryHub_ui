import React, { useMemo } from "react";
import "./singlepost.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { RenderBody } from "./RenderBody";
import { toast } from "react-toastify";
import { STORE_POST } from "../../../Redux/slices/postDetailsSlice";
import Notiflix from "notiflix";
import { Timestamp } from "../Timestamp";
// import Shimmer from 'react-shimmer'

//custom css for cliploader animation
const override = {
  display: "block",
  margin: "0 auto",
};

export const SinglePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((store) => store["logIn"]);
  const email = user.user.email;
  const loggedinUser = email.substring(0, email.indexOf("@"));
  const token = user.token;
  const headers = useMemo(() => {
    const headers = { Authorization: `Bearer ${token}` };
    return headers;
  }, [token]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState([]);
  const [author, setAuthor] = useState("");
  const [addComment, setAddComment] = useState(false);
  const [commentID, setCommentID] = useState("");
  const [commentsOnPost, setCommentsOnPost] = useState();
  const [hasComments, setHasComments] = useState();
  const [numberOfComments, setNumberOfComments] = useState();
  const [commented, setCommented] = useState(false);
  const [comment, setComment] = useState("");
  const receiveComment_id = (childData) => {
    setCommentID(childData);
  };

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

  //LIKE A POST
  const likePost = async () => {
    try {
      const res = await axios({
        method: "put",
        url: `http://localhost:5000/api/post/${id}/like`,
        headers: headers,
        data: {},
      });
      setLikes(res.data.likes.length);
    } catch (error) {
      toast(error.response.data);
    }
  };

  //GET THE NUMBER OF LIKES ON A POST
  useEffect(() => {
    const getLikesOnPost = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:5000/api/post/${id}/likes`,
          headers: headers,
        });
        setLikes(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLikesOnPost();
  });

  //COMMENT POST
  const commentPost = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "post",
        url: `http://localhost:5000/api/post/comment/${id}`,
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

  //GET THE COMMENTS ON A POST
  useEffect(() => {
    const getCommentsOnPost = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:5000/api/post/comment/${id}`,
          headers: headers,
        });
        res.data.length !== 0 ? setHasComments(true) : setHasComments(false);
        setCommentsOnPost(res.data);
        setNumberOfComments(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getCommentsOnPost();
  }, [commented, id, headers]);

  //LIKE A COMMENT
  const likeComment = async (commentID) => {
    try {
      await axios({
        method: "put",
        url: `http://localhost:5000/api/post/comment/${commentID}/like`,
        data: {},
        headers: headers,
      });
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  //DELETE A COMMENT
  const deleteComment = async () => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:5000/api/post/comment/${commentID}`,
        headers: headers,
      });
      //trigger a re-render on get comments on a post
      setCommented(!commented);
    } catch (error) {
      console.log(error);
    }
  };

  const confirmDeleteComment = () => {
    Notiflix.Confirm.show(
      "Delete Comment!!!",
      `You are about to delete this comment`,
      "Delete",
      "Cancel",
      function okCb() {
        deleteComment();
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "#eb0202",
        okButtonBackground: "#eb0202",
        cssAnimationStyle: "zoom",
      }
    );
  };

  // DELETE A POST
  const deletePost = async () => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:5000/api/posts/${id}`,
        headers: headers,
      });
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  const confirmDelete = () => {
    Notiflix.Confirm.show(
      "Delete Post!!!",
      `You are about to delete ${post.title}`,
      "Delete",
      "Cancel",
      function okCb() {
        deletePost();
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "8px",
        titleColor: "#eb0202",
        okButtonBackground: "#eb0202",
        cssAnimationStyle: "zoom",
      }
    );
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
            id={id}
            author={author}
            description={post.description}
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
            deleteComment={confirmDeleteComment}
            handleData={receiveComment_id}
            loggedinUser={loggedinUser}
            deletePost={confirmDelete}
          />
        </div>
      )}
    </>
  );
};
