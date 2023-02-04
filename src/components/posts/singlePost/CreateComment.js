import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SAVE_URL } from "../../../Redux/slices/postDetailsSlice";
import { REFETCH_COMMENTS } from "../../../Redux/slices/postSlice";
import { RevealOnScroll } from "../../RevealOnScroll/RevealOnScroll";
import "./singlepost.scss";

export const CreateComment = ({
  headers,
  id,
  addComment,
  toggleAddComment,
  isLoggedIn,
  url,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  //COMMENT POST
  const commentPost = async (e) => {
    e.preventDefault();
    switch (isLoggedIn) {
      case true:
        try {
          await axios({
            method: "post",
            url: `http://localhost:5000/api/post/comment/${id}`,
            data: { comment },
            headers: headers,
          });
          dispatch(REFETCH_COMMENTS());
          toast.success("Commented post");
          toggleAddComment(!addComment);
          setComment("");
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        dispatch(SAVE_URL(url));
        navigate("/login");
        break;
    }
  };

  if (addComment) {
    return (
      <RevealOnScroll>
        <div className="mt-14 w-[80%] ">
          <form onSubmit={commentPost}>
            <textarea
              placeholder="Leave comment..."
              rows="3"
              cols="8"
              className="input"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <button className="comment-btn" type="submit">
              Comment
            </button>
          </form>
        </div>
      </RevealOnScroll>
    );
  }
};
