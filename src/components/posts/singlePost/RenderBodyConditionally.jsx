import React from "react";
import "./singlepost.scss";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CreateComment } from "./CreateComment";
import { DisplayComments } from "./DisplayComments";

export const RenderBodyConditionally = ({
  author,
  updateMode,
  description,
  changeDescription,
  updatePost,
  post,
  likePost,
  likes,
  showAddcommentForm,
  numberOfComments,
  addComment,
  commentPost,
  setComment,
  hasComments,
  commentsOnPost,
  likeComment,
  deleteComment,
  handleData

}) => {
  if (updateMode) {
    return (
      <>
        <textarea
          className="input"
          placeholder="Edit post body"
          value={description}
          onChange={changeDescription}
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
    );
  } else {
    return (
      <div className="mt-3">
        <div className="description">{post.description}</div>
        <div>
          <div className="mt-6 flex gap-5">
            <div className="flex gap-1">
              <AiOutlineLike className="icon icons-LC" onClick={likePost} />
              {likes !== 0 && <p>{likes}</p>}
            </div>

            <div className="flex gap-1">
              <FaRegComment
                className="icon icons-LC"
                onClick={showAddcommentForm}
              />
              {numberOfComments !== 0 && <p>{numberOfComments}</p>}
            </div>
          </div>

          <CreateComment
            addComment={addComment}
            commentPost={commentPost}
            setComment={setComment}
          />

          <DisplayComments
            hasComments={hasComments}
            numberOfComments={numberOfComments}
            likeComment={likeComment}
            deleteComment={deleteComment}
            author={author}
            commentsOnPost={commentsOnPost}
            handleData={handleData}
          />
        </div>
      </div>
    );
  }
};
