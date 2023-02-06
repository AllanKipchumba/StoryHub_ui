import React, { useEffect, useState } from "react";
import "./singlepost.scss";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { AuthorOnly } from "./AuthorOnly";
import axios from "axios";
import { toast } from "react-toastify";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import { REFETCH_COMMENTS } from "../../../Redux/slices/postSlice";
import { Timestamp } from "../Timestamp";
import { useNavigate } from "react-router-dom";
import { SAVE_URL } from "../../../Redux/slices/postDetailsSlice";
import { RevealOnScroll } from "../../RevealOnScroll/RevealOnScroll";

export const DisplayComments = ({
  loggedinUser,
  headers,
  id,
  isLoggedIn,
  url,
}) => {
  const dispatch = useDispatch();
  const { reFetchComments } = useSelector((store) => store["posts"]);
  const [commentsOnPost, setCommentsOnPost] = useState();
  const [hasComments, setHasComments] = useState();
  const [numberOfComments, setNumberOfComments] = useState();
  const [commentID, setCommentID] = useState("");
  const navigate = useNavigate();

  //fetch comments on a post
  useEffect(() => {
    const getCommentsOnPost = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `https://storyhub-api.onrender.com/api/post/comment/${id}`,
        });
        res.data.length !== 0 ? setHasComments(true) : setHasComments(false);
        setCommentsOnPost(res.data);
        setNumberOfComments(res.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    getCommentsOnPost();
  }, [reFetchComments, id]);

  //like a comment
  const likeComment = async () => {
    switch (isLoggedIn) {
      case true:
        try {
          await axios({
            method: "put",
            url: `https://storyhub-api.onrender.com/api/post/comment/${commentID}/like`,
            headers: headers,
          });
          dispatch(REFETCH_COMMENTS());
        } catch (error) {
          toast.error(error.response.data);
          console.log(error);
        }
        break;
      default:
        dispatch(SAVE_URL(url));
        navigate("/login");
        break;
    }
  };

  //delete a comment
  const deleteComment = async () => {
    try {
      await axios({
        method: "delete",
        url: `https://storyhub-api.onrender.com/api/post/comment/${commentID}`,
        headers: headers,
      });
      dispatch(REFETCH_COMMENTS());
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

  if (hasComments) {
    return (
      <RevealOnScroll>
        <div className="comments-container">
          <p className=" numberofcomments">
            {numberOfComments === 1 ? (
              <p>1 comment</p>
            ) : (
              <p>{numberOfComments} comments</p>
            )}
          </p>

          {commentsOnPost?.map((comment, index) => {
            return (
              <div key={index} className=" comments">
                <div key={comment._id}>
                  <div className=" mb-2  flex gap-5">
                    <p className="">{comment.authorName}</p>
                    <p className="mt-[-10px]">
                      <Timestamp createdAt={comment.createdAt} />
                    </p>
                  </div>
                  <hr />
                  <p className="font-bold">{comment.comment}</p>
                  <div className="mt-2 flex gap-2">
                    <AiOutlineLike
                      className="icon icons-LC"
                      onClick={likeComment}
                      onMouseEnter={() => setCommentID(comment._id)}
                    />

                    {comment.likes.length !== 0 && (
                      <p>{comment.likes.length}</p>
                    )}

                    <AuthorOnly
                      author={comment.authorName}
                      loggedinUser={loggedinUser}
                    >
                      <MdOutlineDelete
                        className="icon icons-LC"
                        onClick={confirmDeleteComment}
                        onMouseEnter={() => setCommentID(comment._id)}
                      />
                    </AuthorOnly>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </RevealOnScroll>
    );
  }
};
