import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { REFETCH_COMMENTS } from "../../../Redux/slices/postSlice";
import "./singlepost.scss";

export const CreateComment = ({ headers, id, addComment }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

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
      dispatch(REFETCH_COMMENTS());
      toast.success("Commented post");
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  if (addComment) {
    return (
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
    );
  }
};
