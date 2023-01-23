import React from "react";
import "./singlepost.scss";

export const CreateComment = ({ addComment, commentPost, setComment }) => {
  if (addComment) {
    return (
      <div className="mt-14 w-[80%] ">
        <form onSubmit={commentPost}>
          <textarea
            placeholder="Leave comment..."
            rows="3"
            cols="8"
            className="input"
            onChange={setComment}
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
